import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({ value, setValue, items, label }) {
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth margin="normal">
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label}
          onChange={handleChange}
        >
          <MenuItem value="">None</MenuItem>
          {/* {items.map((key, index) => {
            return (
              <MenuItem value={key} key={index}>
                {key}
              </MenuItem>
            );
          })} */}
        </Select>
      </FormControl>
    </Box>
  );
}
