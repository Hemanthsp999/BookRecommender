package models

type user struct {
	FirstName string `json:"fName"`
	LastName  string `json:"lName"`
	Email     string `json:"email"`
	Password  string `json:"password"`
}
