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


	App.Domain = "Books.com"

	// Establishing connection to database
	DataBase,err := database.Db.Initialization()
	if err != nil{
		fmt.Println("Error in connecting to DataBase",DataBase)
	}
	log.Println("starting server at port", port)
	http.HandleFunc("/", App.Home)
	http.HandleFunc("/books/id", App.AllBooks)
	http.HandleFunc("/login", App.Login)
	http.HandleFunc("/genres", App.Genre)
	http.HandleFunc("/signup", App.Signup)

	// Starting web server on port 8080
	myServer := http.ListenAndServe(fmt.Sprintf(":%d", port), App.Routes())

	if myServer != nil {
		log.Fatal(myServer)
	}

}
