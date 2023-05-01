package api

import (
	"database/sql"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	_ "github.com/go-sql-driver/mysql"
)

func SetupUsersRoutes(router *gin.Engine) {
	// usersGroup := router.Group("/users")
	// usersGroup.GET("/", GetUsers)
	// usersGroup.POST("/", CreateUser)
	// // usersGroup.DELETE("/", DeleteUser)
}

func GetUsers(c *gin.Context) {
    db, err := sql.Open("mysql", "admin:Zaza456654@tcp(get-a-db.c3fxksxqrbwf.us-east-1.rds.amazonaws.com:3306)/get-a")
    if err != nil {
        fmt.Println("Err!")
    }
    defer db.Close()

    err = db.Ping()
    if err != nil {
        fmt.Println("Ping Err!")
    }
	fmt.Println("Connected!")

    rows, err := db.Query("SELECT * FROM Users")
    if err != nil {
        fmt.Println("Failed to execute query:", err)
        return
    }
    defer rows.Close()

    for rows.Next() {
        var user User
        if err := rows.Scan( &user.ID, &user.Name, &user.Year, &user.Program, &user.SubjectArea); err != nil {
            fmt.Println("Failed to scan row:", err)
            return
        }
        users = append(users, user)
    }

    if err := rows.Err(); err != nil {
        fmt.Println("Encountered an error while iterating over rows:", err)
        return
    }

    if err := rows.Err(); err != nil {
        fmt.Println("Encountered an error while iterating over rows:", err)
        return
    }

	c.IndentedJSON(http.StatusOK, users)
}

func GetUser(c *gin.Context) {
	id := c.Param("id")
	message := fmt.Sprintf("User id : %s", id)
	c.IndentedJSON(http.StatusOK, gin.H{"message": message})
}

type User struct {
    ID          *int    `db:"id" json:"id"`
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
	Network          Area = "Network"
	SoftwareEngineer Area = "Software Engineer"
	Multimedia       Area = "Multimedia"
	Other            Area = "อื่น ๆ"
)

var users []User

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
