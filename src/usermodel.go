package usermodel

type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func NewUser(username, password string) *User {
	return &User{Username: username, Password: password}
}
