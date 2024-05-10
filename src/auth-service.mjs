import { user } from "../db.json" 
export const authService = {
  login: async (username, password) => {
    try {
      const foundUser = user.find((u) => u.username === username);

      if (!foundUser) {
        return { message: "Invalid username or password.", success: false };
      }
      const isPasswordValid = password === foundUser.password;

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
  },
};
