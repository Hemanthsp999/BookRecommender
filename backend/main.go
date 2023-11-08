package main

import (
	"backend/api"
	"backend/dataBase"
	"fmt"
	"log"
	"net/http"
)

const port = 8080

func main() {

	var App api.Application

	App.Domain = "www.books.com"

	// Establishing connection to database
	DataBase, err := database.Db.Initialization()
	if err != nil {
		fmt.Println("Error in connecting to DataBase", DataBase)
	}
	log.Println("starting server at port", port)
	http.HandleFunc("/", App.Home)
	http.HandleFunc("/books", App.AllBooks)
	http.HandleFunc("/books/genre", App.GetByGenre)
	http.HandleFunc("/fav", App.Favourites)
	http.HandleFunc("/login", App.Login)
	http.HandleFunc("/signup", App.Signup)

	// Starting web server on port 8080
	myServer := http.ListenAndServe(fmt.Sprintf(":%d", port), App.Routes())

	if myServer != nil {
		log.Fatal(myServer)
	}

}
