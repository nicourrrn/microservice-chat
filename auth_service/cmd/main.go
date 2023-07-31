package main

import (
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"microservices.com/login_service/pkg"
)



func main() {
    app := fiber.New()

    app.Post("/login", pkg.Login)
    app.Post("/get_id", pkg.GetIdFromToken)

    go pkg.HandleMessages()
    
    address := os.Getenv("address")
    if address == "" {
        address = ":3000"
    }
    log.Fatal(app.Listen(address))
}


