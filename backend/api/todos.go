package api

import (
	"database/sql"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"strconv"
)

type Task struct {
	ID      *int    `db:"id" json:"id"`
	Date    string `db:"date" json:"date"`
	OwnerID int    `db:"ownerId" json:"ownerId"`
  SubTasks []SubTask `json:subTasks`
}

type SubTask struct {
	ID     *int    `db:"id" json:"id"`
	Title  string  `db:"title" json:"title"`
	Status bool    `db:"status" json:"status"`
	Time   *string `db:"time" json:"time"`
	TaskID int     `db:"taskId" json:"taskId"`
}

type Todos struct {
	ID      int     `db:"id" json:"id"`
	Date    string  `db:"date" json:"date"`
	OwnerID int     `db:"ownerId" json:"ownerId"`
	Title   string  `db:"title" json:"title"`
	Status  bool    `db:"status" json:"status"`
	Time    *string `db:"time" json:"time"`
	TodoID  string  `db:"Id" json:"todoID"`
}

func GetTodos(c *gin.Context) {
	stringuserId := c.Param("id")
	fmt.Println(stringuserId)
	userId, err := strconv.Atoi(stringuserId)
	if err != nil {
		fmt.Println(err)
	}

	var tasks []Task

	db, err := sql.Open("mysql", "admin:Zaza456654@tcp(get-a-db.c3fxksxqrbwf.us-east-1.rds.amazonaws.com:3306)/get-a")
	if err != nil {
		fmt.Println("Err!")
	}
	defer db.Close()
	err = db.Ping()
	if err != nil {
		fmt.Println("Ping Err!")
	}

	allTasks, err := db.Query("SELECT * FROM Tasks WHERE ownerId = ?", userId)
	if err != nil {
		fmt.Println("Failed to execute query:", err)
		return
	}
	defer allTasks.Close()
	for allTasks.Next() {
		var task Task
		if err := allTasks.Scan(&task.ID, &task.Date, &task.OwnerID); err != nil {
			fmt.Println("Failed to scan row:", err)
			return
		}
		tasks = append(tasks, task)
	}

    allSubTasks, err := db.Query("SELECT * FROM SubTasks")
	if err != nil {
		fmt.Println("Failed to execute query:", err)
		return
	}
	defer allSubTasks.Close()
	for allSubTasks.Next() {
		var sub SubTask
		if err := allSubTasks.Scan(&sub.ID,&sub.Title,&sub.Status,&sub.Time, &sub.TaskID,   ); err != nil {
			fmt.Println("Failed to scan row:", err)
			return
		}
        for i, task := range tasks {
            if sub.TaskID == *task.ID{
                tasks[i].SubTasks = append(tasks[i].SubTasks, sub)
            }
            
        }
		
	}

	fmt.Println("Connected!")

	c.IndentedJSON(http.StatusOK, tasks)
}

func AddTodos(c *gin.Context) {

	var todo SubTask
	if err := c.BindJSON(&todo); err != nil {
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

	stmt, err := db.Prepare("INSERT INTO SubTasks (title,status,time, taskId ) VALUES(?,?,?,?)")
	if err != nil {
		// Handle error
	}
	defer stmt.Close()

	result, err := stmt.Exec(todo.Title, todo.Status, todo.Time, todo.TaskID)
	if err != nil {
		fmt.Printf("Insert Err!")
	}

	LastInsert, err := result.LastInsertId()
	if err != nil {
		// Handle error
	}

	c.IndentedJSON(http.StatusOK, LastInsert)
}

func DelTodos(c *gin.Context) {
	todoid := c.Param("id")
	id, err := strconv.Atoi(todoid)
	if err != nil {
		fmt.Println(err)
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

	stmt, err := db.Prepare("DELETE FROM SubTasks WHERE id = ?")
	if err != nil {
		fmt.Println("Del Err!")
	}
	defer stmt.Close()

	result, err := stmt.Exec(id)
	if err != nil {
		fmt.Println("Exec Err!")
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		// handle error
	}

	c.IndentedJSON(http.StatusOK, rowsAffected)
}

func DoneTodo(c *gin.Context) {
	todoid := c.Param("id")
	id, err := strconv.Atoi(todoid)
	if err != nil {
		fmt.Println(err)
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

	stmt, err := db.Prepare("UPDATE SubTasks SET status = ? WHERE id = ?")
	if err != nil {
	}
	defer stmt.Close()

	_, err = stmt.Exec(true, id)
	if err != nil {

	}
	c.IndentedJSON(http.StatusOK,id)
}

func UndoneTodo(c *gin.Context) {
	todoid := c.Param("id")
	id, err := strconv.Atoi(todoid)
	if err != nil {
		fmt.Println(err)
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

	stmt, err := db.Prepare("UPDATE SubTasks SET status = ? WHERE id = ?")
	if err != nil {
	}
	defer stmt.Close()

	_, err = stmt.Exec(false, id)
	if err != nil {

	}
	c.IndentedJSON(http.StatusOK,id)
}

func AddDate(c *gin.Context) {
	var task Task

    if err := c.BindJSON(&task); err != nil {
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

	stmt, err := db.Prepare("INSERT INTO Tasks (date,ownerId) VALUES(?,?)")
	if err != nil {
		// Handle error
	}
	defer stmt.Close()

	result, err := stmt.Exec(task.Date, task.OwnerID)
	if err != nil {
		fmt.Printf("Insert Err!")
	}

	LastInsert, err := result.LastInsertId()
	if err != nil {
		// Handle error
	}

	c.IndentedJSON(http.StatusOK, LastInsert)

}