// Button.js
import React from 'react';
import Button from '@mui/material/Button';

const CustomButton = ({ children, ...props }) => {
  return <Button {...props}>{children}</Button>;
};

export default CustomButton;
