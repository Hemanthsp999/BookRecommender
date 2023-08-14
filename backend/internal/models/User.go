package models

type User struct {
	FirstName string `json:"fname"`
	LastName  string `json:"lname"`
	Email     string `json:"email"`
	Password  string `json:"pass"`
}

type LoginCredentials struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}
