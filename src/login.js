const { getUser } = require("./user");

function APIResponse(statusCode, body) {
  return JSON.stringify({
    statusCode,
    body
  });
}
module.exports.login = async (event) => {
  const { email, password } = JSON.parse(event.body);

  if (!email || !password) {
    return APIResponse(400,{
      message: "All field are required",
    })
  }

  try {
    const result = await getUser(email);
    const user = result.Item;

    if (!user || !user.name) {
      return APIResponse(404, {
        message: "User not found",
      })
    }

    if (user.password !== password) {
      return APIResponse(400, {
        message: "Invalid credentials",
      })
    }

    return APIResponse(200,{
      name: user.name,
      email: user.email,
    })
  } catch (error) {
    return APIResponse(500, {
      message: `Error search user, ${error.message}`,
    })
  }
};
