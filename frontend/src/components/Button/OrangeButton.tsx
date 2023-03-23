import Button from '@mui/material/Button';

const OrangeButton = ({ButtonName}:OrangeButton) => {
    return (
        <div>
            <Button className='orangeButton'>{ButtonName}</Button>
        </div>
    );
};

export default OrangeButton;