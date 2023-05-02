package types

type Year string

const (
	Year1 Year = "ปี 1"
	Year2 Year = "ปี 2"
	Year3 Year = "ปี 3"
	Year4 Year = "ปี 4"
)

type Program string

const (
	IT   Program = "IT"
	DSBA Program = "DSBA"
)

type Area string

const (
	Network          Area = "Network"
	SoftwareEngineer Area = "Software Engineer"
	Multimedia       Area = "Multimedia"
	Other            Area = "อื่น ๆ"
)
