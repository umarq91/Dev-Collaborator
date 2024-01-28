import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { selectRoomId } from '../../redux/appSlice';

function CopyLinkButton() {
   const roomId = useSelector(selectRoomId)

     const [text,setText] = useState("via Link")
     let  MY_URL = 'localhost:5173'
     const copyToClipboard = () => {
       navigator.clipboard.writeText(`${MY_URL}/?room=${roomId}`)
      .then(() => {
        // Handle successful copy with a toast notification
        toast.info('Link copied to clipboard!',{
            position:'bottom-right'
        });
        setText('Copied')
      })
      .catch(err => {
        // Handle error with a toast notification
        toast.error('Failed to copy: ' + err.message);
      });
  };

  return (
    <button className='font-mono mr-3' onClick={copyToClipboard}>{text}</button>
  );
}

export default CopyLinkButton;