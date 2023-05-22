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
  maxLength
}) => {
  const handleChange = (event) => {
    const regex = /^[0-9\b]+$/;
    if(event.target.id ==="tcnumber" || event.target.id ==="phoneNumber"){
      if(regex.test(event.target.value)){
        setValue(event.target.value);
      }
    }else{
      setValue(event.target.value);
    }
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
      inputProps={{ maxLength: maxLength }}
    />
  );
};

export default Input;
