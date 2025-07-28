import React, { useState } from 'react';
import { modelsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

const ModelUploader = ({ onModelAdded }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [model, setModel] = useState({
    title: '',
    description: '',
    rotation: ''
  });
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // If not authenticated and admin, don't render
  if (!isAuthenticated || !isAdmin) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setModel(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await modelsAPI.createModel({
        ...model,
        modelFile: file
      });
      
      // Reset form
      setModel({
        title: '',
        description: '',
        rotation: ''
      });
      setFile(null);
      
      // Notify parent and close form
      onModelAdded();
      setIsOpen(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload model');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-10">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-violet-500 to-orange-500 text-white p-4 rounded-full shadow-lg"
        >
          + Add Model
        </button>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-xl w-96">
          <h2 className="text-xl font-bold mb-4">Add New 3D Model</h2>
          
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={model.title}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={model.description}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows={3}
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Upload GLB File</label>
              <input
                type="file"
                accept=".glb"
                onChange={handleFileChange}
                className="w-full p-2 border rounded"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Max file size: 100MB</p>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Rotation (optional)</label>
              <input
                type="text"
                name="rotation"
                value={model.rotation}
                onChange={handleChange}
                placeholder="0deg 0deg 0deg"
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 border rounded"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 bg-gradient-to-r from-violet-500 to-orange-500 text-white rounded"
              >
                {isLoading ? 'Uploading...' : 'Add Model'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ModelUploader;