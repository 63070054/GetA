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

	var todos []Todos

	db, err := sql.Open("mysql", "admin:Zaza456654@tcp(get-a-db.c3fxksxqrbwf.us-east-1.rds.amazonaws.com:3306)/get-a")
	if err != nil {
		fmt.Println("Err!")
	}
	defer db.Close()
	err = db.Ping()
	if err != nil {
		fmt.Println("Ping Err!")
	}
	result, err := db.Exec("USE `get-a`")
	fmt.Println(result)

	rows, err := db.Query("SELECT Tasks.*, SubTasks.title, SubTasks.status, SubTasks.time ,SubTasks.Id FROM Tasks INNER JOIN SubTasks ON Tasks.id = SubTasks.taskId WHERE Tasks.ownerId = ?", userId)
	if err != nil {
		fmt.Println("Failed to execute query:", err)
		return
	}
	defer rows.Close()
	for rows.Next() {
		var todo Todos
		if err := rows.Scan(&todo.ID, &todo.Date, &todo.OwnerID, &todo.Title, &todo.Status, &todo.Time, &todo.TodoID); err != nil {
			fmt.Println("Failed to scan row:", err)
			return
		}
		todos = append(todos, todo)
	}

	fmt.Println("Connected!")

	c.IndentedJSON(http.StatusOK, todos)
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

	stmt, err := db.Prepare("INSERT INTO SubTasks (title,status,time, taskId) VALUES(?,?,?,?)")
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
