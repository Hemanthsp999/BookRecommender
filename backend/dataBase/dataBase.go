package database

import (
	"backend/internal/models"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

type DataBase struct {
	client          *mongo.Client
	userCollection  *mongo.Collection
	BooksCollection *mongo.Collection
	FavCollection   *mongo.Collection
}

type rmUser struct {
	Id string
}

var Db DataBase

func (Db *DataBase) Initialization() (*mongo.Client, error) {

	var err error
	// here mongo.connect is used only for localhost connection for standard connection use mongo.NewClient() method
	Db.client, err = mongo.Connect(context.Background())
	if err != nil {
		log.Fatal(err)
	}
	if err != nil {
		log.Fatal(err)
	}

	// read from command line
	if err := Db.client.Ping(context.TODO(), readpref.Primary()); err != nil {
		log.Fatal(err)
	}

	// BELOW THIS IS USED FOR DATABASE NAME AND COLLECTION

	// this is to store signup part
	Db.userCollection = Db.client.Database("BookRecommender").Collection("userData")

	// BELOW BLOCK IS USED FOR BOOKS COLLECTION
	Db.BooksCollection = Db.client.Database("BookRecommender").Collection("Books")

	// THIS IS USED FOR FAVOURITES COLLECTION IN DATABASE
	Db.FavCollection = Db.client.Database("BookRecommender").Collection("FavCollection")

	return &mongo.Client{}, nil
}

// BELOW CODE IS USED TO ADD NEW USER TO THE DATABASE
func (Db *DataBase) AddUser(user *models.User) (*mongo.Collection, error) {

	addUser, err := Db.userCollection.InsertOne(context.Background(), user)
	if err != nil {
		fmt.Println("add User not perfect")
	}
	fmt.Println(addUser.InsertedID)

	return &mongo.Collection{}, nil
}

// BELOW CODE IS USED TO REMOVE EXISITING USER FROM THE DATABASE
func (Db *DataBase) RemoveUser(Id *rmUser) {
	removeUser, _ := Db.userCollection.DeleteOne(context.Background(), Id)
	fmt.Println(removeUser.DeletedCount)
}

func (Db *DataBase) GetUserByEmail(email string) (models.User, error) {

	var user models.User

	validUser := Db.userCollection.FindOne(context.TODO(), bson.M{"email": email}).Decode(&user)

	DecodeJson, err := json.Marshal(user)
	if err != nil {
		panic(err)
	}

	if validUser == nil {
		fmt.Printf("User Exists: %s\n", DecodeJson)
	} else {
		fmt.Printf("User not exists")
		err = errors.New("User doesn't exists")

	}
	return user, err
}

// BELOW CODE IS FOR GETTING ALL BOOKS FORM THE DATABASE
func (Db *DataBase) GetAllBooks() (*models.Book, error) {

	var book models.Book

	allbooks, err := Db.BooksCollection.Find(context.TODO(), bson.D{})
	if err != nil {
		log.Panic(err)
	}

	for i := 0; allbooks.Next(context.TODO()); i++ {
		if err := allbooks.Decode(&book); err != nil {
			log.Panic(err)
		}
		json.Marshal(book)
		fmt.Println("The Data of the Books are: ", i, book)
	}

	return &book, nil
}

func (Db *DataBase) GetFavourites(Id *models.Book) (*mongo.Collection, error) {

	favBookFind := Db.BooksCollection.FindOne(context.TODO(), Id)
	if favBookFind == nil {
		favBookInsert, err := Db.FavCollection.InsertOne(context.TODO(), Id)
		if err != nil {
			log.Panic(err)
		}

		DecodeJson, _ := json.Marshal(favBookInsert)
		fmt.Println(DecodeJson)
		fmt.Println(favBookInsert.InsertedID)
	}
	return &mongo.Collection{}, nil
}

func (Db *DataBase) GetBookById(bookId primitive.ObjectID) (models.Book, error) {

	var book models.Book
	var err error
	FindAction := Db.BooksCollection.FindOne(context.TODO(), bson.M{"_id": "65425bd46b356c76812b31d1"}).Decode(&book)
	DecodeJson, err := json.Marshal(book)
	if err != nil {
		log.Panic("error ", err)
	}

	if FindAction == nil {
		fmt.Printf("The books is there %s\n", DecodeJson)

	} else {
		fmt.Println("Book is not there")
		err = errors.New("book is not there")
	}
	return book, err
}
