import { authService } from "../src/auth-service.mjs";
import { ConnectionDatabase } from "../src/db.config.mjs";
import { User } from "../src/user.model.mjs";
test("Login with valid credentials (system test)", async () => {
  let server = new ConnectionDatabase();

  const user1 = new User("user1", "password1");

  const isLoggedIn = await authService.login(user1.username, user1.password);
  expect(isLoggedIn).toBeTruthy();

  server.disconnect();
});

test("Login with invalid username (system test)", async () => {
  let server = new ConnectionDatabase();

  const isLoggedIn = await authService.login("invalid_user", "password1");
  expect(isLoggedIn).toBeFalsy();

  server.disconnect();
});

test("Login with invalid password (system test)", async () => {
  let server = new ConnectionDatabase();

  const isLoggedIn = await authService.login("user1", "invalid_password");
  expect(isLoggedIn).toBeFalsy();

  server.disconnect();
});
