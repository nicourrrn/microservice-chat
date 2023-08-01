package pkg

import (
	"log"
	"os"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
)

var secret_key = os.Getenv("secret_key")

type LoginResp struct {
    Token string `json:"token"`
    jwt.RegisteredClaims
}
type LoginReq struct {
    Id int `json:"id"`
    jwt.RegisteredClaims
}

func Login(c *fiber.Ctx) error {
    var loginData LoginReq 
    c.BodyParser(&loginData)
    if loginData.Id == 0 {
        return c.SendStatus(fiber.StatusBadRequest)
    }

    claims := jwt.MapClaims{
        "id": loginData.Id,
        "exp": time.Now().Add(time.Hour).Unix(),
    }
    token, err := jwt.NewWithClaims(jwt.SigningMethodHS256,
            claims).SignedString([]byte(secret_key))
    if err != nil {
        return c.SendStatus(fiber.StatusInternalServerError)
    }
    
    return c.JSON(LoginResp{Token: token})
}


func GetIdFromToken(c *fiber.Ctx) error {
    var req LoginResp
    log.Print("Req Body: ")
    log.Println(string(c.Body()))
    if err := c.BodyParser(&req); err != nil {
        return err 
    }
    return c.JSON(LoginReq{Id: getIdFromToken(req.Token)})
}
