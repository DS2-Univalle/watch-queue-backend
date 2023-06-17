const { beforeEach } = require("node:test");
const loginFunctions = require("./login");
const userFunctions = require("./user");

jest.mock("./user");

describe("Login suit test", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  })

  it("Login not found user", async () => {
    userFunctions.getUser.mockResolvedValue({
      Item: undefined,
    });

    const event = {
      body: JSON.stringify({
        email: "test@test.com",
        password: "password123",
      }),
    };

    const result = JSON.parse(await loginFunctions.login(event));

    expect(userFunctions.getUser).toHaveBeenCalledTimes(1);
    expect(result.statusCode).toBe(404);
    expect(result.body.message).toContain("User not found");
  });

  it("should Login invalid credentials", async () => {
    userFunctions.getUser.mockResolvedValue({
      Item: {
        name: "Pepito perez",
        email: "test@test.com",
        password: "password123",
      },
    });

    const event = {
      body: JSON.stringify({
        email: "test@test.com",
        password: "test",
      }),
    };

    const result = JSON.parse(await loginFunctions.login(event));

    expect(result.statusCode).toBe(400);
    expect(result.body.message).toEqual('Invalid credentials');
  });

  it("should Login found user", async () => {
    userFunctions.getUser.mockResolvedValue({
      Item: {
        name: "Pepito perez",
        email: "test@test.com",
        password: "password123",
      },
    });

    const event = {
      body: JSON.stringify({
        email: "test@test.com",
        password: "password123",
      }),
    };

    const result = JSON.parse(await loginFunctions.login(event));

    expect(result.statusCode).toBe(200);
    expect(result.body.name).toEqual('Pepito perez');
  });
  it("should Login found user", async () => {
    userFunctions.getUser.mockResolvedValue({
      Item: {
        name: "Pepito perez",
        email: "test@test.com",
        password: "password123",
      },
    });

    const event = {
      body: JSON.stringify({
        email: "test@test.com",
        password: "password123",
      }),
    };

    const result = JSON.parse(await loginFunctions.login(event));

    expect(result.statusCode).toBe(200);
    expect(result.body.name).toEqual('Pepito perez');
  });

  it("should response error to get user", async () => {
    userFunctions.getUser.mockImplementation(() => {
      throw new Error("database broke!");
    });

    const event = {
      body: JSON.stringify({
        email: "test@test.com",
        password: "password123",
      }),
    };

    const result = JSON.parse(await loginFunctions.login(event));

    expect(result.statusCode).toBe(500);
    expect(result.body.message).toEqual("Error search user, database broke!");
  });
});
