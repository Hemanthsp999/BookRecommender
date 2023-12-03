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

var SECRET_KEY = []byte("THIS IS NOT JUST A KEY BUT ITS ACTUALLY JUST A KEY")

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

	if r.Method == "GET" {

		var books models.Book
		defer r.Body.Close()

		json.NewDecoder(r.Body).Decode(&books)

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
	if r.Method == "GET" {
		if err := r.ParseForm(); err != nil {
			log.Panic(err)
			return
		}

		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			log.Panic(err)
		}
		sBody := string(body)
		BookType := make(map[string]interface{})
		json.Unmarshal([]byte(sBody), &BookType)

		bookGenre, _ := BookType["Title"].(string)
		DataBaseAction, err := database.Db.GetBookById(bookGenre)
		if err != nil {
			log.Panic(err)
			return
		} else {
			fmt.Println(DataBaseAction)
			json.NewEncoder(w).Encode(&DataBaseAction)
			fmt.Fprint(w, json.NewEncoder(w).Encode(http.StatusOK))
		}

	} else {
		fmt.Println(http.StatusMethodNotAllowed)
	}

	w.Header().Set("Content-Type", "application/json")
}

func Hash(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), err
}

// implemented JWT Token authentication for userLogin
func generateJWT(email string) (string, error) {
	expirationTime := time.Now().Add(30 * time.Minute)
	claims := models.User{
		Email: email,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(SECRET_KEY)
	if err == nil {
		return tokenString, nil
	}
	return tokenString, nil
}

// verifyToken
func VerifyToken(tokenString string) (email string, err error) {
	claims := &models.User{}

	token, err := jwt.ParseWithClaims(tokenString, claims, func(t *jwt.Token) (interface{}, error) {
		return SECRET_KEY, nil
	})
	if token != nil {
		return claims.Email, nil
	}
	return tokenString, err
}

// BELOW CODE IS FOR SIGNUP PART
func (App *Application) Signup(w http.ResponseWriter, r *http.Request) {

	if r.Method != "POST" {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	} else {
		if err := r.ParseForm(); err != nil {
			panic(err)
		}

		defer r.Body.Close()

		// PARSE BODY ITSELF
		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			panic(err)
		}
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

			checkEmail, _ := database.Db.GetUserByEmail(person.Email)
			if checkEmail.Email == person.Email {
				json.Marshal(checkEmail.Email)
				fmt.Printf("user already exists %s\n", checkEmail.Email)
				json.NewEncoder(w).Encode(http.StatusNotFound)
				return
			} else {
				fmt.Println(w, "you can now register here ", http.StatusOK)
				_, err := database.Db.AddUser(&person)
				if err != nil {
					panic(err)
				}
				DecodeData, _ := json.Marshal(person)
				fmt.Printf("\n\nRegistered Data is : %s\n\n", DecodeData)
				json.NewEncoder(w).Encode(http.StatusAccepted)

			}

		} else {
			fmt.Println("password is not matching")
			return
		}

	}
	w.Header().Set("Content-Type", "application/json")
}

// BELOW CODE HANDLES THE LOGIN DETAILS
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
		db_user, db_err := database.Db.GetUserByEmail(email)
		if db_err != nil {
			// SEND MESSAGE TO CLIENT - user doesn't exist
			fmt.Printf("\nError: %v\n", &db_err)
			fmt.Println(db_err)
			json.NewEncoder(w).Encode(http.StatusNotFound)
		} else {

			fmt.Printf("\n\n DB info: %v\n\n", &db_user)
			password_err := bcrypt.CompareHashAndPassword([]byte(db_user.Password), []byte(password))

			if password_err != nil {
				json.NewEncoder(w).Encode(http.StatusNotFound)
			} else {

				fmt.Printf("\n\n valid password...? : %v \n\n", password_err == nil)
				json.NewEncoder(w).Encode(http.StatusFound)

				var Token models.User
				// JWT Token for auth
				Token.Token, err = generateJWT(email)
				if err != nil {
					log.Panic(err)
				}
				fmt.Printf("login jwt %s \n", Token.Token)
				return

			}
		}

		if err != nil {
			panic(err)
		}

		json.Marshal(db_user.Email)
		fmt.Printf("marshalled user %s\n", db_user.Email)
		fmt.Printf("marshalled password: %s\n", db_user.Password)
	}
}

// ADD	TO FAVOURITES
func (App *Application) Favourites(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		if err := r.ParseForm(); err != nil {
			log.Panic(err)
		}

		PageBody, err := ioutil.ReadAll(r.Body)
		if err != nil {
			log.Fatal(err)
		}
		StringPage := string(PageBody)
		PageFav := make(map[string]interface{})

		json.Unmarshal([]byte(StringPage), &PageFav)

		fav := PageFav["AddFav"].(string)
		var addFav *models.Book

		addFav = &models.Book{
			Title: fav,
		}

		getBase, err := database.Db.GetFavourites(addFav)
		if err != nil {
			log.Panic(err)
		}
		DBase, _ := json.Marshal(getBase)
		fmt.Printf("Handler.go part %s \n ", string(DBase))

	} else {
		fmt.Println(http.StatusMethodNotAllowed)
	}
}
