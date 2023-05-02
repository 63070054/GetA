package api

import (
    "github.com/gin-gonic/gin"
    "net/http"
	"fmt"
    "database/sql"
)


func GetGuide(c *gin.Context) {
    id := c.Param("id")
    message := fmt.Sprintf("Get guide: %s", id)
    c.IndentedJSON(http.StatusOK, gin.H{"message": message})
}

type GuideLine struct {
	Id          *int    `db:"id" json:"id"`
	Title        string  `db:"title" json:"title"`
	Description  string  `db:"description" json:"description"`
	OwnerId    	 int  `db:"ownerId" json:"ownerId"`
	OwnerName    string  `db:"ownerName" json:"ownerName"`
}



func GetGuides(c *gin.Context) {
    var guideLines []GuideLine
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

	rows, err := db.Query("SELECT g.*, u.name as ownerName FROM GuideLines g LEFT JOIN Users u ON g.ownerId = u.id")
	if err != nil {
		fmt.Println("Failed to execute query:", err)
		return
	}
	defer rows.Close()

	for rows.Next() {
		var guideLine GuideLine
		if err := rows.Scan(&guideLine.Id, &guideLine.Title, &guideLine.Description, &guideLine.OwnerId, &guideLine.OwnerName); err != nil {
			fmt.Println("Failed to scan row:", err)
			return
		}
		guideLines = append(guideLines, guideLine)
	}

	fmt.Println(guideLines)

	if err := rows.Err(); err != nil {
		fmt.Println("Encountered an error while iterating over rows:", err)
		return
	}

	if err := rows.Err(); err != nil {
		fmt.Println("Encountered an error while iterating over rows:", err)
		return
	}

	c.IndentedJSON(http.StatusOK, guideLines)
}

func AddGuide(c *gin.Context) {
	var newGuide GuideLine
	fmt.Println(newGuide)
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
	stmt, err := db.Prepare("INSERT INTO GuideLines (title, description, ownerId) VALUES(?,?,?)")
	if err != nil {
		// Handle error
	}
	defer stmt.Close()

	result, err := stmt.Exec(newGuide.Title, newGuide.Description, newGuide.OwnerId)
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