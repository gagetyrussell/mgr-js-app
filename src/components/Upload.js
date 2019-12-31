import React from 'react';
import {useDropzone} from 'react-dropzone';
import "./Upload.css";

export default function Accept(props) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: 'application/vnd.ms-excel, text/plain'
  });

  return (
    <div className="container">
      <div {...getRootProps({className: "dropzone"})}>
        <input {...getInputProps()} />
        {isDragAccept && (<p>All files will be accepted</p>)}
          {isDragReject && (<p>Some files will be rejected</p>)}
          {!isDragActive && (<p>Drop some files here ...</p>)}
      </div>
    </div>
  );
}
