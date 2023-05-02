package api

import (
    // "encoding/json"
	"database/sql"
	"fmt"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
	"net/http"
    "strings"
    "strconv"
    "mime/multipart"
    "github.com/aws/aws-sdk-go/aws"
    "github.com/aws/aws-sdk-go/aws/session"
    "github.com/aws/aws-sdk-go/service/s3"
    // "reflect"
)


func GetFile(c *gin.Context) {
    id := c.Param("id")
    message := fmt.Sprintf("Get file: %s", id)
    c.IndentedJSON(http.StatusOK, gin.H{"message": message})
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

    // Get the files from the form data
    files := form.File["files"]

    // Get the folder ID from the form data
    folderId := form.Value["folderId"][0]

     sess, err := session.NewSession(&aws.Config{
        Region: aws.String("us-east-1"),
    })
    if err != nil {
        c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    // Create an S3 client
    svc := s3.New(sess)

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

        // Create a new S3 object
        _, err = svc.PutObject(&s3.PutObjectInput{
            Body:   bytes.NewReader(fileBytes),
            Bucket: aws.String("my-bucket"),
            Key:    aws.String(objectKey),
        })
        if err != nil {
            c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
            return
        }
    }

    c.IndentedJSON(http.StatusOK, "Upload file")

    c.IndentedJSON(http.StatusOK, "Upload file")
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

type FileFolder struct {
    Id   int
    Name string
    FilePath string
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
        Courses: folder.Courses,
        Years: folder.Years,
    }

    c.IndentedJSON(http.StatusOK, gin.H{
        "newFolder": newFolder,
    })
}

func GetFolders(c *gin.Context) {
    var folders []Folder
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
        SELECT f.id, f.name, f.description, f.ownerId, u.name as ownerName,
       GROUP_CONCAT(DISTINCT yf.name SEPARATOR ', ') as years,
       GROUP_CONCAT(DISTINCT cf.name SEPARATOR ', ') as courses,
       GROUP_CONCAT(DISTINCT ff.id, ':', ff.name, ':', ff.filePath SEPARATOR ', ') as files
        FROM Folders f
        LEFT JOIN Users u ON f.ownerId = u.id
        LEFT JOIN YearFolders yf ON f.id = yf.folderId
        LEFT JOIN CourseFolders cf ON f.id = cf.folderId
        LEFT JOIN FolderFiles ff ON f.id = ff.folderId
        GROUP BY f.id`)

	if err != nil {
		fmt.Println("Failed to execute query:", err)
		return
	}
	defer rows.Close()

	for rows.Next() {
		var folder Folder
        var yearStr []uint8
        var courseStr []uint8
        var fileStr []uint8

        if err := rows.Scan(&folder.Id, &folder.Name, &folder.Description, &folder.OwnerId, &folder.OwnerName, &yearStr, &courseStr, &fileStr); err != nil {
            fmt.Println("Failed to scan row:", err)
            return
        }

        folder.Years = make([]YearFolder, 0)
        yearArr := strings.Split(string(yearStr), ", ")
        if len(yearArr) > 1 {
            for _, year := range yearArr {
                folder.Years = append(folder.Years, YearFolder(year))
            }
        }

        folder.Courses = make([]CourseFolder, 0)
        courseArr := strings.Split(string(courseStr), ", ")
        if len(courseArr) > 1 {
            for _, course := range courseArr {
                folder.Courses = append(folder.Courses, CourseFolder(course))
            }
        }

        folder.Files = make([]FileFolder, 0)
        fileArr := strings.Split(string(fileStr), ", ")
        if len(fileArr) > 1  {
            for _, file := range fileArr {
                parts := strings.Split(file, ":")
                fileId, err := strconv.Atoi(parts[0])
                if err != nil {
                    // handle the error
                }
                fileName := parts[1]
                filePath := parts[2]
                folder.Files = append(folder.Files, FileFolder{
                    Id: fileId,
                    Name: fileName,
                    FilePath: filePath,
                })
            }
        }

		folders = append(folders, folder)
	}

	if err := rows.Err(); err != nil {
		fmt.Println("Encountered an error while iterating over rows:", err)
		return
	}

	if err := rows.Err(); err != nil {
		fmt.Println("Encountered an error while iterating over rows:", err)
		return
	}

	c.IndentedJSON(http.StatusOK, folders)
}

func GetFolder(c *gin.Context) {
    id := c.Param("id")
    var folders []Folder
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
    SELECT f.id, f.name, f.description, f.ownerId, u.name as ownerName,
       GROUP_CONCAT(DISTINCT yf.name SEPARATOR ', ') as years,
       GROUP_CONCAT(DISTINCT cf.name SEPARATOR ', ') as courses,
       GROUP_CONCAT(DISTINCT ff.id, ':', ff.name, ':', ff.filePath SEPARATOR ', ') as files
    FROM Folders f
    LEFT JOIN Users u ON f.ownerId = u.id
    LEFT JOIN YearFolders yf ON f.id = yf.folderId
    LEFT JOIN CourseFolders cf ON f.id = cf.folderId
    LEFT JOIN FolderFiles ff ON f.id = ff.folderId
    WHERE f.id = ?
    GROUP BY f.id
    `, id)

if err != nil {
    fmt.Println("Failed to execute query:", err)
    return
}


	for rows.Next() {
		var folder Folder
        var yearStr []uint8
        var courseStr []uint8
        var fileStr []uint8

        if err := rows.Scan(&folder.Id, &folder.Name, &folder.Description, &folder.OwnerId, &folder.OwnerName, &yearStr, &courseStr, &fileStr); err != nil {
            fmt.Println("Failed to scan row:", err)
            return
        }

        folder.Years = make([]YearFolder, 0)
        yearArr := strings.Split(string(yearStr), ", ")
        fmt.Println(len(yearArr))
        if len(yearArr) > 1 {
            for _, year := range yearArr {
                folder.Years = append(folder.Years, YearFolder(year))
            }
        }

        folder.Courses = make([]CourseFolder, 0)
        courseArr := strings.Split(string(courseStr), ", ")
        fmt.Println(len(courseArr))
        if len(courseArr) > 1 {
            for _, course := range courseArr {
                folder.Courses = append(folder.Courses, CourseFolder(course))
            }
        }

        folder.Files = make([]FileFolder, 0)
        fileArr := strings.Split(string(fileStr), ", ")
        if len(fileArr) > 1  {
            for _, file := range fileArr {
                parts := strings.Split(file, ":")
                fileId, err := strconv.Atoi(parts[0])
                if err != nil {
                    // handle the error
                }
                fileName := parts[1]
                filePath := parts[2]
                folder.Files = append(folder.Files, FileFolder{
                    Id: fileId,
                    Name: fileName,
                    FilePath: filePath,
                })
            }
        }

		folders = append(folders, folder)
	}

	if err := rows.Err(); err != nil {
		fmt.Println("Encountered an error while iterating over rows:", err)
		return
	}

	if err := rows.Err(); err != nil {
		fmt.Println("Encountered an error while iterating over rows:", err)
		return
	}

	c.IndentedJSON(http.StatusOK, folders)
}

func DelFolder(c *gin.Context) {
    id := c.Param("id")
    message := fmt.Sprintf("Del note: %s", id)
    c.IndentedJSON(http.StatusOK, gin.H{"message": message})
}