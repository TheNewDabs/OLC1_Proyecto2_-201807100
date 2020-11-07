package main

import "net/http"

func main() {
	Pagina := http.FileServer(http.Dir("public"))
	http.Handle("/", http.StripPrefix("/", Pagina))
	http.ListenAndServe(":1000", nil)
}
