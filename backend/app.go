package main

import (
    "github.com/gin-gonic/gin"
    "github.com/gin-contrib/cors"
	"getA/web-api/api"
)

func main() {
    router := gin.Default()
    router.Use(cors.Default())

	router.GET("/users", api.GetUsers)
    router.GET("/user/:id", api.GetUser)
    router.POST("/users", api.CreateUser)
    router.DELETE("/users", api.DelUser)
    router.POST("/login", api.Login)


    router.GET("/todos", api.GetTodos)
    router.POST("/todos", api.AddTodos)
    router.DELETE("/todos/:id", api.DelTodos)
    router.POST("/done/:id", api.DoneTodo)
    router.POST("/undone/:id", api.UndoneTodo)
    router.POST("/date", api.AddDate)

    router.GET("/notes", api.GetNotes)
    router.GET("/note/:id", api.GetNote)
    router.POST("/note", api.UploadNote)
    router.DELETE("/note/:id", api.DelNote)
    router.GET("/folders", api.GetFolders)
    router.GET("/folder/:id", api.GetFolder)
    router.POST("/folder", api.AddFolder)
    router.DELETE("/folder", api.DelFolder)

    router.GET("/guides", api.GetGuides)
    router.GET("/guide/:id", api.GetGuide)
    router.POST("/guide", api.AddGuide)
    router.DELETE("/guide/:id", api.DelGuide)


    router.Run(":8888")


    
}