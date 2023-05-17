import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({
  value,
  setValue,
  items,
  label,
  isDisabled,
  w,
}) {
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  let width = w === undefined ? '100%' : w;
  return (
    <Box sx={{ minWidth: 120, width: width }}>
      <FormControl fullWidth margin="normal">
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          defaultValue=""
          value={value}
          label={label}
          disabled={isDisabled}
          onChange={handleChange}
        >
          {items.map((name, index) => {
            return (
              <MenuItem value={name} key={index}>
                {name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
