package main

import (
	"backend/api"
	"backend/dataBase"
	"fmt"
	"log"
	"net/http"
)

const port = 8080

/*	THIS IS NOT USING CAUSE SOME ALTERATION IN FILES
type Application struct {
	Domain string
}
*/

func main() {
	// set Application confid

	var App api.Application

	// Establish a connection to mongodb

	// connect to the database
	App.Domain = "Books.com"
	database.Db.Initialization()
	log.Println("starting server at port", port)
	http.HandleFunc("/", App.Home)
	http.HandleFunc("/books/id", App.AllBooks)
	http.HandleFunc("/login", App.Login)
	http.HandleFunc("/genres", App.Genre)
	http.HandleFunc("/signup", App.Signup)

	// start a web server
	ds := http.ListenAndServe(fmt.Sprintf(":%d", port), App.Routes())

	if ds != nil {
		log.Fatal(ds)
	}

}
