import React, { useState, useRef, useEffect } from 'react';
import CopyLinkButton from './CopyLinkButton';
import EmailModal from "./EmailModal"

const ThreeDotsDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      <button className='font-semibold text-sm' onClick={() => setIsOpen(!isOpen)}>
      Add Members  &#x22EE;{/* Unicode for vertical ellipsis (three dots) */}
      </button>
      {isOpen && (
        <div
            className='p-2 w-32'
        style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          backgroundColor: 'white',
          boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
          zIndex: 1
        }}>
            <span className='pl-2 items-center text-center flex justify-center flex-col'>

         <CopyLinkButton/> {/* by Email */}
         
         <EmailModal isOpen={isEmailModalOpen} onClose={() => setIsEmailModalOpen(false)} />

         <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-mono" onClick={() => setIsEmailModalOpen(true)}>via Email</a>
            </span>
        </div>
      )}
    </div>
  );
};

export default ThreeDotsDropdown;
