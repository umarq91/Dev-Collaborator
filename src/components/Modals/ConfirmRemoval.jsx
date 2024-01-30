import React from 'react';

export const ConfirmRemoval = ({ isOpen, onClose, onConfirm, action, id }) => {
  if (!isOpen) return null;

  // Dynamic text and button label based on the action type
  const title = action === 'delete' ? 'Confirm Deletion' : 'Confirm Leaving';
  const confirmationText = action === 'delete' 
    ? 'Are you sure you want to delete this item?' 
    : 'Are you sure you want to leave this room?';

  const confirmButtonLabel = action === 'delete' ? 'Delete' : 'Leave';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg">
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        <p className="text-gray-600">{confirmationText}</p>
        <div className="flex justify-end mt-4 gap-4">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm()}
            className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-r`}
          >
            {confirmButtonLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
