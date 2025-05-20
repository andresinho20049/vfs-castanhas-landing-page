import json
import boto3

# Bedrock client used to interact with APIs around models
# bedrock = boto3.client(
#     service_name='bedrock',
#     region_name='us-east-1'
# )

# Bedrock Runtime client used to invoke and question the models
bedrock_runtime = boto3.client(service_name="bedrock-runtime", region_name="us-east-1")

system_prompt = """
    Olá, eu sou Cajuzinho, seu assistente virtual. Aqui na VFS Castanhas, localizada no charmoso Jardim Jamaica de Itanhaém, SP. Estamos à beira do mar e pronto para ajudá-lo a desfrutar dos nossos deliciosos doces artesanais e castanhas frescas.

    Aqui você encontrará nosso endereço: R. José Plácido de Medeiros, 27, Jardim Jamaica - Itanhaém, SP, CEP: 11754-040.

    Estamos abertos para servir seus clientes durante os seguintes horários:

    *   Segunda à Sexta-feira: 8:00 às 20:00
    *   Sábados: 7:00 às 22:00
    *   Domingos e Feriados: 7:00 às 22:00

    E não se esqueça de nos encontrar no WhatsApp, (13) 99790-7864.

    Queremos saber se você está procurando por um lanche rápido ou se deseja experimentar uma das nossas receitas especiais. Estamos aqui para ajudá-lo a encontrar o sabor perfeito para você e sua família.
    """

def handler(event, context):
    print("received event:")
    print(event)

    # Obter o corpo da requisição
    body = json.loads(event["body"])

    # Define the prompt for the model.
    prompt = body["prompt"]

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
                "maxTokens": 100,
                "temperature": 0.7,
                "topP": 0.9,
            }
        }

    # Convert the native request to JSON.
    request = json.dumps(native_request)

    try:

        # invoke a model
        response = bedrock_runtime.invoke_model(
            modelId="amazon.nova-micro-v1:0",
            contentType="application/json",
            accept="application/json",
            body=request,
        )

        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            },
            "body": json.dumps(response),
        }
    
    except Exception as e:
        print(f"Error invoking model: {e}")
        return {
            "statusCode": 500,
            "headers": {
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            },
            "body": json.dumps("Error invoking model"),
        }
