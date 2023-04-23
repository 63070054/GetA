package api

import (
    "github.com/gin-gonic/gin"
    "net/http"
    "fmt"
)

func SetupUsersRoutes(router *gin.Engine) {
    // usersGroup := router.Group("/users")
    // usersGroup.GET("/", GetUsers)
    // usersGroup.POST("/", CreateUser)
    // // usersGroup.DELETE("/", DeleteUser)
}

func GetUsers(c *gin.Context) {
    c.IndentedJSON(http.StatusOK, "Get Users")
}

func GetUser(c *gin.Context) {
     id := c.Param("id")
    message := fmt.Sprintf("User id : %s", id)
    c.IndentedJSON(http.StatusOK, gin.H{"message": message})
}

func CreateUser(c *gin.Context) {
    c.IndentedJSON(http.StatusOK, "Create Users")
}

func DelUser(c *gin.Context) {
    c.IndentedJSON(http.StatusOK, "Delete Users")
}