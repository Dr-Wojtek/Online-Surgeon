import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function ContainedButtons(props) {
  const { onClick, value, type, color } = props;
  return (
    <Stack direction="row" spacing={2}>
      <Button style={{ margin:5 }} variant={type} color={color} onClick={onClick}>{value}</Button>
    </Stack>
  );
}