package main

import (
	"backend/internal/models"
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"time"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
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
	FirstName string `json:"fname" bson:"FirstName, omitempty"`
	LastName  string `json:"lname"`
	Email     string `json:"email"`
	Password  string `json:"pass"`
}

func (app *application) Signup(w http.ResponseWriter, r *http.Request) {

	if r.Method != "POST" {
		http.Error(w, "method not allowed", http.StatusNotFound)
		return
	} else {
		if err := r.ParseForm(); err != nil {
			panic(err)
		}

		defer r.Body.Close()

		clientOptions, err := mongo.NewClient(options.Client().ApplyURI("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.1"))

		ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
		err = clientOptions.Connect(ctx)
		if err != nil{
			log.Panic(err)
		}
		defer clientOptions.Disconnect(ctx)

		dataBase := clientOptions.Database("signup").Collection("userData")
		

		// PARSE BODY ITSELF
		body, err := ioutil.ReadAll(r.Body)
		sb := string(body)
		jsonDataMap := make(map[string]interface{})
		json.Unmarshal([]byte(sb), &jsonDataMap)

		fname, _ := jsonDataMap["fname"].(string)
		lname, _ := jsonDataMap["lname"].(string)
		email, _ := jsonDataMap["email"].(string)
		pass, _ := jsonDataMap["pass"].(string)

		person := &User{
			/*  THIS WILL NOT WORK
			FirstName: r.FormValue("FirstName"),
			LastName:  r.FormValue("LastName"),
			Email:     r.FormValue("Email"),
			Password:  r.FormValue("Password"),
			*/

			FirstName: fname,
			LastName:  lname,
			Email:     email,
			Password:  pass,
		}

		//	out := json.NewDecoder(r.Body).Decode(&person)
		//	fmt.Println(w, "values are %+v\n", out)

		marshalled, err := json.Marshal(person)
		if err != nil {
			panic(err)
		}
		fmt.Printf("marshal part %s\n", marshalled)
		/*
		  THIS PART IS NOT REQUIRED
			var user []interface{}
			unmarshalled := json.Unmarshal(marshalled, &user)
			fmt.Println(w,"this is unmarshalled part",unmarshalled)
		*/

		insertCollection, err := dataBase.InsertOne(context.Background(),person)
		if err != nil{
			panic(err)
		}

		fmt.Println(insertCollection.InsertedID)

		fmt.Printf("person %s\n", person)

		json.NewEncoder(w).Encode(&person)
	}

}
