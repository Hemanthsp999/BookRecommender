package main

//  ..Main File of the Server.. //

import (
	"backend/api"
	"backend/dataBase"
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"github.com/go-chi/chi/v5"
)

const port = 8080

func main() {

	var App api.Application

	App.Domain = "www.https://books.com"

	// Establishing connection to database
	DataBase, err := database.Db.Initialization()
	if err != nil {
		fmt.Println("Error in connecting to DataBase", DataBase)
	}
	fmt.Println(App.Domain)
	log.Println("starting server at port", port)

	router := chi.NewRouter()
	router.Use(App.EnableCORS)
	router.Handle("/", http.HandlerFunc(App.Home))
	router.Handle("/signup", http.HandlerFunc(App.Signup))
	router.Handle("/login", http.HandlerFunc(App.Login))
	router.Handle("/books", http.HandlerFunc(App.AllBooks))
	router.Handle("/book", App.AuthMiddleWare(http.HandlerFunc(App.GetBook)))

	// Starting web server on port 8080
	server := http.Server{
		Addr:    fmt.Sprintf(":%d", port),
		Handler: router,
	}
	go func() {
		sigint := make(chan os.Signal, 1)
		signal.Notify(sigint, os.Interrupt, syscall.SIGTERM)
		<-sigint
		if err := server.Shutdown(context.Background()); err != nil {
			log.Fatal(err)
		}
	}()

	if err := server.ListenAndServe(); err != nil {
		fmt.Println("Error in server, Kill the server and restart")
	}

	defer server.Close()

}
