package api

import (
	"backend/dataBase"
	"backend/internal/models"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt"
	"go.mongodb.org/mongo-driver/bson/primitive"
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
	decodedData, err := w.Write(out)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(decodedData)
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
	if r.Method != http.MethodGet {
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		return
	} else {
		urlId := r.URL.Query().Get("book_id")
		fmt.Println(string(urlId))

		defer r.Body.Close()

		ObjectId, err := primitive.ObjectIDFromHex(urlId)
		if err != nil {
			http.Error(w, "Invalid object Id", http.StatusBadRequest)
			return
		}

		getBook, err := database.Db.GetBookById(ObjectId)
		if err != nil {
			http.Error(w, "getting error in finding books", http.StatusNotFound)
			panic(err)
		}

		if err := json.NewEncoder(w).Encode(&getBook); err != nil {
			http.Error(w, "data not found", http.StatusInternalServerError)
		}

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
	// added http.methodPost instead POST
	if r.Method != "POST" {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	} else {
		if err := r.ParseForm(); err != nil {
			panic(err)
		}

		defer r.Body.Close()

		// PARSE BODY ITSELF
		body, err := io.ReadAll(r.Body)
		if err != nil {
			panic(err)
		}
		sb := string(body)
		jsonDataMap := make(map[string]interface{})
		if err := json.Unmarshal([]byte(sb), &jsonDataMap); err != nil {
			http.Error(w, "Error in decoding to Go map", http.StatusExpectationFailed)
		}

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
				Id:        primitive.NewObjectID(),
				FirstName: fname,
				LastName:  lname,
				Email:     email,
				Password:  hashPass,
				CreatedAt: time.Now(),
			}

			checkEmail, _ := database.Db.GetUserByEmail(person.Email)
			if checkEmail.Email == person.Email {
				decodeEmail, err := json.Marshal(checkEmail.Email)
				if err != nil {
					log.Fatal(err)
				}
				fmt.Printf("user already exists %s\n", string(decodeEmail))
				if err := json.NewEncoder(w).Encode(http.StatusNotFound); err != nil {
					log.Fatal(err)
					return
				}
				return
			} else {
				fmt.Println(w, "you can now register here ", http.StatusOK)
				_, err := database.Db.AddUser(&person)
				if err != nil {
					panic(err)
				}
				DecodeData, _ := json.Marshal(person)
				fmt.Printf("\n\nRegistered Data is : %s\n\n", DecodeData)
				if err := json.NewEncoder(w).Encode(http.StatusAccepted); err != nil {
					log.Fatal("Error in sending response to client", err)
					return
				}

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

	if r.Method != http.MethodPost {
		http.Error(w, "method not found", http.StatusMethodNotAllowed)
		return

	} else {

		if err := r.ParseForm(); err != nil {
			panic(err)
		}

		defer r.Body.Close()

		body, err := io.ReadAll(r.Body)
		sd := string(body)
		jsonDatamap := make(map[string]interface{})
		if err := json.Unmarshal([]byte(sd), &jsonDatamap); err != nil {
			log.Fatal(err)
		}

		email, _ := jsonDatamap["email"].(string)
		password, _ := jsonDatamap["password"].(string)

		// login credentials
		db_user, db_err := database.Db.GetUserByEmail(email)
		if db_err != nil {
			// SEND MESSAGE TO CLIENT - user doesn't exist
			fmt.Printf("\nError: %v\n", &db_err)
			fmt.Println(db_err)
			if err := json.NewEncoder(w).Encode(http.StatusNotFound); err != nil {
				http.Error(w, "Error in sending response to client", http.StatusNotAcceptable)
			}
		} else {

			fmt.Printf("\n\n DB info: %v\n\n", &db_user)
			password_err := bcrypt.CompareHashAndPassword([]byte(db_user.Password), []byte(password))

			if password_err != nil {
				http.Error(w, "Password not found", http.StatusNotFound)
			} else {

				fmt.Printf("\n\n valid password...? : %v \n\n", password_err == nil)
				if err := json.NewEncoder(w).Encode(http.StatusFound); err != nil {
					http.Error(w, "\nPassword not found\n", http.StatusNotFound)
				}

				user := models.User{
					UpdatedAt: time.Now(),
				}
				fmt.Println(user)
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

	}
}
