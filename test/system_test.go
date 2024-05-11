package systemtest

import (
	"testing"

	"github.com/stretchr/testify/assert"
	
	"../src/authservice"
	"../src/dbconfig"
	"../src/usermodel"
)
func TestLoginWithValidCredentials(t *testing.T) {
	authService := auth.NewAuthService("../db.json")
  
	user := user.NewUser("user1", "hashed_password1")
	isLoggedIn, err := authService.Login(user.Username, user.Password)
  
	assert.NoError(t, err)
	assert.Equal(t, map[string]string{"message": "Login successful!", "success": "true"}, isLoggedIn)
  }
  
  func TestLoginWithInvalidUsername(t *testing.T) {
	authService := auth.NewAuthService("../db.json") 
	isLoggedIn, err := authService.Login("invalid_user", "password1")
  
	assert.NoError(t, err)
	assert.Equal(t, map[string]string{"message": "Invalid username or password.", "success": "false"}, isLoggedIn)
  }
  func TestLoginWithInvalidPassword(t *testing.T) {
	authService := auth.NewAuthService("../db.json") 
  
	isLoggedIn, err := authService.Login("user1", "invalid_password")
  
	assert.NoError(t, err)
	assert.Equal(t, map[string]string{"message": "Invalid username or password."})}