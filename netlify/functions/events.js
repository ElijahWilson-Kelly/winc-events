export const handler = async (event, context) => {
  if (event.httpMethod == "GET") {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "GET",
      }),
    };
  } else if (event.httpMethod == "POST") {
    return {
      statusCode: 300,
      body: JSON.stringify({
        message: "POST",
      }),
    };
  }
};
