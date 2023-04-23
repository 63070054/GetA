package api

import (
    "github.com/gin-gonic/gin"
    "net/http"
	"fmt"
)


func GetGuide(c *gin.Context) {
    id := c.Param("id")
    message := fmt.Sprintf("Get guide: %s", id)
    c.IndentedJSON(http.StatusOK, gin.H{"message": message})
}

func GetGuides(c *gin.Context) {
    c.IndentedJSON(http.StatusOK, "Get all notes")
}

func AddGuide(c *gin.Context) {
    c.IndentedJSON(http.StatusOK, "Add guide")
}

func DelGuide(c *gin.Context) {
    id := c.Param("id")
    message := fmt.Sprintf("Del guide: %s", id)
    c.IndentedJSON(http.StatusOK, gin.H{"message": message})
}