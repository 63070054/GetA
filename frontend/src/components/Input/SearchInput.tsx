
import { Divider, InputBase, Paper } from '@mui/material';
import { useState } from 'react';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Button } from '@mui/material';

const SearchInput = () => {

  const [searchInput, setSearchInput] = useState<String>("")

  return (
    <Paper className='flex'>
      <IconButton disabled>
        <SearchIcon className="px-2" />
      </IconButton>
      <InputBase
        className='flex-1'
        placeholder="Search"
      />
      <Divider className='h-9/12' orientation="vertical" />
      <Button color="info" variant='contained' className='p-4 rounded-none text-white orangeButton'>
        <FilterAltIcon />
      </Button>
    </Paper>
  );
};

export default SearchInput;