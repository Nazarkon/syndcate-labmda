const AWS = require("aws-sdk");

exports.handler = async (event) => {
  console.log("Received SQS message:");
  console.log(JSON.stringify(event, null, 2));

  // Access specific parts of the SQS message, if needed
  if (event.Records && event.Records.length > 0) {
    const sqsMessage = event.Records[0];
    console.log("Message Body:");
    console.log(sqsMessage.body);
  }
};
