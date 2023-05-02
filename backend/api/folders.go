package api

import (
	"database/sql"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
    "strconv"
    "mime/multipart"
    "github.com/aws/aws-sdk-go/aws"
    "github.com/aws/aws-sdk-go/aws/session"
    "github.com/aws/aws-sdk-go/service/s3"
    "io/ioutil"
    "bytes"
    "github.com/aws/aws-sdk-go/aws/credentials"
    "os"
)


type FolderFile struct {
    Id  *int64 `json:id db:id`
    Name string `json:name db:name`
    FilePath string `json:filePath db:filePath`
    FolderId int `json:folderId db:folderId`
}


func GetFile(c *gin.Context) {
    id := c.Param("id")
    folderId := c.Param("folderId")

    var folderFiles []FolderFile
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
	rows, err := db.Query(`
        SELECT * FROM FolderFiles
        WHERE id = ? AND folderId = ?
        `, id, folderId)

	if err != nil {
		fmt.Println("Failed to execute query:", err)
		return
	}


	defer rows.Close()

	for rows.Next() {
		var folderFile FolderFile

        if err := rows.Scan(&folderFile.Id, &folderFile.Name, &folderFile.FilePath, &folderFile.FolderId); err != nil {
            fmt.Println("Failed to scan row:", err)
            return
        }

        
		folderFiles = append(folderFiles, folderFile)
	}
    fmt.Println("test")


	if err := rows.Err(); err != nil {
		fmt.Println("Encountered an error while iterating over rows:", err)
		return
	}

    fmt.Println(folderFiles)


	c.IndentedJSON(http.StatusOK, folderFiles)
}

func GetFiles(c *gin.Context) {
    c.IndentedJSON(http.StatusOK, "Get all files")
}

type UploadFilesModel struct {
	Files     []*multipart.FileHeader `form:"files"`
	FolderID  int                     `form:"folderId"`
}

