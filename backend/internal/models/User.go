package models

import (
	"time"

	"github.com/golang-jwt/jwt"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	Id        primitive.ObjectID `bson:"_id"`
	FirstName string             `json:"fName" validate:"required,min=2,max=100"`
	LastName  string             `json:"lname" validate:"required,min=2,max=100"`
	Email     string             `json:"email" validate:"email,required"`
	Password  string             `json:"pass" validate:"required,min=5"`
	Token     string             `json:"Token" validate:"required,min=5"`
	CreatedAt time.Time          `json:"created_at"`
	UpdatedAt time.Time          `json:"updated_at"`
	jwt.StandardClaims
	User_Id string `json:"user_id"`
}
