import { Box } from "@mui/system";
import { Modal } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';


const LoadingScreen = ({
  isLoading,
  setIsLoading
}: LoadingScreenProps) => {


  return (
    <Modal
      open={isLoading}
      onClose={() => setIsLoading(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="flex items-center justify-center h-full w-full">
        <CircularProgress color="info" />
      </div>
    </Modal>
  );
};

export default LoadingScreen;