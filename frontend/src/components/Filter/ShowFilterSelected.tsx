import FilterBox from "./FilterBox";

const ShowFilterSelected = ({
  courses,
  years
}: ShowFilterProps) => {

  const sortCourses = (a: string, b: string) => {
    return a.localeCompare(b)
  }

  const sortYears = (a: string, b: string) => {
    return a.localeCompare(b)
  }

  courses.sort(sortCourses)
  years.sort(sortYears)

  return (
    <div className="flex gap-4 flex-wrap	">
      {courses.map((course, index) => (
        <FilterBox key={index} name={course} backgroundColor="softGreenBackground" textColor="softGreenText" />
      ))}
      {years.map((year, index) => (
        <FilterBox key={index} name={year} backgroundColor="softOrangeBackground" textColor="softOrangeText" />
      ))}
    </div>
  );
};

export default ShowFilterSelected;