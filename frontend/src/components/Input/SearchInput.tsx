
import { InputBase, Paper } from '@mui/material';
import { ChangeEvent } from 'react';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchInput = ({
  searchInput,
  setSearchInput,
}: SearchInputProps) => {

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
    </Paper>
  );
};

export default SearchInput;