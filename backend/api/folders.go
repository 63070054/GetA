package api

import (
    "github.com/gin-gonic/gin"
    "net/http"
	"fmt"
)


func GetFile(c *gin.Context) {
    id := c.Param("id")
    message := fmt.Sprintf("Get file: %s", id)
    c.IndentedJSON(http.StatusOK, gin.H{"message": message})
}

func GetFiles(c *gin.Context) {
    c.IndentedJSON(http.StatusOK, "Get all files")
}

func UploadFile(c *gin.Context) {
    c.IndentedJSON(http.StatusOK, "Upload file")
}

func DelFile(c *gin.Context) {
    id := c.Param("id")
    message := fmt.Sprintf("Del file: %s", id)
    c.IndentedJSON(http.StatusOK, gin.H{"message": message})
}

func AddFolder(c *gin.Context) {
    c.IndentedJSON(http.StatusOK, "Add folder")
}

func GetFolders(c *gin.Context) {
    c.IndentedJSON(http.StatusOK, "Get folders")
}

func GetFolder(c *gin.Context) {
    id := c.Param("id")
    message := fmt.Sprintf("Get folder: %s", id)
    c.IndentedJSON(http.StatusOK, gin.H{"message": message})
}

func DelFolder(c *gin.Context) {
    id := c.Param("id")
    message := fmt.Sprintf("Del note: %s", id)
    c.IndentedJSON(http.StatusOK, gin.H{"message": message})
}