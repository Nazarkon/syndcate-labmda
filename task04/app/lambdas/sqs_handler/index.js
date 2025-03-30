exports.handler = async (event) => {
    console.log('Received SQS message:');
    console.log(JSON.stringify(event.Records[0].body, null, 2));
};
