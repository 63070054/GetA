package api

import (
    "github.com/gin-gonic/gin"
    "net/http"
	"fmt"
)

type Task struct {
    ID        int  `db:"id" json:"id"`
    Date      string `db:"date" json:"date"`
    OwnerID   int `db:"ownerId" json:"ownerId"`
}

type SubTask struct {
    ID        int `db:"id" json:"id"`
    Title     string `db:"title" json:"title"`
    Status    bool `db:"status" json:"status"`
    Time      string `db:"time" json:"time"`
    TaskID    int `db:"taskId" json:"taskId"`
}

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



