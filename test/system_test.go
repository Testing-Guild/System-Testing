package stsremtest

import (
	"encoding/json"
	"testing"

	"github.com/stretchr/testify/assert"
	
	"../src/auth-service.go"
	"../src/db.config.go"
	"../src/user.model.go"
)
func TestLoginWithValidCredentials(t *testing.T) {
	authService := auth.NewAuthService("../db")
  
	user := user.NewUser("user1", "hashed_password1")
	isLoggedIn, err := authService.Login(user.Username, user.Password)
  
	assert.NoError(t, err)
	assert.Equal(t, map[string]string{"message": "Login successful!", "success": "true"}, isLoggedIn)
  }
  
  func TestLoginWithInvalidUsername(t *testing.T) {
	authService := auth.NewAuthService("../db") 
	isLoggedIn, err := authService.Login("invalid_user", "password1")
  
	assert.NoError(t, err)
	assert.Equal(t, map[string]string{"message": "Invalid username or password.", "success": "false"}, isLoggedIn)
  }
  func TestLoginWithInvalidPassword(t *testing.T) {
	authService := auth.NewAuthService("../db") 
  
	isLoggedIn, err := authService.Login("user1", "invalid_password")
  
	assert.NoError(t, err)
	assert.Equal(t, map[string]string{"message": "Invalid username or password."})}