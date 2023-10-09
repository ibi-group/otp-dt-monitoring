const { DynamoDB, GetItemCommand, PutItemCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDB({ region:'us-east-1' });

const tableName = process.env.DYNAMODB_TABLE_NAME;

if (!tableName) {
  throw new Error("DYNAMODB_TABLE_NAME must be defined!");
}

/**
 * Grab uptime state from dynamoDB
 */
module.exports.getUrlState = async function getUrlState(url) {
  const command = new GetItemCommand({
    TableName: tableName,
    Key: { url: { S: url } },
  });
  const response = await client.send(command);
  return response?.Item?.up?.BOOL;
};

/**
 * set DynamoDB uptime state. TODO: handle failure
 */
module.exports.setUrlState = async function setUrlState(url, state) {
    const command = new PutItemCommand({
      TableName: tableName,
      Item: { url: { S: url }, up: {BOOL: state} },
    });
    await client.send(command);
    return
  };
  
  