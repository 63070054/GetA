import Modal from '@mui/material/Modal';
import { Box, Checkbox, FormControlLabel } from '@mui/material';
import { Typography } from '@mui/material';
import { ChangeEvent } from 'react';
import FormsInput from '../forms/FormsInput';
import { Button } from '@mui/material';

interface CreateFolderModalProps extends FilterModalProps {
  inputValue: InputValue;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  nameName: string;
  nameDescription: string;
  createFolder: () => void;
}

const CreateFolderModal = ({
  openModal,
  setOpenModal,
  filterCourses,
  filterYears,
  setFilterCourses,
  setFilterYears,
  inputValue,
  handleInputChange,
  nameName,
  nameDescription,
  createFolder
}: CreateFolderModalProps) => {

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
      <Box className="absolute center-offset bg-white shadow-lg rounded-lg">
        <div className='relative py-2 bg-green flex flex-col items-center justify-center rounded-t-lg'>
          <Typography variant="h6" className="text-white tracking-wide">สร้างโฟลเดอร์</Typography>
        </div>
        <div className="py-4 px-12 flex flex-col gap-4">
          <FormsInput label="ชื่อ" name={nameName} type="text" {...{ inputValue, handleInputChange }} />
          <FormsInput label="คำอธิบาย" name={nameDescription} type="text" {...{ inputValue, handleInputChange }} amountRows={3} />
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
          <Button className='bg-orange w-full' onClick={createFolder}>ยืนยันการสร้างโฟลเดอร์</Button>
        </div>
      </Box >
    </Modal >
  );
};

export default CreateFolderModal;