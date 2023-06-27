package main

import (
	"backend/internal/models"
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	//	"go.mongodb.org/mongo-driver/bson/primitive"
	//"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
	//	"golang.org/x/text/language"
)

func (app *application) Home(w http.ResponseWriter, r *http.Request) {

	var payload = struct {
		Status  string `json:"status"`
		Message string `json:"message"`
		Version string `json:"version"`
	}{
		Status:  "Active",
		Message: "Running",
		Version: "1.0.0",
	}

	out, err := json.Marshal(payload)
	if err != nil {
		fmt.Println(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(out)
}

func (app *application) AllBooks(w http.ResponseWriter, r *http.Request) {
	var books []models.Book

	rd, _ := time.Parse("2022-02-09", "2018-10-16")
	atomicHab := models.Book{
		ID:          1,
		Title:       "Atomic Habbits",
		Author:      "James Clear",
		ReleaseDate: rd,
		Rating:      4,
	}

	books = append(books, atomicHab)

	rd, _ = time.Parse("2006-02-09", "1942-05-19")
	theStang := models.Book{
		ID:          2,
		Title:       "The Stanger",
		Author:      "Alber Camus",
		ReleaseDate: rd,
		Rating:      5,
	}

	books = append(books, theStang)

	out, err := json.Marshal(books)
	if err != nil {
		fmt.Println(err)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(out)

}

// Below this is
// server to handle Login credentials

func (app *application) Login(w http.ResponseWriter, r *http.Request) {

	const myUrl = "http://localhost:8080/login"

}

// server to handle Genres

func (app *application) Genre(w http.ResponseWriter, r *http.Request) {
	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb://localhost:27017/"))
	if err != nil {
		log.Fatal(err)
	}

	collection := client.Database("public").Collection("genres")

	fmt.Println(collection)

}

// helper function
func toDoc(v interface{}) (doc *bson.D, err error) {
	data, err := bson.Marshal(v)
	if err != nil {
		return
	}

	err = bson.Unmarshal(data, &doc)
	return
}

type User struct {
	FristName string `json:"fName"`
	LastName  string `json:"lName"`
	Email     string `json:"email"`
	Password  string `json:"pass"`
}

func (app *application) SignUp(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Successfully connected to database %v", http.StatusOK)

	// connecting to database through uri
	clientOptions := options.Client().ApplyURI("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.2")

	// connect to mongodb
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		log.Panic(err)
	}

	// check the connection
	ctx, _ := context.WithTimeout(context.TODO(), 10*time.Second)

	err = client.Ping(context.TODO(), readpref.Primary())

	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("connected to MONGODB!")

	dataBase := client.Database("public").Collection("user")

	// Disconnecting from database client.Disconnect
	defer client.Disconnect(context.TODO())

	fmt.Println("Connection to mongodb database is closed", ctx)

	person := User{
		FristName: r.FormValue("fName"),
		LastName:  r.FormValue("lName"),
		Email:     r.FormValue("email"),
		Password:  r.FormValue("pass"),
	}

	encodeToJosn, err := json.Marshal(person)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(string(encodeToJosn))

	var store User
	checkValid := json.Valid(encodeToJosn)
	if checkValid {
		fmt.Println("this is valid json format")
		json.Unmarshal(encodeToJosn, &store)
		fmt.Printf("%v\n",store)
	}

	collection, _ := dataBase.InsertOne(context.Background(), store)

	fmt.Println(collection.InsertedID)

}
