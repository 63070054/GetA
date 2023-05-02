package main

import (
    "github.com/gin-gonic/gin"
    "github.com/gin-contrib/cors"
	"getA/web-api/api"
    "os"
)

func main() {

    os.Setenv("AWS_ACCESS_KEY_ID", "ASIAYKNYT6L4K2PF6NFH")
    os.Setenv("AWS_SECRET_ACCESS_KEY", `mnvIEt+TLmXi+G2fGURm6IBdHc/6C2N5376e/K8w`)
    os.Setenv("AWS_SESSION_TOKEN", `FwoGZXIvYXdzELz//////////wEaDARQLew6KTFKmbnDiiLIARLZOa74Zw/x4QDTioRtOttscPiYZeaPz7hWb7R8Pgtr33icoHHb/67rPYEm1zi7JsflxZn4R/+e36FsTRR1/UmamINi9QXhJolVdZpt498QTOGHV3NuiNNrodyrgy10P/Tyf8hjmX2sg3l1HmsE0Xngxm4sJtEVvj5T7E5cikonc+FxTC4rRwtvPI/hthcl06O7azkYGdfOA4HBIhaznSQHbtFiYw2NORVZYHBDuRy5f/54y0wuXS8h06iHyYyNJf6vHVf/+HOjKOf1waIGMi1eGj3O4egnErmNSsjVTtnbcbW7BhWvcb5/0Y4Vk9zxTacULaJ47dF0Xtiw050=`)

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

    router.GET("/allGuides", api.GetGuides)
    router.GET("/guide/:id", api.GetGuide)
    router.POST("/newGuide", api.AddGuide)
    router.DELETE("/guide/:id", api.DelGuide)


    router.Run(":8888")


    
}