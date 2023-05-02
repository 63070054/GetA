import { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import ShowFilterSelected from '@/components/Filter/ShowFilterSelected';
import IconGetA from '@/components/IconGetA';
import { useRouter } from 'next/router';
import IconContainer from '@/components/Container/IconContainer';
import SmallContainer from '@/components/Container/SmallContainer';
import api from '@/plugins/axios/api';
import Link from 'next/link';
import { ChangeEvent } from 'react';
import PDFUploader from '@/components/Input/PDFuploader';
import { useCallback } from 'react';
import AddFilesModal from '@/components/Modal/AddFilesModal';
import Cookies from 'js-cookie';

const Folder = () => {

  const router = useRouter()
  const { folderId } = router.query
  const token = Cookies.get("token") || ""
  const decodedToken: User = token ? JSON.parse(Buffer.from(token, 'base64').toString('utf-8'))[0] : null;
  const userId = decodedToken?.id

  useEffect(() => {
    const getFolderById = async () => {
      const response = await api.get("/folder/" + folderId)
      const folder = response?.data?.[0]
      console.log(folder)
      if (folder) {
        folder.files = folder?.files.map((file: any) => {
          return {
            id: file.Id,
            name: file.Name,
            routeTo: "/folder/:folderId/file/:fileId",
            iconPath: "/icons/fileGetA.svg"
          }
        })
        console.log(folder)
        setFolderData({ ...folder })

      }


    }
    if (router.isReady) {
      getFolderById()
    }
  }, [router.isReady])

  const [folderData, setFolderData] = useState<FolderIcon>({
    id: 1,
    name: "กำลังโหลดข้อมูล",
    description: "กำลังโหลดข้อมูล",
    courses: [],
    years: [],
    ownerName: "กำลังโหลดข้อมูล",
    ownerId: 1,
    files: []
  })

  const [openModal, setOpenModal] = useState<boolean>(false)
  const [fileSelected, setFileSelected] = useState<Blob[]>([])

  const handleDrop = useCallback((acceptedFiles: Blob[]) => {
    // Filter out non-PDF files
    const pdfFiles: Blob[] = acceptedFiles.filter(file => {
      // Check if the file is a PDF
      if (file.type !== 'application/pdf') {
        return false;
      }

      // Check if the file name already exists in the array
      const exists = fileSelected.findIndex(f => f.name === file.name) !== -1;
      return !exists;
    });


    setFileSelected(prevState => [...prevState, ...pdfFiles]);

  }, []);

  const handleUnselectFile = (fileName: string) => {
    let copyFileSelected = fileSelected;
    copyFileSelected = copyFileSelected.filter(file => file.name !== fileName)
    setFileSelected([...copyFileSelected])

  }

  const createFiles = async () => {
    if (folderId) {
      const formData = new FormData();
      formData.append("folderId", folderId.toString());
      fileSelected.forEach(file => formData.append("files", file));

      try {
        const response = await api.post("/file", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        const newFiles = response.data
        const convertNewFiles = newFiles.map((file: any) => {
          return {
            id: file.Id,
            name: file.Name,
            routeTo: "/folder/:folderId/file/:fileId",
            iconPath: "/icons/fileGetA.svg"
          }
        })
        console.log(response);
        const copyFolderData = folderData
        copyFolderData.files = [...copyFolderData.files, ...convertNewFiles]
        setFolderData({ ...copyFolderData })
        resetValue()

      } catch (err) {
        console.log(err);
      }
    }
  };

  const resetValue = () => {
    setFileSelected([])
    setOpenModal(false)
  }

  return (
    <SmallContainer>
      <div className='w-full flex flex-col gap-4'>
        <div className='flex flex-col px-6 py-8 gap-4 shadow-lg border-b-2 border-black'>
          <div className='flex gap-2 w-full flex-col'>
            <div className='flex flex-col gap-2'>
              <div>
                <Typography variant='h4' className='font-bold'>{folderData?.name}</Typography>
                <Link href={`/user/${folderData?.ownerId}`}>
                  <Typography variant='primary'>{folderData.ownerName}</Typography>
                </Link>
              </div>
              <ShowFilterSelected courses={folderData?.courses} years={folderData?.years} />
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <Typography variant='h5'>คำอธิบาย</Typography>
            <Typography variant='body2' className='text-gray-400'><span className='ml-8' />{folderData?.description}</Typography>
          </div>
        </div>
        <div className='w-full flex justify-center'>
          {folderData?.files?.length == 0 ? (
            <Typography variant='h4' className='font-bold'>ไม่มีไฟล์</Typography>
          ) : (
            <IconContainer>
              {folderData?.files?.map(file => (
                <>
                  {folderId && (
                    <IconGetA {...file} key={file?.id} routeTo={file?.routeTo?.replace(":fileId", `${file?.id}`).replace(":folderId", `${folderId}`)} />
                  )}
                </>
              ))}
            </IconContainer>
          )}
        </div>
        {folderData.ownerId == userId && (
          <Button className="bg-orange" onClick={() => setOpenModal(true)}>เพิ่มไฟล์</Button>
        )}

      </div>
      <AddFilesModal {...{ openModal, setOpenModal, handleDrop, createFiles, fileSelected, handleUnselectFile }} />
    </SmallContainer>
  );
};

export default Folder;