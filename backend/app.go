package main

import (
    "github.com/gin-gonic/gin"
    "github.com/gin-contrib/cors"
	"getA/web-api/api"
    "os"
)

func main() {

    os.Setenv("AWS_ACCESS_KEY_ID", "ASIAYKNYT6L4LNCHWFP6")
    os.Setenv("AWS_SECRET_ACCESS_KEY", `TmxOnUDXvNPVw43LPm1ksQk2HuMrzWfL2PwJ9fow`)
    os.Setenv("AWS_SESSION_TOKEN", `FwoGZXIvYXdzENf//////////wEaDPojuYB3auv4jkJHsiLIAQcRq1lNfgVKD76aW6oH9Amdag8R7vyvItx/4k678ioq7LZVzVngvimx7JWHO7+qZ4uPR7Dl0Hi8Vb+FGy0gYfZIwHOxpiwthNgnq/Rz0RGQJ4VhH3TQOmV5UyC+hdg0kLCy1Xf4YO2+PzNWG0Y1UUtYNUEt+LuA+ehDVHwvhhLaRnGpcUegRHPvBVAOrjK4LZK/cf2QU9ZudNUHdVF7pITjhZhs3EdKx/f0lPNFabv17Ank9NxuWc04DYDXbYH1itqSAIELUYvBKJPsx6IGMi3dC1PvosuIEUqCU51l4CfSHt4YAvmW4be4h1UJMnBpgqNBFLJ+nV5PTp2r8yc=`)

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