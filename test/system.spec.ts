import { describe, it } from "mocha";
import { authService } from "../src/auth-service";
import { ConnectionDB } from "../src/db.config";
import { User } from "../src/user.model";
import { expect } from "chai";
describe("system test in ts",()=>{
    it("Login with valid credentials (system test)", async () => {
        let server = new ConnectionDB();
    
        const user = new User("user1", "hashed_password1").create();
        const isLoggedIn = await authService.login(user.username, user.password);
        expect(isLoggedIn).to.deep.equal({
          success: true,
          message: "Login successful!",
        });
    
        await server.disconnect();
      });
    
      it("Login with invalid username (system test)", async () => {
        let server = new ConnectionDB();
    
        const isLoggedIn = await authService.login("invalid_user", "password1");
        expect(isLoggedIn).to.deep.equal({
          message: "Invalid username or password.",
          success: false,
        });
    
        await server.disconnect();
      });
    
      it("Login with invalid password (system test)", async () => {
        let server = new ConnectionDB();
    
        const isLoggedIn = await authService.login("user1", "invalid_password");
        expect(isLoggedIn).to.deep.equal({
          message: "Invalid username or password.",
          success: false,
        });
    
        await server.disconnect();
      });
})