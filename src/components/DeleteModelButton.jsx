import React, { useState } from 'react';
import { modelsAPI } from '../services/api';

const DeleteModelButton = ({ modelId, onModelDeleted }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  
  const handleDelete = async () => {
    if (!modelId) return;
    
    setIsDeleting(true);
    try {
      await modelsAPI.deleteModel(modelId);
      setShowConfirm(false);
      if (onModelDeleted) onModelDeleted();
    } catch (error) {
      console.error('Error deleting model:', error);
      alert('Failed to delete model');
    } finally {
      setIsDeleting(false);
    }
  };
  
  return (
    <div className="lg:ml-4 mt-2 lg:mt-0">
      {!showConfirm ? (
        <button
          onClick={() => setShowConfirm(true)}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
          title="Delete model"
        >
          Delete
        </button>
      ) : (
        <div className="flex items-center space-x-2">
          <span className="text-sm text-red-600 font-medium">Are you sure?</span>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
          >
            {isDeleting ? 'Deleting...' : 'Yes'}
          </button>
          <button
            onClick={() => setShowConfirm(false)}
            disabled={isDeleting}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-2 py-1 rounded text-sm"
          >
            No
          </button>
        </div>
      )}
    </div>
  );
};

export default DeleteModelButton;