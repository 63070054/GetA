DROP TABLE IF EXISTS FolderFiles;

DROP TABLE IF EXISTS GuideLinesFiles;

DROP TABLE IF EXISTS SubTasks;

DROP TABLE IF EXISTS Folders;

DROP TABLE IF EXISTS GuideLines;

DROP TABLE IF EXISTS Tasks;

DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  userName VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  year ENUM('ปี 1', 'ปี 2', 'ปี 3', 'ปี 4', 'อื่น ๆ'),
  program ENUM('IT', 'DSBA'),
  subjectArea ENUM(
    'Network',
    "Software Engineer",
    "Multimedia",
    "อื่น ๆ"
  )
);

CREATE TABLE Folders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  ownerId INT,
  FOREIGN KEY (ownerId) REFERENCES Users(id)
);

CREATE TABLE YearFolders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name ENUM('ปี 1', 'ปี 2', 'ปี 3', 'ปี 4'),
  folderId INT,
  FOREIGN KEY (folderId) REFERENCES Folders(id)
);

CREATE TABLE CourseFolders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name ENUM('SVV', 'ITPM', 'SOP', 'HID', 'OOP', 'Gen B'),
  folderId INT,
  FOREIGN KEY (folderId) REFERENCES Folders(id)
);

CREATE TABLE FolderFiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  filePath VARCHAR(255) NOT NULL,
  folderId INT,
  FOREIGN KEY (folderId) REFERENCES Folders(id)
);

CREATE TABLE GuideLines (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  ownerId INT,
  FOREIGN KEY (ownerId) REFERENCES Users(id)
);

CREATE TABLE GuideLinesFiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  filePath VARCHAR(255) NOT NULL,
  guideLineId INT,
  FOREIGN KEY (guideLineId) REFERENCES GuideLines(id)
);

CREATE TABLE Tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date VARCHAR(255) NOT NULL,
  ownerId INT,
  FOREIGN KEY (ownerId) REFERENCES Users(id)
);

CREATE TABLE SubTasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  status BOOLEAN DEFAULT false,
  time VARCHAR(255),
  taskId INT,
  FOREIGN KEY (taskId) REFERENCES Tasks(id)
);

INSERT INTO
  Users (
    name,
    userName,
    password,
    year,
    program,
    subjectArea
  )
VALUES
  (
    'John',
    'johnza2',
    '1234',
    'ปี 3',
    'IT',
    'Network'
  );