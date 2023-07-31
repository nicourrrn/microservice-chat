package pkg

import (
	"context"
	"log"

	"github.com/redis/go-redis/v9"
)

var ctx = context.Background()
var redisClient = redis.NewClient(&redis.Options{
    Addr: "broker:6379",
    DB: 0,
})

func HandleMessages() {
    pubsub := redisClient.Subscribe(ctx, "tokens")
    channel := pubsub.Channel()
    log.Println("Start waitng for messages")
    log.Println(redisClient.Ping(ctx))
    for {
        message := <-channel
        log.Println(message.Payload)
    }
}
