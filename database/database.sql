CREATE TABLE Users (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  year ENUM('ปี 1', 'ปี 2', 'ปี 3', 'ปี 4'),
  program ENUM('IT', 'DSBA'),
  subjectArea ENUM(
    'Network',
    "Software Engineer",
    "Multimedia",
    "อื่น ๆ"
  )
);

CREATE TABLE Folders (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  ownerId VARCHAR(255),
  FOREIGN KEY (ownerId) REFERENCES Users(id),
  course ENUM('SVV', 'ITPM', 'SOP', 'HID', 'OOP', 'Gen B'),
  year ENUM('ปี 1', 'ปี 2', 'ปี 3', 'ปี 4')
);

CREATE TABLE FolderFiles (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  filePath VARCHAR(255) NOT NULL,
  folderId VARCHAR(255),
  FOREIGN KEY (folderId) REFERENCES Folders(id)
);

CREATE TABLE GuideLines (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  ownerId VARCHAR(255),
  FOREIGN KEY (ownerId) REFERENCES Users(id)
);

CREATE TABLE GuideLinesFiles (
  id VARCHAR(255) PRIMARY KEY,
  filePath VARCHAR(255) NOT NULL,
  guideLineId VARCHAR(255),
  FOREIGN KEY (guideLineId) REFERENCES GuideLines(id)
);

CREATE TABLE Tasks (
  id VARCHAR(255) PRIMARY KEY,
  date VARCHAR(255) NOT NULL,
  ownerId VARCHAR(255),
  FOREIGN KEY (ownerId) REFERENCES Users(id)
);

CREATE TABLE SubTasks (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  status BOOLEAN DEFAULT false,
  time VARCHAR(255),
  taskId VARCHAR(255),
  FOREIGN KEY (taskId) REFERENCES Tasks(id)
);