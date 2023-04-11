package main

import (
    "github.com/gin-gonic/gin"
    "github.com/gin-contrib/cors"
	"getA/web-api/api"
)

func main() {
    router := gin.Default()
    router.Use(cors.Default())
	router.GET("/users", api.GetUsers)
    router.Run("localhost:8888")
}