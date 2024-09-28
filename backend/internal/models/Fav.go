package models

type Favorite struct {
	Email     string `json: "email"`
	Book_id   string `json: "book_id"`
	Title     string `json: "title"`
	Genre	  string `json: "genre"`
	ImgSource string `json: "imgSource"`
}
