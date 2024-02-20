package api

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func (App *Application) Routes() http.Handler {
	//create a mux
	mux := chi.NewRouter()

	mux.Use(middleware.Recoverer)

	mux.Use(App.EnableCORS)

	mux.Options("/", App.Home)

	mux.Get("/books", App.AllBooks)

	mux.Get("/book/${id}", App.GetBook)

	mux.Post("/login", App.Login)

	mux.Post("/signup", App.Signup)

	return mux
}