func UploadFile(c *gin.Context) {
    // Parse the multipart form data from the request
    form, err := c.MultipartForm()
    if err != nil {
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

    // Get the files from the form data
    files := form.File["files"]

    // Get the folder ID from the form data
    folderId := form.Value["folderId"][0]

     sess, err := session.NewSession(&aws.Config{
        Region: aws.String("us-east-1"),
        Credentials: credentials.NewStaticCredentials(
            os.Getenv("AWS_ACCESS_KEY_ID"),
            os.Getenv("AWS_SECRET_ACCESS_KEY"),
        os.Getenv("AWS_SESSION_TOKEN"),),
    })


    if err != nil {
        c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    // Create an S3 client
    svc := s3.New(sess)
    var newFilesId []FolderFile;

    // Loop through the files and upload them to S3
    for _, file := range files {
        // Open the file
        f, err := file.Open()
        if err != nil {
            c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
            return
        }
        defer f.Close()

        // Read the file into a byte array
        fileBytes, err := ioutil.ReadAll(f)
        if err != nil {
            c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
            return
        }

        // Create a new S3 object key
        objectKey := fmt.Sprintf("%s/%s", folderId, file.Filename)

        url := fmt.Sprintf("https://get-a-files.s3.amazonaws.com/%s", objectKey)

        // Create a new S3 object
        _, err = svc.PutObject(&s3.PutObjectInput{
            Body:   bytes.NewReader(fileBytes),
            Bucket: aws.String("get-a-files"),
            Key:    aws.String(objectKey),
             ContentType: aws.String("application/pdf"),
        })


        if err != nil {
            c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
            return
        }

        stmt, err := db.Prepare("INSERT INTO FolderFiles (name, filePath, folderId) VALUES(?,?,?)")
        if err != nil {
            // Handle error
        }
        defer stmt.Close()

        result, err := stmt.Exec(file.Filename, url, folderId)
        if err != nil {
            fmt.Printf("Insert Err!")
        }

        newFileId, err := result.LastInsertId()
        if err != nil {
            // Handle error
        }

        convertFolderId, err := strconv.Atoi(folderId)
        if err != nil {

        }

        fmt.Println(file)

        newFilesId = append(newFilesId, FolderFile{
            Id:       &newFileId,
            Name:     file.Filename,
            FilePath: url,
            FolderId: convertFolderId,
        })

    }

    fmt.Println(newFilesId)


    c.IndentedJSON(http.StatusOK, newFilesId)
}

func DelFile(c *gin.Context) {
    id := c.Param("id")
    message := fmt.Sprintf("Del file: %s", id)
    c.IndentedJSON(http.StatusOK, gin.H{"message": message})
}

type Folder struct {
    Id          *int        `json:"id" db:"id"`
    Name        string      `json:"name" db:"name"`
    Description string      `json:"description" db:"description"`
    OwnerId     int         `json:"ownerId" db:"ownerId"`
    OwnerName *string      `json:"ownerName" db:"ownerName"`
    Courses      []CourseFolder    `json:"courses"`
    Years        []YearFolder      `json:"years"`
    Files        []FileFolder `json:"files"`
}

type Folders struct {
    Id          *int        `json:"id" db:"id"`
    Name        string      `json:"name" db:"name"`
    Description string      `json:"description" db:"description"`
    OwnerId     int         `json:"ownerId" db:"ownerId"`
    OwnerName *string      `json:"ownerName" db:"ownerName"`
    Courses      []CourseFolder    `json:"courses"`
    Years        []YearFolder      `json:"years"`
    Files        []File `json:"files"`
}

type FileFolder struct {
    Id   int
    Name string
    FilePath *string
    FolderId int
}

type File struct {
    Id   int `json:"id" db:"id"`
    Name string `json:"name" db:"name"`
    FilePath *string `json:"filePath" db:"filePath"`
    FolderId int `json:"folderId" db:"folderId"`
}

type Course struct {
    Id   int `json:"id" db:"id"`
    Name string `json:"name" db:"name"`
    FolderId int `json:"folderId" db:"folderId"`
}

type FolderYear struct {
    Id   int `json:"id" db:"id"`
    Name string `json:"name" db:"name"`
    FolderId int `json:"folderId" db:"folderId"`
}

type NameUser struct {
    Id   int `json:"id" db:"id"`
    Name string `json:"name" db:"name"`
}

type CourseFolder string


const (
    Course_SVV  CourseFolder = "SVV"
    Course_ITPM CourseFolder = "ITPM"
    Course_SOP  CourseFolder = "SOP"
    Course_HID  CourseFolder = "HID"
    Course_OOP  CourseFolder = "OOP"
    Course_GenB CourseFolder = "Gen B"
)

type YearFolder string

const (
    Year_1 YearFolder = "ปี 1"
    Year_2 YearFolder = "ปี 2"
    Year_3 YearFolder = "ปี 3"
    Year_4 YearFolder = "ปี 4"
)

func AddFolder(c *gin.Context) {
    var folder Folder
    if err := c.BindJSON(&folder); err != nil {
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
    fmt.Println("Connected!")

    // Insert data into Folders table
    folderStmt, err := db.Prepare("INSERT INTO Folders (name, description, ownerId) VALUES (?, ?, ?)")
    if err != nil {
        // Handle error
    }
    defer folderStmt.Close()

    folderResult, err := folderStmt.Exec(folder.Name, folder.Description, folder.OwnerId)
    if err != nil {
        fmt.Printf("Insert folder error: %v\n", err)
        c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Failed to insert folder"})
        return
    }

    fmt.Printf("Received folder with name: %s\n", folder.Name)

    // Insert data into FolderFiles table
    folderId, err := folderResult.LastInsertId()
    if err != nil {
        // Handle error
    }

    for _, course := range folder.Courses {
        courseStmt, err := db.Prepare("INSERT INTO CourseFolders (name, folderId) VALUES (?, ?)")
        if err != nil {
            // Handle error
        }
        defer courseStmt.Close()

        _, err = courseStmt.Exec(course, folderId)
        if err != nil {
            fmt.Printf("Insert course error: %v\n", err)
            c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Failed to insert course"})
            return
        }
    }

    for _, year := range folder.Years {
        yearStmt, err := db.Prepare("INSERT INTO YearFolders (name, folderId) VALUES (?, ?)")
        if err != nil {
            // Handle error
        }
        defer yearStmt.Close()

        _, err = yearStmt.Exec(year, folderId)
        if err != nil {
            fmt.Printf("Insert year error: %v\n", err)
            c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "Failed to insert year"})
            return
        }
    }

    newId := int(folderId)
    newFolder := Folder {
        Id:          &newId,
        Name:        folder.Name,
        Description: folder.Description,
        OwnerId:     folder.OwnerId,
        OwnerName: folder.OwnerName,
        Courses: folder.Courses,
        Years: folder.Years,
    }

    c.IndentedJSON(http.StatusOK, gin.H{
        "newFolder": newFolder,
    })
}

func GetFolders(c *gin.Context) {
    var folders []Folders
    var files []File
    var courses []Course
    var years []FolderYear
    var users []NameUser
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
    queryusers, err := db.Query(`SELECT id, name FROM Users`)
    defer queryusers.Close()
	for queryusers.Next() {
		var user NameUser

        if err := queryusers.Scan(&user.Id, &user.Name); err != nil {
            fmt.Println("Failed to scan row:", err)
            return
        }
        fmt.Println(user)
		users = append(users, user)
	}

    queryfiles, err := db.Query(`SELECT * FROM FolderFiles`)
    defer queryfiles.Close()
	for queryfiles.Next() {
		var file File

        if err := queryfiles.Scan(&file.Id, &file.Name, &file.FilePath, &file.FolderId); err != nil {
            fmt.Println("Failed to scan row:", err)
            return
        }

		files = append(files, file)
	}

    querycourse, err := db.Query(`SELECT * FROM CourseFolders`)
    defer querycourse.Close()
	for querycourse.Next() {
		var course Course

        if err := querycourse.Scan(&course.Id, &course.Name, &course.FolderId); err != nil {
            fmt.Println("Failed to scan row:", err)
            return
        }

		courses = append(courses, course)
	}
	queryyear, err := db.Query(`SELECT * FROM YearFolders`)
    defer queryyear.Close()
	for queryyear.Next() {
		var year FolderYear

        if err := queryyear.Scan(&year.Id, &year.Name, &year.FolderId); err != nil {
            fmt.Println("Failed to scan row:", err)
            return
        }

		years = append(years, year)
	}
    queryfolders, err := db.Query(`SELECT * FROM Folders`)
	if err != nil {
		fmt.Println("Failed to execute query:", err)
		return
	}
	defer queryfolders.Close()
	for queryfolders.Next() {
		var folder Folders

        if err := queryfolders.Scan(&folder.Id, &folder.Name, &folder.Description, &folder.OwnerId); err != nil {
            fmt.Println("Failed to scan row:", err)
            return
        }
        for i, file := range files {
            if *folder.Id == *&files[i].FolderId{
                folder.Files = append(folder.Files, file)
            }
            
        }
        for i, course := range courses {
            if *folder.Id == *&courses[i].FolderId{
                folder.Courses = append(folder.Courses, CourseFolder(course.Name))
            }
            
        }
        for i, year := range years {
            if *folder.Id == *&courses[i].FolderId{
                folder.Years = append(folder.Years, YearFolder(year.Name))
            }
            
        }
        for i, user := range users {
            if *&folder.OwnerId == *&user.Id{
                folder.OwnerName = &users[i].Name
            }
            
        }
		folders = append(folders, folder)
	}

	c.IndentedJSON(http.StatusOK, folders)
}

func GetFolder(c *gin.Context) {
    id := c.Param("id")
    folderId, err := strconv.Atoi(id)
    var folders []Folders
    var files []File
    var courses []Course
    var years []FolderYear
    var users []NameUser
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
    queryusers, err := db.Query(`SELECT id, name FROM Users`)
    defer queryusers.Close()
	for queryusers.Next() {
		var user NameUser
        fmt.Println(user)
        if err := queryusers.Scan(&user.Id, &user.Name); err != nil {
            fmt.Println("Failed to scan row:", err)
            return
        }
		users = append(users, user)
	}

    queryfiles, err := db.Query(`SELECT * FROM FolderFiles`)
    defer queryfiles.Close()
	for queryfiles.Next() {
		var file File

        if err := queryfiles.Scan(&file.Id, &file.Name, &file.FilePath, &file.FolderId); err != nil {
            fmt.Println("Failed to scan row:", err)
            return
        }

		files = append(files, file)
	}

    querycourse, err := db.Query(`SELECT * FROM CourseFolders`)
    defer querycourse.Close()
	for querycourse.Next() {
		var course Course

        if err := querycourse.Scan(&course.Id, &course.Name, &course.FolderId); err != nil {
            fmt.Println("Failed to scan row:", err)
            return
        }

		courses = append(courses, course)
	}
	queryyear, err := db.Query(`SELECT * FROM YearFolders`)
    defer queryyear.Close()
	for queryyear.Next() {
		var year FolderYear

        if err := queryyear.Scan(&year.Id, &year.Name, &year.FolderId); err != nil {
            fmt.Println("Failed to scan row:", err)
            return
        }

		years = append(years, year)
	}
    queryfolders, err := db.Query(`SELECT * FROM Folders WHERE id = ?`, folderId)
	if err != nil {
		fmt.Println("Failed to execute query:", err)
		return
	}
	defer queryfolders.Close()
	for queryfolders.Next() {
		var folder Folders

        if err := queryfolders.Scan(&folder.Id, &folder.Name, &folder.Description, &folder.OwnerId); err != nil {
            fmt.Println("Failed to scan row:", err)
            return
        }


        for i, file := range files {
            if *folder.Id == *&files[i].FolderId{
                folder.Files = append(folder.Files, file)
            }
            
        }
        for i, course := range courses {
            if *folder.Id == *&courses[i].FolderId{
                folder.Courses = append(folder.Courses, CourseFolder(course.Name))
            }
            
        }
        for i, year := range years {
            if *folder.Id == *&courses[i].FolderId{
                folder.Years = append(folder.Years, YearFolder(year.Name))
            }
            
        }
        for i, user := range users {
            if *&folder.OwnerId == *&user.Id{
                folder.OwnerName = &users[i].Name
            }
            
        }
		folders = append(folders, folder)
	}

    fmt.Println(folders)

	c.IndentedJSON(http.StatusOK, folders)
}

func DelFolder(c *gin.Context) {
    id := c.Param("id")
    message := fmt.Sprintf("Del note: %s", id)
    c.IndentedJSON(http.StatusOK, gin.H{"message": message})
}