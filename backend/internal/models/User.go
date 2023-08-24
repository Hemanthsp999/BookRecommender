package models

import (
	"time"

	"github.com/golang-jwt/jwt"
)

type User struct {
	FirstName string    `json:"fname" validate:"required,min=2,max=100"`
	LastName  string    `json:"lname" validate:"required,min=2,max=100"`
	Email     string    `json:"email" validate:"email,required"`
	Password  string    `json:"pass" validate:"required,min=5"`
	CreatedAt time.Time `json:"created at"`
	UpdatedAt time.Time `json:"updated at"`
	jwt.StandardClaims
}
