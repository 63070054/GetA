import Button from '@mui/material/Button';

const OrangeButton = ({ ButtonName }: OrangeButton) => {
    return (
        <div>
            <Button className='orangeButton sm:w-32 w-full'>{ButtonName}</Button>
        </div>
    );
};

export default OrangeButton;