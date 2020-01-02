import React, {useMemo, useCallback, useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import MGRAPI from "../utils/MGRAPI";
import { Auth } from "aws-amplify";
import axios from "axios";


const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#4d9448',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#4d9448',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};


function MyDropzone(user) {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      // Do whatever you want with the file contents
        const binaryStr = reader.result
        Auth.currentAuthenticatedUser().then(async result => {
          let signed_url = await MGRAPI.get('/getPresignedUserDataUrl', {
              params: {
                user_id: result.username,
                file_name: file.name
              }
            })
          const formData = new FormData();
          Object.keys(signed_url.data.fields).forEach(key => {
            formData.append(key, signed_url.data.fields[key]);
          });
          formData.append("file", file);
          var options = { headers: { 'Content-Type': file.type, 'x-amz-acl': 'public-read' } };
          let http_post = axios({
            method: 'post',
            url: signed_url.data.url,
            data: formData,
            options: options
          });
          console.log(file)
          console.log(result.username)
          return result;
        });
      }

      reader.readAsArrayBuffer(file)
    })

  }, [])
  const {getRootProps, getInputProps, isDragActive, isDragReject, isDragAccept} = useDropzone({onDrop, accept: 'application/vnd.ms-excel, text/plain, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject
  ]);
  return (
    <div {...getRootProps({style})}>
      <input {...getInputProps()} />
      <p className="uploadtext">Drag 'n' drop some files here, or click to select files</p>
    </div>
  )
};

export default function Upload(props) {
  const useDropZone = MyDropzone()

  return (
    <div className="dropzone">
      { useDropZone }
    </div>
  );
}
