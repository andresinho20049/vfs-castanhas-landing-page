const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
} = require("@aws-sdk/lib-dynamodb");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const bodyParser = require("body-parser");
const express = require("express");

const ddbClient = new DynamoDBClient({ region: process.env.TABLE_REGION });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

let tableName = "dynamo01vfscastanhaschatbot";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + "-" + process.env.ENV;
}

const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

const extractUserIdFromCognitoProvider = (cognitoAuthenticationProvider) => {
  if (cognitoAuthenticationProvider) {
    const parts = cognitoAuthenticationProvider.split(":");

    const lastPart = parts[parts.length - 1];
    if (lastPart && lastPart.length > 0 && lastPart.includes("-")) {
      return lastPart;
    }
  }
  return null;
};

/**********************************************
 * HTTP Get method to query message by userId *
 **********************************************/
app.get("/chat", async function (req, res) {
  const condition = {};
  const partitionKeyName = "userid";
  condition[partitionKeyName] = {
    ComparisonOperator: "EQ",
  };

  let userId = null;
  if (
    req?.apiGateway?.event?.requestContext?.identity
      ?.cognitoAuthenticationProvider
  ) {
    userId = extractUserIdFromCognitoProvider(
      req.apiGateway.event.requestContext.identity.cognitoAuthenticationProvider
    );
  }

  if (userId) {
    condition[partitionKeyName]["AttributeValueList"] = [userId];
  } else {
    res.statusCode = 401;
    res.json({ error: "UserId not found!" });
    return;
  }

  let queryParams = {
    TableName: tableName,
    KeyConditions: condition,
  };

  try {
    const data = await ddbDocClient.send(new QueryCommand(queryParams));
    res.json(data.Items);
  } catch (err) {
    res.statusCode = 500;
    res.json({ error: "Could not load items: " + err.message });
  }
});

app.listen(3000, function () {
  console.log("App started");
});

module.exports = app;
