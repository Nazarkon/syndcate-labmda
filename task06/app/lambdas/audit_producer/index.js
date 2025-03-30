const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");
const dynamodb = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.TARGET_TABEL;

exports.handler = async (event) => {
  const records = event.Records || [];

  for (const record of records) {
    const dynamodbData = record.dynamodb;
    const newImage = dynamodbData.NewImage;
    const oldImage = dynamodbData.OldImage || null;

    const key = newImage.key.S;
    const newValue = parseAttributeValue(newImage.value);
    const modificationTime = new Date().toISOString();

    if (!oldImage) {
      const payload = {
        id: uuidv4(),
        itemKey: key,
        modificationTime: modificationTime,
        newValue: {
          key: key,
          value: newValue,
        },
      };

      await putItemToTargetTable(payload);
    } else {
      const oldValue = parseAttributeValue(oldImage.value);
      const payload = {
        id: uuidv4(),
        itemKey: key,
        modificationTime: modificationTime,
        updatedAttribute: "value",
        oldValue: oldValue,
        newValue: newValue,
      };

      await putItemToTargetTable(payload);
    }
  }

  console.log("Processing complete.");
  return { statusCode: 200, body: "Success" };
};

async function putItemToTargetTable(payload) {
  const params = {
    TableName: tableName,
    Item: payload,
  };

  try {
    console.log(
      "Writing item to target table:",
      JSON.stringify(payload, null, 2)
    );
    await dynamodb.put(params).promise();
    console.log("Item written successfully.");
  } catch (err) {
    console.error("Error writing to target table:", err);
  }
}

function parseAttributeValue(attribute) {
  if ("S" in attribute) {
    return attribute.S;
  } else if ("N" in attribute) {
    return Number(attribute.N);
  } else if ("BOOL" in attribute) {
    return attribute.BOOL;
  } else if ("NULL" in attribute) {
    return null;
  }
  return attribute;
}
