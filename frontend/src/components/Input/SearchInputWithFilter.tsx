
import { Divider, InputBase, Paper } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Button } from '@mui/material';

const SearchInputWithFilter = ({
  searchInput,
  setSearchInput,
  setOpenFilterModal
}: SearchInputWithFilterProps) => {

  return (
    <Paper className='flex'>
      <IconButton disabled>
        <SearchIcon className="px-2" />
      </IconButton>
      <InputBase
        className='flex-1'
        placeholder="Search"
        value={searchInput}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)}
      />
      <Divider className='h-9/12' orientation="vertical" />
      <Button color="info" variant='contained' className='p-4 rounded-none text-white bg-orange' onClick={() => setOpenFilterModal(true)}>
        <FilterAltIcon />
      </Button>
    </Paper>
  );
};

export default SearchInputWithFilter;