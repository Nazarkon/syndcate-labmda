const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

const s3 = new AWS.S3();

exports.handler = async (event) => {
  console.log('Event received:', JSON.stringify(event, null, 2));
  
  try {
    const timestamp = new Date().toISOString();
    
    
    const uuids = Array.from({ length: 10 }, () => uuidv4());
    
   
    const fileContent = JSON.stringify({
      ids: uuids
    });
    
    console.log('BUCKET_NAME:', process.env.BUCKET_NAME);
    
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: `${timestamp}`,
      Body: fileContent,
      ContentType: "application/json" // Changed to JSON content type
    };

    const uploadResult = await s3.putObject(params).promise();

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "UUIDs successfully generated and stored",
        filename: timestamp,
        uuids: uuids,
      }),
    };
    
    console.log('Response:', JSON.stringify(response, null, 2));
    return response;

  } catch (error) {
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      errorType: error.name
    });
    
    const errorResponse = {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error generating and storing UUIDs",
        error: error.message,
      }),
    };
    
    console.log('Error response:', JSON.stringify(errorResponse, null, 2));
    return errorResponse;
  }
};