const { beforeEach } = require("node:test");
const registerFunctions = require("./register");
const userFunctions = require("./user");

jest.mock("./user");

describe("Login suit test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Register user", async () => {
    const now = new Date().toTimeString()
    userFunctions.saveUser.mockResolvedValue({
      user: {
        name: "Pepito perez",
        email: "test@gmail.com",
        password: "123456",
        create_ate: now,
      },
    });

    const event = {
      body: JSON.stringify({
        name: "Pepito perez",
        email: "test@gmail.com",
        password: "123456"
      }),
    };

    const result = JSON.parse(await registerFunctions.registerUser(event));

    expect(userFunctions.saveUser).toHaveBeenCalledTimes(1);
    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual({
        user: {
            name: "Pepito perez",
            email: "test@gmail.com",
            password: "123456",
            create_ate: now,
            }
        });
  });

  it("should Login missing parameters", async () => {
    const event = {
      body: JSON.stringify({
        email: "test@test.com",
        password: "test",
      }),
    };

    const result = JSON.parse(await registerFunctions.registerUser(event));

    expect(result.statusCode).toBe(400);
    expect(result.body.message).toEqual("All field are required");
  });

  it("should response error saving user", async () => {
    userFunctions.saveUser.mockImplementation(() => {
      throw new Error("Error saving user");
    });

    const event = {
      body: JSON.stringify({
        name: "Pepito perez",
        email: "test@test.com",
        password: "password123",
      }),
    };

    const result = JSON.parse(await registerFunctions.registerUser(event));

    expect(result.statusCode).toBe(500);
    expect(result.body.message).toEqual("Error saving user");
  });
});
