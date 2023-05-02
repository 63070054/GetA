import Modal from '@mui/material/Modal';
import { Box, Checkbox, FormControlLabel } from '@mui/material';
import { Typography } from '@mui/material';
import { ChangeEvent } from 'react';

const FilterModal = ({
  openModal,
  setOpenModal,
  filterCourses,
  filterYears,
  setFilterCourses,
  setFilterYears
}: FilterModalProps) => {

  const courses: CourseType[] = ["SVV", "ITPM", "SOP", "HID", "OOP", "Gen B"]
  const years: YearType[] = ["ปี 1", "ปี 2", "ปี 3", "ปี 4"]

  const handleCheckboxCoursesCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setFilterCourses([...filterCourses, value])
    } else {
      const copyFilterCourses = filterCourses;
      const index = copyFilterCourses.findIndex(course => course === value)
      copyFilterCourses.splice(index, 1)
      setFilterCourses([...copyFilterCourses])
    }
  }

  const handleCheckboxYearsCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setFilterYears([...filterYears, value])
    } else {
      const copyFilterYears = filterYears;
      const index = copyFilterYears.findIndex(year => year === value)
      copyFilterYears.splice(index, 1)
      setFilterYears([...copyFilterYears])
    }
  }

  return (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
    >
      <Box className="absolute center-offset bg-white shadow-lg py-4 px-12 rounded-lg flex flex-col gap-4 md:w-auto w-11/12">
        <Typography variant="h6" className='font-bold'>
          รายวิชา
        </Typography>
        <div className="grid grid-cols-3 px-2">
          {courses.map((course, index) => (
            <FormControlLabel
              control={<Checkbox value={course} onChange={handleCheckboxCoursesCheck} checked={filterCourses.includes(course)} />}
              label={course}
              className="w-fit"
              key={index}
            />
          ))}
        </div>
        <Typography variant="h6" className='font-bold'>
          ชั้นปี
        </Typography>
        <div className="grid grid-cols-2 px-2">
          {years.map((year, index) => (
            <FormControlLabel
              control={<Checkbox value={year} onChange={handleCheckboxYearsCheck} checked={filterYears.includes(year)} />}
              label={year}
              className="w-fit"
              key={index}
            />
          ))}
        </div>
      </Box >
    </Modal >
  );
};

export default FilterModal;