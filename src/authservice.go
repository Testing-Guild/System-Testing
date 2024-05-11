package authservice

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
)

type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
}
type DB struct {
	User User `json:"user"`
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

	if db.User.Username != username {
		return map[string]string{"message": "Invalid username or password.", "success": "false"}, nil
	}

	if db.User.Password != password {
		return map[string]string{"message": "Invalid username or password.", "success": "false"}, nil
	}

	return map[string]string{"message": "Login successful!", "success": "true"}, nil
}
