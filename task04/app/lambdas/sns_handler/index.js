exports.handler = async (event) => {
  console.log('Received SNS message:');
  console.log(JSON.stringify(event.Records[0].Sns, null, 2));
};
