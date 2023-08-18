package api

import (
	"backend/dataBase"
	"backend/internal/models"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"golang.org/x/crypto/bcrypt"
)

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
	w.Write(out)
}

func (App *Application) AllBooks(w http.ResponseWriter, r *http.Request) {
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

func verify(hashed, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashed), []byte(password))
	return err == nil
}

//BELOW CODE HANDLES THE LOGIN INFORMATION

func (App *Application) Login(w http.ResponseWriter, r *http.Request) {

	if r.Method != "POST" {
		http.Error(w, "method not found", http.StatusMethodNotAllowed)
		return
	} else {
		if err := r.ParseForm(); err != nil {
			panic(err)
		}

		defer r.Body.Close()

		body, err := ioutil.ReadAll(r.Body)
		sd := string(body)
		jsonDatamap := make(map[string]interface{})
		json.Unmarshal([]byte(sd), &jsonDatamap)

		email, _ := jsonDatamap["email"].(string)
		password, _ := jsonDatamap["password"].(string)

		var user models.LoginCredentials

		// hashPass, _ := Hash(password) - don't hash compare raw-string password with hash using bcrypt's CompareHashAndPassword method

		// Why you need this extra struct of LoginCredentials....?
		// user = models.LoginCredentials{
		// 	Email:    email,
		// 	Password: hashPass,
		// }

		db_user, db_err := database.Db.GetUserByEmail(email)

		if db_err != nil {
			// send message to client - user doesn't exist
			fmt.Printf("\nError: %s\n", db_err)
			panic(db_err)
		}

		fmt.Printf("\n\n DB info: %s\n\n", db_user)
		password_error := bcrypt.CompareHashAndPassword([]byte(db_user.Password), []byte(password))


		fmt.Printf("\n\n Valid password..? : %v \n\n", password_error == nil)
		// send message to client - Password is invalid

		if err != nil {
			panic(err)
		}

		// database.Db.ValidateUser(&user)

		DecodeJson, err := json.Marshal(user)
		if err != nil {
			panic(err)
		}
		fmt.Printf("Login credentials %s\n", DecodeJson)
		fmt.Printf("decode json %s\n", DecodeJson)

		json.NewEncoder(w).Encode(user)
	}
}

// server to handle Genres

func (App *Application) Genre(w http.ResponseWriter, r *http.Request) {
	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb://localhost:27017/"))
	if err != nil {
		log.Fatal(err)
	}

	collection := client.Database("public").Collection("genres")

	fmt.Println(collection)

}

func Hash(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), err
}

//	BELOW CODE IS FOR SIGNUP PART AND IT'S BUG FREE

func (App *Application) Signup(w http.ResponseWriter, r *http.Request) {

	if r.Method != "POST" {
		http.Error(w, "method not allowed", http.StatusNotFound)
		return
	} else {
		if err := r.ParseForm(); err != nil {
			panic(err)
		}

		defer r.Body.Close()

		// PARSE BODY ITSELF
		body, err := ioutil.ReadAll(r.Body)
		sb := string(body)
		jsonDataMap := make(map[string]interface{})
		json.Unmarshal([]byte(sb), &jsonDataMap)

		fname, _ := jsonDataMap["fname"].(string)
		lname, _ := jsonDataMap["lname"].(string)
		email, _ := jsonDataMap["email"].(string)
		pass, _ := jsonDataMap["pass"].(string)
		repass, _ := jsonDataMap["rePass"].(string)

		var person models.User
		if pass == repass {
			hashPass, _ := Hash(pass)
			fmt.Printf("\n\n\n sent password is %s \n", pass)
			person = models.User{

				FirstName: fname,
				LastName:  lname,
				Email:     email,
				Password:  hashPass,
			}
			database.Db.AddUser(&person)

		} else {
			fmt.Println("password is not matching")
			return
		}

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

		database.Db.AddUser(&person)

		fmt.Printf("person %s\n", person)

		json.NewEncoder(w).Encode(person)
	}

}
