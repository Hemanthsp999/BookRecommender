package models

type Book struct {
	Type        string `json:"genre"`
	Title       string `json:"title"`
	Author      string `json:"Author"`
	ReleaseDate string `json:"release_date"`
	Rating      string `json:"rating"`
}
