package systemtest

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"testing"

	"github.com/stretchr/testify/assert"
)

type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
}
type DB struct {
    User []User `json:"user"` 
}
type AuthService struct {
	dbPath string
}

func NewAuthService(dbPath string) *AuthService {
	return &AuthService{dbPath: dbPath}
}
func (a *AuthService) Login(username, password string) (map[string]string, error) {
	data, err := ioutil.ReadFile(a.dbPath)
	if err != nil {
		return nil, fmt.Errorf("error reading user data: %w", err)
	}

	var db DB
	err = json.Unmarshal(data, &db)
	if err != nil {
		return nil, fmt.Errorf("error parsing user data: %w", err)
	}
	for _, user := range db.User {
		if user.Username == username && user.Password == password {
			return map[string]string{"message": "Login successful!", "success": "true"}, nil
		}
	}

	return map[string]string{"message": "Invalid username or password.", "success": "false"}, nil
}
func NewUser(username, password string) *User {
	return &User{Username: username, Password: password}
}

func TestLoginWithValidCredentials(t *testing.T) {
	service := NewAuthService("../db.json")

	user := NewUser("user2", "hashed_password2")
	isLoggedIn, err := service.Login(user.Username, user.Password)

	assert.NoError(t, err)
	assert.Equal(t, map[string]string{"message": "Login successful!", "success": "true"}, isLoggedIn)
}

func TestLoginWithInvalidUsername(t *testing.T) {
	service := NewAuthService("../db.json")
	isLoggedIn, err := service.Login("invalid_user", "password1")

	assert.NoError(t, err)
	assert.Equal(t, map[string]string{"message": "Invalid username or password.", "success": "false"}, isLoggedIn)
}
