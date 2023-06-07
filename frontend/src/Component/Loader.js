import React from 'react'
import { Alert, Spinner } from 'react-bootstrap'

export default function Loader() {
  return (
      <div>
              <Spinner
                  animation='grow'
                  role="status"
                  style={{ height: "100px",width:"100px",margin:"auto",display:"block" }}></Spinner> <span className='sr-only'>Loading...</span>
    </div>
  )
}
