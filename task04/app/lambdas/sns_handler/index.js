const AWS = require("aws-sdk");

exports.handler = async (event) => {
  console.log("Received SNS message:");
  console.log(JSON.stringify(event, null, 2));

  // Access specific parts of the SNS message, if needed
  if (event.Records && event.Records.length > 0) {
    const snsMessage = event.Records[0].Sns;
    console.log("Message Subject:");
    console.log(snsMessage.Subject);
    console.log("Message Body:");
    console.log(snsMessage.Message);
  }
};
