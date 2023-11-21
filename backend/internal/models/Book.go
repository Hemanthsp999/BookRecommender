package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Book struct {
	Id          primitive.ObjectID `json:"_id"`
	Type        string             `json:"genre"`
	Title       string             `json:"title"`
	Author      string             `json:"Author"`
	ReleaseDate string             `json:"release_date"`
	Rating      string             `json:"rating"`
}
