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

type User struct {
    Name        string  `db:"name" json:"name"`
    Year        Year    `db:"year" json:"year"`
    Program     Program `db:"program" json:"program"`
    SubjectArea Area    `db:"subject_area" json:"subjectArea"`
}

type Year string

const (
    Year1 Year = "ปี 1"
    Year2 Year = "ปี 2"
    Year3 Year = "ปี 3"
    Year4 Year = "ปี 4"
)

type Program string

const (
    IT   Program = "IT"
    DSBA Program = "DSBA"
)

type Area string

const (
    Network         Area = "Network"
    SoftwareEngineer Area = "Software Engineer"
    Multimedia      Area = "Multimedia"
    Other           Area = "อื่น ๆ"
)


func CreateUser(c *gin.Context) {
    var user User
    if err := c.BindJSON(&user); err != nil {
        c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    fmt.Printf("Received user with name: %s\n", user.Name)
    c.IndentedJSON(http.StatusOK, "Create Users")
}

func DelUser(c *gin.Context) {
    c.IndentedJSON(http.StatusOK, "Delete Users")
}