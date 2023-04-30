package api

import (
    "github.com/gin-gonic/gin"
    "net/http"
	"fmt"
)


func GetTodos(c *gin.Context) {
    c.IndentedJSON(http.StatusOK, "Get Todos")
}

func AddTodos(c *gin.Context) {
    c.IndentedJSON(http.StatusOK, "Add Todos")
}

func DelTodos(c *gin.Context) {
    id := c.Param("id")
    message := fmt.Sprintf("Del Todo %s", id)
    c.IndentedJSON(http.StatusOK, gin.H{"message": message})
}

func DoneTodo(c *gin.Context) {
	id := c.Param("id")
    message := fmt.Sprintf("Done Todo %s", id)
    c.IndentedJSON(http.StatusOK, gin.H{"message": message})
}

func UndoneTodo(c *gin.Context) {
    id := c.Param("id")
    message := fmt.Sprintf("Undone Todo %s", id)
    c.IndentedJSON(http.StatusOK, gin.H{"message": message})
}

func AddDate(c *gin.Context) {
    date := c.Param("date")
    message := fmt.Sprintf("Add date: %s", date)
    c.IndentedJSON(http.StatusOK, gin.H{"message": message})
}



