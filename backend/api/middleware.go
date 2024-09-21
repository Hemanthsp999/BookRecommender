package api

import (
	"net/http"
	"context"
	"strings"
//	"github.com/golang-jwt/jwt/v4"
)

// MIDDLEWARE IS USED FOR GIVING ACCESS TO PARTICULAR PORT OR HOST ONLY
func (App *Application) EnableCORS(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")

		if r.Method == "OPTIONS" {
			w.Header().Set("Access-Control-Allow-Credentials", "true")
			w.Header().Set("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,OPTIONS,DELETE")
			w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, X-CSRF-Token, Authorization,X-Requested-With")
			return
		} else {
			h.ServeHTTP(w, r)
		}
	})
}

func (App *Application) AuthMiddleWare(next http.Handler) http.Handler{
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request){
		tokenString := r.Header.Get("Authorization")
		if strings.HasPrefix(tokenString, "Bearer "){
			tokenString = strings.TrimPrefix(tokenString, "Bearer ")
		}

		if tokenString == ""{
			http.Error(w, "Authroization header missing", http.StatusUnauthorized)
			return
		}

		claims, err := validateJWT(tokenString)
		if err != nil {
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			return
		}
		ctx := context.WithValue(r.Context(), "user", claims)
		r = r.WithContext(ctx)
		next.ServeHTTP(w, r)
	})
}
