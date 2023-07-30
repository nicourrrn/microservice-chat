package pkg

import (
	"time"

	"github.com/gofiber/fiber/v2"
    "github.com/golang-jwt/jwt/v5"
)

type LoginResp struct {
    Token string `json:"token"`
}
type LoginReq struct {
    Id int `json:"id"`
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
            claims).SignedString([]byte("secret_key"))
    if err != nil {
        return c.SendStatus(fiber.StatusInternalServerError)
    }
    
    return c.JSON(LoginResp{Token: token})
}
