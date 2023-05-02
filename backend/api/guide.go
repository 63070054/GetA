package api

import (
	"database/sql"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
    "strconv"
)

type Guideline struct {
	ID          *int            `db:"id" json:"id"`
	Title       string          `db:"title" json:"title"`
	Description string          `db:"description" json:"description"`
	OwnerID     int             `db:"ownerId" json:"ownerId"`
}

func GetGuide(c *gin.Context) {
	id := c.Param("id")
	userId, err := strconv.Atoi(id)
	if err != nil {
		fmt.Println(err)
	}
    var guides []Guideline
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

	rows, err := db.Query("SELECT * FROM GuideLines WHERE ownerId = ?",userId)
	if err != nil {
		fmt.Println("Failed to execute query:", err)
		return
	}
	defer rows.Close()

	for rows.Next() {
		var guide Guideline
		if err := rows.Scan(&guide.ID, &guide.Title, &guide.Description, &guide.OwnerID); err != nil {
			fmt.Println("Failed to scan row:", err)
			return
		}
		guides = append(guides, guide)
	}

	c.IndentedJSON(http.StatusOK, guides)
}

func GetGuides(c *gin.Context) {
	var guides []Guideline
	db, err := sql.Open("mysql", "admin:Zaza456654@tcp(get-a-db.c3fxksxqrbwf.us-east-1.rds.amazonaws.com:3306)/get-a")
	if err != nil {
		fmt.Println("Err!")
	}
	defer db.Close()
	err = db.Ping()
	if err != nil {
		fmt.Println("Ping Err!")
	}

	guideQury, err := db.Query("SELECT * FROM GuideLines")
	if err != nil {
		fmt.Println("Failed to execute query:", err)
		return
	}
	defer guideQury.Close()
	for guideQury.Next() {
		var guide Guideline
		if err := guideQury.Scan(&guide.ID, &guide.Title, &guide.Description, &guide.OwnerID); err != nil {
			fmt.Println("Failed to scan row:", err)
			return
		}
		guides = append(guides, guide)
	}

	c.IndentedJSON(http.StatusOK, guides)

}

func AddGuide(c *gin.Context) {
	var newGuide Guideline
	if err := c.BindJSON(&newGuide); err != nil {
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
	stmt, err := db.Prepare("INSERT INTO GuideLines (title,description,ownerId) VALUES(?,?,?)")
	if err != nil {
		// Handle error
	}
	defer stmt.Close()

	result, err := stmt.Exec(newGuide.Title, newGuide.Description, newGuide.OwnerID)
	if err != nil {
		fmt.Printf("Insert Err!")
	}

	LastInsert, err := result.LastInsertId()

	fmt.Println("Connected!")
	c.IndentedJSON(http.StatusOK, LastInsert)
}

func DelGuide(c *gin.Context) {
	id := c.Param("id")
	message := fmt.Sprintf("Del guide: %s", id)
	c.IndentedJSON(http.StatusOK, gin.H{"message": message})
}
