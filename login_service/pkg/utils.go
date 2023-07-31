package pkg 

import (
	"github.com/golang-jwt/jwt/v5"
)

func getIdFromToken(tokenString string) int {
    token, _ := jwt.ParseWithClaims(tokenString, &LoginReq{},
        func(token *jwt.Token)(any, error) {
            return []byte("secter"), nil
        })
    claims, _ := token.Claims.(*LoginReq)

    return claims.Id
}
