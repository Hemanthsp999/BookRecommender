package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Book struct {
	Id      primitive.ObjectID `bson:"_id"`
	Book_id string             `bson:"book_id"`
	Title   string             `bson:"title"`
	Author  string             `bson:"author"`
	Rating  string             `bson:"ratings"`
	PDF     string             `bson:"pdfPath"`
}
