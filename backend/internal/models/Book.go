package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Book struct {
	Id        primitive.ObjectID `bson:"_id"`
	Book_id   string             `bson:"book_id"`
	Title     string             `bson:"title"`
	Author    string             `bson:"author"`
	Genre     string             `bson:"genre"`
	Rating    string             `bson:"ratings"`
	Pdf_Path  string             `bson:"pdfPath"`
	ImgSource string             `bson: "imgSource"`
}
