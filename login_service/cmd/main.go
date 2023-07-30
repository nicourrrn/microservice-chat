package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"microservices.com/login_service/pkg"

)



func main() {
    app := fiber.New()

    app.Post("/login", pkg.Login)

    log.Fatal(app.Listen(":3000"))
}


