const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

const s3 = new AWS.S3();

exports.handler = async (event) => {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

    const uuids = Array.from({ length: 10 }, () => uuidv4());
    const fileContent = uuids.join("\n");

    await s3
      .putObject({
        Bucket: process.env.BUCKET_NAME,
        Key: `uuids-${timestamp}.txt`,
        Body: fileContent,
        ContentType: "text/plain",
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "UUIDs successfully generated and stored",
        filename: `uuids-${timestamp}.txt`,
        uuids: uuids,
      }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error generating and storing UUIDs",
        error: error.message,
      }),
    };
  }
};
