import { Icon, SvgIcon, Typography } from '@mui/material';
import Link from 'next/link';

const IconGetA = ({
  name,
  routeTo,
  ownerName,
  ownerId,
  iconPath
}: IconGetAProps) => {

  const maxLengthText = 30;

  let showName = name

  if (name.length > maxLengthText) {
    showName = name.slice(0, maxLengthText + 1) + "..."
  }


  return (
    <div className='flex flex-col items-center justify-center text-center'>
      <Link href={routeTo} className="flex flex-col items-center justify-center no-underline">
        <img src={iconPath} className="w-full h-full" />
        <Typography variant='primary'>{showName}</Typography>
      </Link>
      {ownerName && (
        <Link href={`/user/${ownerId}`} className='no-underline'>
          <Typography variant="body2">{ownerName}</Typography>
        </Link>
      )}
    </div>
  );
};

export default IconGetA;