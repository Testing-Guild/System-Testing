import fs from "fs";
interface DB {
  user: { username: string; password: string };
}
const db: DB = JSON.parse(fs.readFileSync("db.json", "utf-8"));

export const  authService = {
  login: async (username: string, password: string) => {
    try {
      const foundUser = db.user.username === username;

      if (!foundUser) {
        return { message: "Invalid username or password.", success: false };
      }
      const isPasswordValid = password === db.user.password;

      if (isPasswordValid) {
        return { message: "Login successful!", success: true };
      } else {
        return { message: "Invalid username or password.", success: false };
      }
    } catch (error) {
      console.error("Error during login:", error);
      return {
        message: "An unexpected error occurred. Please try again later.",
        success: false,
      };
    }
  }
}
