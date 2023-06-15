const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = "WatchQueue2";

module.exports.registerUser = async (event) => {

  const { email, password, name } = JSON.parse(event.body);

  if (!email || !password || !name) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "All field are required",
      }),
    };
  }

  try {

    const user = {
      name,
      email,
      password,
      create_ate: new Date().toTimeString(),
    };

    await saveUser(user);

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error.message,
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "User created"
    }),
  };
};

async function saveUser(user) {
  return await dynamodb
    .put({
      TableName: tableName,
      Item: user,
    })
    .promise()
    .then((response) => {
      return true;
    })
    .catch((errorData) => error("There is an error saving user", errorData));
}

