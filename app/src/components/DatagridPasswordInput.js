import React from 'react';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
const DatagridPasswordInput = ({ label, val }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [value, setValue] = React.useState(val);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <FormControl
      margin="normal"
      required
      fullWidth
      variant="outlined"
      id="password"
      name="password"
    >
      <InputLabel htmlFor="standard-adornment-password">{label}</InputLabel>
      <Input
        disabled
        id="password"
        name="password"
        value={value}
        onChange={handleChange}
        type={showPassword ? 'text' : 'password'}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="password"
      />
    </FormControl>
  );
};

export default DatagridPasswordInput;
