package main

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func (app *application) routes() http.Handler {
	//create a mux

	mux := chi.NewRouter()

	mux.Use(middleware.Recoverer)

	mux.Use(app.enableCORS)

	mux.Get("/", app.Home)

	mux.Get("/books", app.AllBooks)

	mux.Get("/login", app.Login)

	mux.Get("/genres", app.Genre)

	mux.Post("/signup", SignUp)

	return mux
}
