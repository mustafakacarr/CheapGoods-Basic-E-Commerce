import React from 'react';
import { Alert } from 'react-bootstrap';

export default function AlertMessage(props) {
    const { variant, children } = props;
  return (
    <div className='pt-2'>
      <Alert variant={variant}>{children}</Alert>
    </div>
  );
}