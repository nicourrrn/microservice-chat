package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"microservices.com/login_service/pkg"

)



func main() {
    app := fiber.New()

    app.Post("/login", pkg.Login)
    app.Post("/get_id", pkg.GetIdFromToken)

    go pkg.HandleMessages()

    log.Fatal(app.Listen(":3000"))
}


