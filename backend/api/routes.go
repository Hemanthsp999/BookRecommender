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

	mux.Get("/", App.Home)

	mux.Get("/books", App.AllBooks)

	mux.Get("/genres", App.Genre)

	// below is for both signup and signin part
	mux.Post("/login", App.Login)

	mux.Post("/signup", App.Signup)

	return mux
}
