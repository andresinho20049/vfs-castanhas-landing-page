import json
import boto3
import os

# DynamoDB client to persist chat history
dynamodb = boto3.resource("dynamodb")

# Get 'ENV' environment variable to construct table name
# 'dev' as fallback if ENV is not defined
enviroment = os.environ.get('ENV', 'dev') 
table_name = f"dynamo01vfscastanhaschatbot-{enviroment}"
table = dynamodb.Table(table_name)

# Bedrock Runtime client used to invoke and question the models
bedrock_runtime = boto3.client(service_name="bedrock-runtime", region_name="us-east-1")

# System prompt for the AI assistant (in Portuguese as it's part of the persona)
text = """
    Olá! Sou Cajuzinho, seu assistente virtual da VFS Castanhas.
    Estamos em Itanhaém, SP, no charmoso Jardim Jamaica, bem pertinho do mar!

    Nosso endereço é: R. José Plácido de Medeiros, 27, Jardim Jamaica - Itanhaém, SP, CEP: 11754-040.

    Você pode falar com a gente pelo WhatsApp: (13) 99790-7864.
    """

system_prompt = text.replace('\n', '').strip()

def persist_data(user_id: str, message_to_persist: dict):

    if not user_id:
        print("Error: user_id not provided for data persistence.")
        return 
    if not message_to_persist or not isinstance(message_to_persist, dict):
        print(f"Error: Invalid message for persistence: {message_to_persist}")
        return

    try:
        response = table.update_item(
            Key={
                'userid': user_id
            },
            UpdateExpression="SET #msg = list_append(if_not_exists(#msg, :empty_list), :new_message)",
            ExpressionAttributeNames={
                '#msg': 'messages' 
            },
            ExpressionAttributeValues={
                ':new_message': [message_to_persist], 
                ':empty_list': []
            },
            ReturnValues="UPDATED_NEW"
        )
        print(f"DynamoDB response for persistence: {json.dumps(response)}")

        updated_messages = response.get('Attributes', {}).get('messages', [])
        print(f"Updated messages for user {user_id}: {updated_messages}")

    except Exception as e:
        print(f"Error persisting data for user {user_id}: {e}")
        raise 


def handler(event, context):
    print("Received event:")
    print(event)

    try:
        body = json.loads(event.get("body", "{}")) 

        prompt = body.get("prompt")
        if not prompt:
            return {
                'statusCode': 400,
                'body': json.dumps({'message': 'Missing "prompt" field in request body.'})
            }

        user_id = None
        if 'requestContext' in event and \
           'identity' in event['requestContext'] and \
           'cognitoAuthenticationProvider' in event['requestContext']['identity']:
            
            cognito_auth_provider_string = event['requestContext']['identity']['cognitoAuthenticationProvider']
            print(f"cognitoAuthenticationProvider: {cognito_auth_provider_string}")

            # If there are multiple providers, get the last one
            providers = cognito_auth_provider_string.split(',')
            
            if providers:
                last_provider_string = providers[-1] 
                parts = last_provider_string.split(':')
                if len(parts) > 0:
                    user_id = parts[-1] 

        # Check if userid was obtained
        if not user_id:
            print("Error: userid not found or could not be extracted from Lambda context (cognitoAuthenticationProvider).")
            return {
                'statusCode': 401, # Unauthorized
                'body': json.dumps({'message': 'Unauthorized user or userid not found in context.'})
            }

        # Persist user message
        user_message_to_persist = {
            'text': prompt,
            'type': 'user'
        }
        persist_data(user_id, user_message_to_persist)

        # Format the request payload using the model's native structure.
        native_request = {
                "system": [
                    {
                    "text": system_prompt
                    }
                ],
                "messages": [
                    {
                        "role": "user", 
                        "content": [
                            {
                                "text": prompt
                            }
                        ]
                    }
                ],
                "inferenceConfig":{
                    "maxTokens": 300,
                    "temperature": 0.7,
                }
            }

        # Convert the native request to JSON.
        request_body_json = json.dumps(native_request)

        # Invoke the model
        response = bedrock_runtime.invoke_model(
            modelId="amazon.nova-micro-v1:0",
            contentType="application/json",
            accept="application/json",
            body=request_body_json,
        )

        # Read and decode the Bedrock response body
        bedrock_response_body = response["body"].read().decode("utf-8")
        print(f"Bedrock response body: {bedrock_response_body}")

        extracted_texts_for_persistence = []
        try:
            parsed_bedrock_response = json.loads(bedrock_response_body)
            if 'output' in parsed_bedrock_response and \
               'message' in parsed_bedrock_response['output'] and \
               'content' in parsed_bedrock_response['output']['message'] and \
               isinstance(parsed_bedrock_response['output']['message']['content'], list):
                for content_block in parsed_bedrock_response['output']['message']['content']:
                    if 'text' in content_block:
                        extracted_texts_for_persistence.append(content_block['text'])
            
            if not extracted_texts_for_persistence: # If no text content found in 'content' list
                print("Warning: No 'text' content found in Bedrock response 'content' list. Persisting full raw body as text.")
                extracted_texts_for_persistence.append(bedrock_response_body) # Fallback to full raw body
        except json.JSONDecodeError:
            print("Warning: Bedrock response is not valid JSON. Treating as plain text for persistence.")
            extracted_texts_for_persistence.append(bedrock_response_body) # If not JSON, assume it's plain text

        # Persist each extracted text as a separate message
        for text_to_persist in extracted_texts_for_persistence:
            assistant_message_to_persist = {
                'text': text_to_persist, 
                'type': 'assistant'
            }
            persist_data(user_id, assistant_message_to_persist)

        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            },
            "body": bedrock_response_body, 
        }
    
    except json.JSONDecodeError as e:
        print(f"Error parsing input request body JSON: {e}")
        return {
            "statusCode": 400,
            "headers": {
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            },
            "body": json.dumps(f"Error: Invalid request body JSON: {e}"),
        }
    except Exception as e:
        print(f"Unexpected error in handler: {e}")
        return {
            "statusCode": 500,
            "headers": {
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            },
            "body": json.dumps(f"Internal server error: {e}"),
        }

