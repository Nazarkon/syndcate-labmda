exports.handler = async (event) => {
  console.log(event, "EVENT");
  // TODO implement
  const response = {
    statusCode: 200,
    body: JSON.stringify("Hello from Lambda!"),
  };
  return response;
};
