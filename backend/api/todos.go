package api

import (
	"database/sql"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
    "strconv"
)

type Task struct {
	ID      int    `db:"id" json:"id"`
	Date    string `db:"date" json:"date"`
	OwnerID int    `db:"ownerId" json:"ownerId"`
}

type SubTask struct {
	ID     *int    `db:"id" json:"id"`
	Title  string `db:"title" json:"title"`
	Status bool   `db:"status" json:"status"`
	Time   *string `db:"time" json:"time"`
	TaskID int    `db:"taskId" json:"taskId"`
}

type Todos struct{
    ID int `db:"id" json:"id"`
    Date string `db:"date" json:"date"`
    OwnerID int `db:"ownerId" json:"ownerId"`
    Title  string `db:"title" json:"title"`
	Status bool   `db:"status" json:"status"`
	Time   *string `db:"time" json:"time"`
    TodoID   string `db:"Id" json:"todoID"`
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

    db, err := sql.Open("mysql", "admin:Zaza456654@tcp(get-a-db.c3fxksxqrbwf.us-east-1.rds.amazonaws.com:3306)/get-a")
	if err != nil {
		fmt.Println("Err!")
	}
	defer db.Close()
	err = db.Ping()
	if err != nil {
		fmt.Println("Ping Err!")
	}

	c.IndentedJSON(http.StatusOK, "Add Todos")
}

func DelTodos(c *gin.Context) {
	id := c.Param("id")
	message := fmt.Sprintf("Del Todo %s", id)
	c.IndentedJSON(http.StatusOK, gin.H{"message": message})
}

func DoneTodo(c *gin.Context) {
	id := c.Param("id")
	message := fmt.Sprintf("Done Todo %s", id)
	c.IndentedJSON(http.StatusOK, gin.H{"message": message})
}

func UndoneTodo(c *gin.Context) {
	id := c.Param("id")
	message := fmt.Sprintf("Undone Todo %s", id)
	c.IndentedJSON(http.StatusOK, gin.H{"message": message})
}

func AddDate(c *gin.Context) {
	userId := c.Param("userId")

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
	rows, err := db.Query("SELECT * FROM Tasks WHERE ownerId = ?", userId)
	if err != nil {
		fmt.Println("Failed to execute query:", err)
		return
	}
	defer rows.Close()
	for rows.Next() {
		var task Task
		if err := rows.Scan(&task.ID, &task.Date, &task.OwnerID); err != nil {
			fmt.Println("Failed to scan row:", err)
			return
		}
		tasks = append(tasks, task)
	}

	fmt.Println("Connected!")

	c.IndentedJSON(http.StatusOK, tasks)

}
