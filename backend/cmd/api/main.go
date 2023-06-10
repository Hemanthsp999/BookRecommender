package main

import (
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

type application struct {
	Domain string
}

func main() {
	// set application confid
	var app application

	// Establish a connection to mongodb
	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.2"))
	if err != nil {
		log.Fatal(err)
	}
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}

	// read from command line
	if err := client.Ping(context.TODO(), readpref.Primary()); err != nil {
		log.Fatal(err)
	}

	// connect to the database
	app.Domain = "Books.com"
	log.Println("starting server at port", port)
	http.HandleFunc("/", app.Home)
	http.HandleFunc("/books/id", app.AllBooks)
	http.HandleFunc("/login", app.Login)
	http.HandleFunc("/genres", app.Genre)
	http.HandleFunc("/signin", app.Signin)

	// start a web server
	ds := http.ListenAndServe(fmt.Sprintf(":%d", port), app.routes())

	if ds != nil {
		log.Fatal(ds)
	}

	defer client.Disconnect(ctx)

}
