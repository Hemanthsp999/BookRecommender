package models

type Favorite struct {
	Email     string `json: "email"`
	Book_id   string `json: "book_id"`
	Title     string `json: "title"`
	ImgSource string `json: "imgSource"`
}
