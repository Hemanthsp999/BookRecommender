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

	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"
)

var SECRET_KEY = []byte("gosecretkey")

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

func Hash(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.MinCost)
	return string(bytes), err
}

/*
func verify(hashedPwd string, plainPwd []byte) bool {
	// hash password is in string format
	// so we'll need to convert it to byte slice
	byteHash := []byte(hashedPwd)
	err := bcrypt.CompareHashAndPassword(byteHash, []byte(pass))
	if err != nil {
		log.Println(err)
		return false
	}
	return true
}
*/

// server to handle Genres

func (App *Application) Genre(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w,"still in progress %v",r)

}

// implemented JWT Token authentication for userLogin
func generateJWT() (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)
	tokenString, err := token.SignedString(SECRET_KEY)
	if err != nil {
		log.Println("Error in jwt token generation")
		return "", err
	}
	return tokenString, nil
}

// BELOW CODE IS FOR SIGNUP PART
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

		//database.Db.AddUser(person)

		fmt.Printf("person %s\n", person)

		json.NewEncoder(w).Encode(person)
	}

}
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

		// login credentials
		var user models.User
	
		// Hash method is calling to convert PLAIN TEXT into HASH
		hashPassword, _ := Hash(password)
		fmt.Printf("converted to hash %s\n", hashPassword)

		//verifiedHash := verify(hashPassword)

		user = models.User{
			Email:    email,
			Password: hashPassword,
		}
		// this point to validateUser method declared in database and finds the particular object
		database.Db.ValidateUser(&user)

		jwtToken, err := generateJWT()
		if err != nil {
			log.Fatal(err,jwtToken)
			return
		}

		DecodeJson, err := json.Marshal(user)
		if err != nil {
			panic(err)
		}
		fmt.Printf("Login credentials %s\n", DecodeJson)
		fmt.Printf("decode json %s\n", DecodeJson)


		json.NewEncoder(w).Encode(user)
	}
}
