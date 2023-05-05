package main

import (
    "github.com/gin-gonic/gin"
    "github.com/gin-contrib/cors"
	"getA/web-api/api"
    "os"
)

func main() {

    os.Setenv("AWS_ACCESS_KEY_ID", "ASIAYKNYT6L4DAMXFK63")
    os.Setenv("AWS_SECRET_ACCESS_KEY", `nc3scaIlnoyz5uBQEjRU3AERvAKTszwBWinLLn4D`)
    os.Setenv("AWS_SESSION_TOKEN", `FwoGZXIvYXdzEAwaDOk5Pu5rthjTAVl1tyLIAVY4Y/ClsMpgLiyY+AUwSSyvDAmPzV0UhL3uiCR+Sr5GSfkHAhYVCUqKOvR07XpP63hC6QVWfAWMCNMN/OyWGYGRNCvilxKBXsjbiBi2Todz8qG8Gkdyf9Mi4IliEAyDBaxlTGj9ZGgGqJitHK56RC0U9TjTjn07KZ+WXIWknkkv0/iDE4vfRbKIve3mffIT62rly7TX0BDVmYrUpL8vD71X4XJaU2nDVAGiBQLV+UM2Kdc5xZcHC8FodlbmYPO7SyW76+6pueHsKP+u06IGMi39w9qMuyuf8VrzWVyPIMlHDuhIXlE94vzSJf1mMyPgpMkRPHSXwD1wwO9v//c=`)

    router := gin.Default()

	// Allow all origins
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
    config.AllowMethods = []string{"GET", "PUT", "POST", "DELETE", "PATCH", "OPTIONS"}
    config.AllowHeaders = []string{"Authorization", "Content-Type"}

	router.Use(cors.New(config))

	router.GET("/users", api.GetUsers)
    router.GET("/user/:id", api.GetUser)
    router.POST("/users", api.CreateUser)
    router.DELETE("/users", api.DelUser)
    router.POST("/login", api.Login)


    router.GET("/todos/:id", api.GetTodos)
    router.POST("/todos", api.AddTodos)
    router.DELETE("/todos/:id", api.DelTodos)
    router.POST("/done/:id", api.DoneTodo)
    router.POST("/undone/:id", api.UndoneTodo)
    router.POST("/date", api.AddDate)

    router.GET("/files", api.GetFiles)
    router.GET("/folderById/:folderId/file/:id", api.GetFile)
    router.POST("/file", api.UploadFile)
    router.DELETE("/file/:id", api.DelFile)
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