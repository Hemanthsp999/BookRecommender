package models

import "time"

type Book struct {
	ID          int       `json:"id"`
	Title       string    `json:"title"`
	ReleaseDate time.Time `json:"release_date"`
	Author      string    `json:"author"`
	Rating      int   `json:"rating"`
}
