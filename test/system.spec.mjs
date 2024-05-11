import { expect } from "chai";
import { authService } from "../src/auth-service.mjs";
import { ConnectionDatabase } from "../src/db.config.mjs";
import { User } from "../src/user.model.mjs";

describe("system test", () => {
  test("Login with valid credentials (system test)", async () => {
    let server = new ConnectionDatabase();

    const user = new User("user1", "password1");

    const isLoggedIn = await authService.login(user.username, user.password);
    expect(isLoggedIn).to.deep.equal({
      success: true,
      message: "Login successful!",
    });

    await server.disconnect();
  });

  test("Login with invalid username (system test)", async () => {
    let server = new ConnectionDatabase();

    const isLoggedIn = await authService.login("invalid_user", "password1");
    expect(isLoggedIn).to.deep.equal({
      message: "Invalid username or password.",
      success: false,
    });

    await server.disconnect();
  });

  test("Login with invalid password (system test)", async () => {
    let server = new ConnectionDatabase();

    const isLoggedIn = await authService.login("user1", "invalid_password");
    expect(isLoggedIn).to.deep.equal({
      message: "Invalid username or password.",
      success: false,
    });

    await server.disconnect();
  });
});
