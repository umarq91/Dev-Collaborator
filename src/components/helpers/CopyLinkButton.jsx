import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CopyLinkButton({ link }) {
    const [text,setText] = useState("Copy Link")

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link)
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