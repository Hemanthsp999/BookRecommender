package api

import (
	"backend/dataBase"
	"backend/internal/models"
	"encoding/json"
	"fmt"
	"github.com/golang-jwt/jwt/v4"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"golang.org/x/crypto/bcrypt"
	"io"
	"log"
	"net/http"
	"time"
)

var SECRET_KEY = []byte("THIS IS NOT JUST A KEY BUT ITS ACTUALLY JUST A KEY")

type Claims struct {
	Email string `json:"email"`
	jwt.RegisteredClaims
}

type Application struct {
	Domain string
}

var App Application

func (App *Application) Home(w http.ResponseWriter, r *http.Request) {

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
	decodedData, err := w.Write(out)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(decodedData)
}

func (App *Application) Favorite(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	defer r.Body.Close()

	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Unable to read body", http.StatusInternalServerError)
		return
	}

	var jsonDatamap map[string]interface{}
	if err := json.Unmarshal(body, &jsonDatamap); err != nil {
		http.Error(w, "Error in decoding JSON", http.StatusBadRequest)
		return
	}

	email, _ := jsonDatamap["email"].(string)
	bookId, _ := jsonDatamap["book_id"].(string)
	title, _ := jsonDatamap["title"].(string)
	imgSource, _ := jsonDatamap["imgSource"].(string)
	action, _ := jsonDatamap["action"].(string)

	book := models.Favorite{
		Email:     email,
		Book_id:   bookId,
		Title:     title,
		ImgSource: imgSource,
	}

	// check if action is "add" then insert or update the Database.
	if action == "add" {
		err = database.Db.AddFavorite(book)
		if err != nil {
			http.Error(w, "Unable to add favorite", http.StatusInternalServerError)
			return
		}
	} else if action == "remove" {
		// if action is "remove" then the Book will be removed from Database
		err = database.Db.Remove_From_Fravoites(bookId, email)
		if err != nil {
			http.Error(w, "Unable to remove favorite", http.StatusInternalServerError)
			return
		}
	}

	w.WriteHeader(http.StatusOK)
}

func (App *Application) GetFavorite(w http.ResponseWriter, r *http.Request) {
	if r.Method != "GET" {
		http.Error(w, "only Get method is allowed", http.StatusMethodNotAllowed)
		return
	}

	email := r.URL.Query().Get("email")

	FavoriteData, err := database.Db.GetFavorites(email)
	if err != nil {
		log.Panic(err)
	}
	fmt.Println("\nThis Data is retrieved from Favroite\t", FavoriteData)
	json.NewEncoder(w).Encode(FavoriteData)
}

func (App *Application) AllBooks(w http.ResponseWriter, r *http.Request) {

	if r.Method == "GET" {

		DataBook, err := database.Db.GetAllBooks()
		if err != nil {
			log.Panic(err)
		}
		fmt.Print("\nThis is from Handler.go\t", DataBook)
		json.NewEncoder(w).Encode(DataBook)

	} else {
		fmt.Println(http.StatusMethodNotAllowed)
	}
}

func (App *Application) GetBook(w http.ResponseWriter, r *http.Request) {
	println("Now you are in GetBook func")
	if r.Method != http.MethodGet {
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		return
	}

	title := r.URL.Query().Get("search")
	fmt.Println("book name: ", title)

	defer r.Body.Close()

	getBook, err := database.Db.GetBookById(title)
	if err != nil {
		http.Error(w, "Book not found.", http.StatusNotFound)
		panic(err)
	}

	if err := json.NewEncoder(w).Encode(&getBook); err != nil {
		http.Error(w, "data not found", http.StatusInternalServerError)
	}

}

func Hash(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), err
}

// implemented JWT Token authentication for userLogin
func generateJWT(email string) (string, error) {
	expirationTime := time.Now().Add(30 * time.Minute)
	claims := &Claims{
		Email: email,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(SECRET_KEY)
	if err != nil {
		return "", err
	}
	return tokenString, nil
}

func validateJWT(tokenString string) (*Claims, error) {
	claims := &Claims{}
	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		return SECRET_KEY, nil
	})
	if err != nil {
		return nil, err
	}

	if !token.Valid {
		return nil, err
	}
	return claims, nil
}

// verifyToken

// BELOW CODE IS FOR SIGNUP PART
func (App *Application) Signup(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	if err := r.ParseForm(); err != nil {
		http.Error(w, "unable to parse form", http.StatusBadRequest)
		return
	}

	defer r.Body.Close()

	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "unable to read body", http.StatusInternalServerError)
		return
	}

	var jsonDataMap map[string]interface{}
	if err := json.Unmarshal(body, &jsonDataMap); err != nil {
		http.Error(w, "error in decoding JSON", http.StatusExpectationFailed)
		return
	}

	fname, _ := jsonDataMap["fname"].(string)
	lname, _ := jsonDataMap["lname"].(string)
	email, _ := jsonDataMap["email"].(string)
	pass, _ := jsonDataMap["pass"].(string)
	repass, _ := jsonDataMap["rePass"].(string)

	if pass != repass {
		http.Error(w, "passwords do not match", http.StatusBadRequest)
		return
	}

	hashPass, _ := Hash(pass)
	person := models.User{
		Id:        primitive.NewObjectID(),
		FirstName: fname,
		LastName:  lname,
		Email:     email,
		Password:  hashPass,
		CreatedAt: time.Now(),
	}

	checkEmail, _ := database.Db.GetUserByEmail(person.Email)
	if checkEmail.Email == person.Email {
		http.Error(w, "user already exists", http.StatusConflict)
		return
	}

	_, err = database.Db.AddUser(&person)
	if err != nil {
		http.Error(w, "unable to register user", http.StatusInternalServerError)
		return
	}

	token, err := generateJWT(email)
	if err != nil {
		http.Error(w, "unable to generate token", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"token": token})
}

// BELOW CODE HANDLES THE LOGIN DETAILS
func (App *Application) Login(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}

	if err := r.ParseForm(); err != nil {
		http.Error(w, "unable to parse form", http.StatusBadRequest)
		return
	}

	defer r.Body.Close()

	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "unable to read body", http.StatusInternalServerError)
		return
	}

	var jsonDatamap map[string]interface{}
	if err := json.Unmarshal(body, &jsonDatamap); err != nil {
		http.Error(w, "error in decoding JSON", http.StatusBadRequest)
		return
	}

	email, _ := jsonDatamap["email"].(string)
	password, _ := jsonDatamap["password"].(string)

	db_user, db_err := database.Db.GetUserByEmail(email)
	if db_err != nil {
		http.Error(w, "user doesn't exist", http.StatusNotFound)
		return
	}

	password_err := bcrypt.CompareHashAndPassword([]byte(db_user.Password), []byte(password))
	if password_err != nil {
		http.Error(w, "invalid password", http.StatusUnauthorized)
		return
	}

	token, err := generateJWT(email)
	if err != nil {
		http.Error(w, "unable to generate token", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"token": token, "username": db_user.FirstName, "email": db_user.Email})
}
