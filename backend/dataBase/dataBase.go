package database

import (
	"backend/internal/models"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/bson"
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
	Db.userCollection = Db.client.Database("BookMatch").Collection("userData")

	// BELOW BLOCK IS USED FOR BOOKS COLLECTION
	Db.BooksCollection = Db.client.Database("BookMatch").Collection("BookCollection")

	// THIS IS USED FOR FAVOURITES COLLECTION IN DATABASE
	Db.FavCollection = Db.client.Database("BookMatch").Collection("FavCollection")

	return &mongo.Client{}, nil
}

// BELOW CODE IS USED TO ADD NEW USER TO THE DATABASE
func (Db *DataBase) AddUser(user *models.User) (*mongo.Collection, error) {

	// Signup User
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

	// Login Verification
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
	return user, nil
}

func (Db *DataBase) GetAllBooks() ([]models.Book, error) {

	var books []models.Book

	allbooks, err := Db.BooksCollection.Find(context.TODO(), bson.D{})
	if err != nil {
		log.Panic(err)
	}

	defer allbooks.Close(context.TODO())

	for i := 0; allbooks.Next(context.TODO()); i++ {
		var book models.Book
		if err := allbooks.Decode(&book); err != nil {
			log.Panic(err)
			return nil, err
		}
		books = append(books, book)
	}

	if err := allbooks.Err(); err != nil {
		log.Panic(err)
		return nil, err
	}

	return books, err
}

// Add a favorite book to the database
// Add or update a favorite book in the database
func (Db *DataBase) AddFavorite(fav models.Favorite) error {
	filter := bson.M{"email": fav.Email, "book_id": fav.Book_id}

	// Try to find the existing favorite in the collection
	var existingFav models.Favorite
	err := Db.FavCollection.FindOne(context.TODO(), filter).Decode(&existingFav)

	if err == mongo.ErrNoDocuments {
		// If no favorite exists, insert a new one
		_, insertErr := Db.FavCollection.InsertOne(context.TODO(), fav)
		if insertErr != nil {
			log.Printf("Failed to insert favorite: %v", insertErr)
			return insertErr
		}
		log.Printf("Inserted new favorite for email: %s, book_id: %s", fav.Email, fav.Book_id)
	} else if err == nil {
		// If a favorite exists, update it
		update := bson.M{
			"$set": bson.M{
				"title":     fav.Title,
				"imgSource": fav.ImgSource,
			},
		}

		_, updateErr := Db.FavCollection.UpdateOne(context.TODO(), filter, update)
		if updateErr != nil {
			log.Printf("Failed to update favorite: %v", updateErr)
			return updateErr
		}
		log.Printf("Updated favorite for email: %s, book_id: %s", fav.Email, fav.Book_id)
	} else {
		// If there's another error (not related to no documents found), return it
		log.Printf("Error occurred while finding favorite: %v", err)
		return err
	}

	return nil
}

func (Db *DataBase) GetFavorites(email string) ([]models.Favorite, error) {

	var favs []models.Favorite
	filter := bson.M{"email": email}

	searchFav, err := Db.FavCollection.Find(context.TODO(), filter)
	if err != nil {
		log.Panic(err)
	}

	defer searchFav.Close(context.TODO())

	for i := 0; searchFav.Next(context.TODO()); i++ {
		var fav models.Favorite
		if err := searchFav.Decode(&fav); err != nil {
			log.Panic(err)
			return nil, err
		}
		favs = append(favs, fav)
	}

	if err := searchFav.Err(); err != nil {
		log.Panic(err)
		return nil, err
	}
	return favs, nil
}

func (Db *DataBase) Remove_From_Fravoites(bookId string, email string) error {
	_, err := Db.FavCollection.DeleteOne(context.TODO(), bson.M{"book_id": bookId, "email": email})
	return err
}

func (Db *DataBase) GetBookByTitle(bookName string) (models.Book, error) {

	// Get Book by Genre Type
	var book models.Book
	var err error
	FindAction := Db.BooksCollection.FindOne(context.TODO(), bson.M{"title": bookName}).Decode(&book)
	DecodeJson, err := json.Marshal(book)
	if err != nil {
		log.Panic("error ", err)
	}

	if FindAction != nil {
		fmt.Println("Book is not there")
		err = errors.New("book is not there")
	}
	fmt.Printf("The books is there %s\n", DecodeJson)
	return book, nil
}

func (Db *DataBase) Get_Book_By_Genre(Genre string) ([]models.Book, error) {

	var genreAction []models.Book
	filter := bson.M{"genre": Genre}

	cursorBook, err := Db.BooksCollection.Find(context.TODO(), filter)
	if err != nil {
		log.Panic(err)
	}

	for cursorBook.Next(context.TODO()) {
		var genre models.Book
		if err := cursorBook.Decode(&genre); err != nil {
			log.Println("Error decoding book", err)
			continue
		}
		genreAction = append(genreAction, genre)
	}

	if err := cursorBook.Err(); err != nil {
		return nil, err
	}

	return genreAction, nil
}
