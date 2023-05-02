package api

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"net/http"
	"strings"
	"strconv"
)

type UserFolder struct {
    Id          int        `json:"id" db:"id"`
    Name        string      `json:"name" db:"name"`
}

type UserGuideLine struct {
		Id          int        `json:"id" db:"id"`
    Title        string      `json:"title" db:"title"`
    Description        string      `json:"description" db:"description"`
}

type User struct {
	ID          *int    `db:"id" json:"id"`
	Name        string  `db:"name" json:"name"`
	UserName    string  `db:"userName" json:"userName"`
	Password    string  `db:"password" json:"password"`
	Year        Year    `db:"year" json:"year"`
	Program     Program `db:"program" json:"program"`
	MyFolder     []UserFolder `db:"myFolder" json:"myFolder"`
	MyGuideLine  []UserGuideLine `db:"myGuideLine" json:"myGuideLine"`
	SubjectArea Area    `db:"subject_area" json:"subjectArea"`
}

type LoginUser struct {
	UserName string `db:"userName" json:"userName"`
	Password string `db:"password" json:"password"`
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
		if err := rows.Scan(&user.ID, &user.Password, &user.Name, &user.UserName, &user.Year, &user.Program, &user.SubjectArea); err != nil {
			fmt.Println("Failed to scan row:", err)
			return
		}
		users = append(users, user)
	}

	fmt.Println(users)

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

	rows, err := db.Query(`SELECT u.*,
       GROUP_CONCAT(DISTINCT f.id, ':::', f.name SEPARATOR '??') as myFolder,
       GROUP_CONCAT(DISTINCT g.id, ':::', g.title, ':::', g.description SEPARATOR '??') as myGuideLine
        FROM Users u
        LEFT JOIN Folders f ON f.ownerId = u.id
				LEFT JOIN GuideLines g on g.ownerId = u.id
				WHERE u.id = ?
        GROUP BY u.id`, id)
	if err != nil {
		fmt.Println("Failed to execute query:", err)
		return
	}
	defer rows.Close()

	fmt.Println("TEST")

	for rows.Next() {
			var user User
			var folderStr []uint8
			var guideLineStr []uint8
			if err := rows.Scan(&user.ID, &user.Password, &user.Name, &user.UserName, &user.Year, &user.Program, &user.SubjectArea, &folderStr, &guideLineStr); err != nil {
				fmt.Println("Failed to scan row:", err)
				return
			}

			user.MyFolder = make([]UserFolder, 0)
			folderArr := strings.Split(string(folderStr), "??")
			
			if len(folderArr) > 1 {
					for _, folder := range folderArr {
							parts := strings.Split(folder, ":::")
							folderId, err := strconv.Atoi(parts[0])
							if err != nil {
									// handle the error
							}
							folderName := parts[1]
							user.MyFolder = append(user.MyFolder, UserFolder{
									Id: folderId,
									Name: folderName,
							})
					}
			}

			user.MyGuideLine = make([]UserGuideLine, 0)
			guideLineArr := strings.Split(string(guideLineStr), "??")
			
			if len(guideLineArr) > 1 {
					for _, guideLine := range guideLineArr {
							parts := strings.Split(guideLine, ":::")
							guideLineId, err := strconv.Atoi(parts[0])
							if err != nil {
									// handle the error
							}
							guideLineTitle := parts[1]
							guideLineDescription := parts[1]
							user.MyGuideLine = append(user.MyGuideLine, UserGuideLine{
									Id: guideLineId,
									Title: guideLineTitle,
									Description: guideLineDescription,
							})
					}
			}

		users = append(users, user)
	}

	fmt.Println(users)

	if err != nil {
		fmt.Println("Failed to marshal JSON:", err)
		return
	}

	c.IndentedJSON(http.StatusOK, users)
}

func Login(c *gin.Context) {
	var loginuser LoginUser
	if err := c.BindJSON(&loginuser); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
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

	rows, err := db.Query(`SELECT u.*,
       GROUP_CONCAT(DISTINCT f.id, ':::', f.name SEPARATOR '??') as myFolder,
       GROUP_CONCAT(DISTINCT g.id, ':::', g.title, ':::', g.description SEPARATOR '??') as myGuideLine
        FROM Users u
        LEFT JOIN Folders f ON f.ownerId = u.id
				LEFT JOIN GuideLines g on g.ownerId = u.id
				WHERE username = ? AND password = ?
        GROUP BY u.id`, loginuser.UserName, loginuser.Password)
	if err != nil {
		fmt.Println("Failed to execute query:", err)
		return
	}
	defer rows.Close()

	for rows.Next() {
			var user User
			var folderStr []uint8
			var guideLineStr []uint8
			if err := rows.Scan(&user.ID, &user.Password, &user.Name, &user.UserName, &user.Year, &user.Program, &user.SubjectArea, &folderStr, &guideLineStr); err != nil {
				fmt.Println("Failed to scan row:", err)
				return
			}

			user.MyFolder = make([]UserFolder, 0)
			folderArr := strings.Split(string(folderStr), "??")
			
			if len(folderArr) > 1 {
					for _, folder := range folderArr {
							parts := strings.Split(folder, ":::")
							folderId, err := strconv.Atoi(parts[0])
							if err != nil {
									// handle the error
							}
							folderName := parts[1]
							user.MyFolder = append(user.MyFolder, UserFolder{
									Id: folderId,
									Name: folderName,
							})
					}
			}

			user.MyGuideLine = make([]UserGuideLine, 0)
			guideLineArr := strings.Split(string(guideLineStr), "??")
			
			if len(guideLineArr) > 1 {
					for _, guideLine := range guideLineArr {
							parts := strings.Split(guideLine, ":::")
							guideLineId, err := strconv.Atoi(parts[0])
							if err != nil {
									// handle the error
							}
							guideLineTitle := parts[1]
							guideLineDescription := parts[1]
							user.MyGuideLine = append(user.MyGuideLine, UserGuideLine{
									Id: guideLineId,
									Title: guideLineTitle,
									Description: guideLineDescription,
							})
					}
			}

		users = append(users, user)
	}
	userByIDEncode, err := json.Marshal(users)

	if err != nil {
		fmt.Println("Failed to marshal JSON:", err)
		return
	}

	c.IndentedJSON(http.StatusOK, userByIDEncode)
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

	result, err := stmt.Exec(user.Name, user.UserName, user.Password, user.Year, user.Program, user.SubjectArea)
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
