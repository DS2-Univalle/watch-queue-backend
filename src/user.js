const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const tableName = "WatchQueue2";

const getUser = async (email) => {
  return await dynamodb
    .get({
      TableName: tableName,
      Key: {
        email: email,
      },
    })
    .promise();
};

const saveUser = async (user) => {
  return await dynamodb
    .put({
      TableName: tableName,
      Item: user,
    })
    .promise()
    .then((response) => {
      return {user};
    })
    .catch((errorData) => error("There is an error saving user", errorData));
}


module.exports = {
    getUser, 
    saveUser
}