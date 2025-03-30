const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const uuid = require("uuid").v4;
const tableName = process.env.TABLE_NAME;

exports.handler = async (event) => {
  console.log(event, "EVENT");
  const requestData = event;

  const eventId = uuid();

  const itemParams = {
    TableName: tableName,
    Item: {
      id: eventId,
      principalId: requestData.principalId,
      createdAt: new Date().toISOString(),
      body: requestData.content,
    },
  };

  try {
    await dynamodb.put(itemParams).promise();
  } catch (error) {
    console.error("Error saving item to DynamoDB: ", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error saving item to DynamoDB" }),
    };
  }

  const response = {
    statusCode: 201,
    body: JSON.stringify({
      event: {
        id: eventId,
        principalId: requestData.principalId,
        createdAt: new Date().toISOString(),
        body: requestData.content,
      },
    }),
  };

  return response;
};
