const { saveUser } = require("./user");

function APIResponse(statusCode, body) {
  return JSON.stringify({
    statusCode,
    body,
  });
}
module.exports.registerUser = async (event) => {
  const { email, password, name } = JSON.parse(event.body);

  if (!email || !password || !name) {
    return APIResponse(400,{
      message: "All field are required",
    });
  }

  try {
    const user = {
      name,
      email,
      password,
      create_ate: new Date().toTimeString(),
    };

    const response = await saveUser(user);

     return APIResponse(200, response);

  } catch (error) {
    return APIResponse(500,{
      message: error.message,
    });
  }

};
