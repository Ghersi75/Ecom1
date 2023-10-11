package main

import (
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

var print = fmt.Println

func handleGet(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Hello World!"))
}

func main() {
	r := chi.NewRouter()
	r.Use(middleware.Logger)

	r.Get("/", handleGet)

	print("Listening on port 3000")
	http.ListenAndServe(":3000", r)
}