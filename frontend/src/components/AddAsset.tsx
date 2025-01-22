import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAsset } from '../api/assetApi';
import { Plus, Eye } from 'lucide-react';
import FormField from './FormField'; // Import the combined component

const AddAsset: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    assetId: '',
    category: '',
    type: '',
    modelNumber: '',
    manufacturer: '',
    status: 'available',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createAsset(formData);
      alert('Asset added successfully!');
      setFormData({
        assetId: '',
        category: '',
        type: '',
        modelNumber: '',
        manufacturer: '',
        status: 'available',
      });
    } catch (error) {
      console.error('Error adding asset:', error);
      alert('Failed to add asset. Please try again.');
    }
  };

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold mb-6 dark:text-white">Add New Asset</h2>
      <form
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 rounded-xl dark:bg-gray-800/50 bg-white/50 backdrop-blur-sm"
        onSubmit={handleSubmit}
      >
        <FormField
          label="Vehicle ID"
          name="assetId"
          placeholder="Enter ASSET ID"
          value={formData.assetId}
          onChange={handleChange}
        />
        <FormField
          label="Asset Category"
          name="category"
          options={['vehicle', 'equipment']}
          value={formData.category}
          onChange={handleChange}
        />
        <FormField
          label="Asset Type"
          name="type"
          placeholder="Enter Asset Type"
          value={formData.type}
          onChange={handleChange}
        />
        <FormField
          label="Model Number"
          name="modelNumber"
          placeholder="Enter model number"
          value={formData.modelNumber}
          onChange={handleChange}
        />
        <FormField
          label="Manufacturer"
          name="manufacturer"
          placeholder="Enter manufacturer"
          value={formData.manufacturer}
          onChange={handleChange}
        />
        <FormField
          label="Asset Status"
          name="status"
          options={['available', 'assigned', 'maintenance']}
          value={formData.status}
          onChange={handleChange}
        />
        <div className="col-span-full grid grid-cols-2 gap-4">
          <button
            type="submit"
            className="bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Asset
          </button>
          <button
            type="button"
            onClick={() => navigate('/assets')}
            className="bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            View Assets
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAsset;
