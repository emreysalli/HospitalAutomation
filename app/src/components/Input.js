import React from 'react';
import TextField from '@mui/material/TextField';
const Input = ({
  id,
  label,
  isRequired,
  value,
  setValue,
  isMultiline,
  type,
  margin,
  isDisabled,
}) => {
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <TextField
      type={type}
      margin={margin ? 'none' : 'normal'}
      required={isRequired}
      fullWidth
      multiline={isMultiline}
      disabled={isDisabled}
      id={id}
      value={value}
      onChange={handleChange}
      label={label}
      name={id}
      rows={3}
    />
  );
};

export default Input;
