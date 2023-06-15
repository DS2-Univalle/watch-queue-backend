const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = "WatchQueue2";

module.exports.login = async (event) => {
  const { email, password } = JSON.parse(event.body);

  if (!email || !password) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "All field are required",
      }),
    };
  }

  try {
    const result = await getUser(email);
    const user = result.Item;

    if (!user || !user.name) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: "User not found",
        }),
      };
    }

    if (user.password !== password) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Invalidad credentials",
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        name: user.name,
        email: user.email,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Error search user, ${error.message}`,
      }),
    };
  }
};

async function getUser(email) {
  return await dynamodb
    .get({
      TableName: tableName,
      Key: {
        email: email,
      },
    })
    .promise();
}
