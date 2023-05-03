package main

import (
    "github.com/gin-gonic/gin"
    "github.com/gin-contrib/cors"
	"getA/web-api/api"
    "os"
)

func main() {

    os.Setenv("AWS_ACCESS_KEY_ID", "ASIAYKNYT6L4LPOJ32NV")
    os.Setenv("AWS_SECRET_ACCESS_KEY", `FKKAZgaEQhjFS1tWr0cU4HYA1q0nrvJ3Qy6T+2RJ`)
    os.Setenv("AWS_SESSION_TOKEN", `FwoGZXIvYXdzENT//////////wEaDBAlw5wsrIKd0KGPciLIAVPV46uZjeRRN2DPgYybEBt0yBBBQ8nqC0Jd8VX2Q43kDv0dVmZtBwwvxKhG9JsNU4BV+Nf/tgOxNeqip8bfJOohucxIT+qu9XSIE4GkeWxZLxOzJ+JL4O+Bjx1Rvo7bObjUG9vRYl/3vI7SIFWEBNXgOlDwLQRj/0tT+bF5yw5yZHMLL2s3bnxQESHaiI/qBdxN+7HgikWVGZgmPtcpuVlVbjO2GVwrQNqVzZu6OBZ/RQSHYOJcJNFURprRY1kFKLgiLApOHv39KOWSx6IGMi13Wv0I4/Z8msU90BHOeWey/3xpK34fXV2y46AdLXOKZl7Kwqg+LdTHnY8jKzk=`)

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