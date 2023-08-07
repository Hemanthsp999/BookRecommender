package main

import (
	"backend/api"
	"context"
	"fmt"
	"log"
	"net/http"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
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
	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&AppName=mongosh+1.8.2"))
	if err != nil {
		log.Fatal(err)
	}
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}

	client.Connect(ctx)

	// read from command line
	if err := client.Ping(context.TODO(), readpref.Primary()); err != nil {
		log.Fatal(err)
	}

	// connect to the database
	App.Domain = "Books.com"
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

	defer client.Disconnect(ctx)

}
