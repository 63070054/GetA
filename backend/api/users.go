package api

import (
    "github.com/gin-gonic/gin"
    "net/http"
)

func SetupUsersRoutes(router *gin.Engine) {
    usersGroup := router.Group("/users")
    usersGroup.GET("/", GetUsers)
    usersGroup.POST("/", createUser)
}

func GetUsers(c *gin.Context) {
    c.IndentedJSON(http.StatusOK, "Test getting API")
}

func createUser(c *gin.Context) {
    // Handle POST /users
}