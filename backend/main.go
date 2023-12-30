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

	router := http.NewServeMux()
	router.HandleFunc("/", App.Home)
	router.HandleFunc("/books", App.AllBooks)
	router.HandleFunc("/book", App.GetBook)
	router.HandleFunc("/fav", App.Favourites)
	router.HandleFunc("/login", App.Login)
	router.HandleFunc("/signup", App.Signup)

	// Starting web server on port 8080
	server := http.Server{
		Addr:    ":8080",
		Handler: router,
	}

	server.ListenAndServe()


}
