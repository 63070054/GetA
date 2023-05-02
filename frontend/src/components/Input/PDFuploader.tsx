import { Container } from "@mui/system";
import Dropzone from "react-dropzone";

interface PDFUploaderProps {
  handleDrop: (acceptedFiles: File[]) => void;
}

const PDFUploader = ({ handleDrop }: PDFUploaderProps) => {

  return (
    <Dropzone onDrop={handleDrop}>
      {({ getRootProps, getInputProps }: { getRootProps: (props?: React.HTMLAttributes<HTMLDivElement>) => React.HTMLAttributes<HTMLDivElement>, getInputProps: (props?: React.HTMLAttributes<HTMLInputElement>) => React.HTMLAttributes<HTMLInputElement> }) => (
        <Container {...getRootProps()} className="border-1 border-black cursor-pointer h-52 items-center justify-center flex softOrangeBackground border border-dashed border-2 border-orange-500">
          <input {...getInputProps()} />
          <p>วางไฟล์ PDF ของคุณที่นี่ หรือ คลิกเพื่อเลือกไฟล์.</p>
        </Container>
      )}
    </Dropzone>
  );
};

export default PDFUploader;