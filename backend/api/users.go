package api

import (
	"database/sql"
	"fmt"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"net/http"
)

type User struct {
	ID          *int    `db:"id" json:"id"`
	Name        string  `db:"name" json:"name"`
    UserName    string  `db:"userName" json:"userName"`
    Password    string  `db:"password" json:"password"`
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



func GetUsers(c *gin.Context) {
    var users []User
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
		if err := rows.Scan(&user.ID,&user.Password, &user.Name, &user.UserName, &user.Year, &user.Program, &user.SubjectArea); err != nil {
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

func CreateUser(c *gin.Context) {
	var user User
	if err := c.BindJSON(&user); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
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

	stmt, err := db.Prepare("INSERT INTO Users (name,username,password, year,program,subjectArea) VALUES(?,?,?,?,?,?)")
	if err != nil {
		// Handle error
	}
	defer stmt.Close()

	result, err := stmt.Exec(user.Name,user.UserName,user.Password,user.Year,user.Program,user.SubjectArea)
	if err != nil {
		fmt.Printf("Insert Err!")
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		// Handle error
	}

	fmt.Printf("Received user with name: %s\n", user.Name)
	c.IndentedJSON(http.StatusOK, rowsAffected)
}

func DelUser(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, "Delete Users")
}
