import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Corrected navigate import
import { Plus, Eye } from 'lucide-react'; // Icons for buttons
import FormField from './FormField'; // Assuming FormField is in the same directory

const FleetForm = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [formValues, setFormValues] = useState({
    fleetId: '',
    name: '',
    fleetStatus: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const postData = {
      fleetId: formValues.fleetId,
      name: formValues.name,
      fleetStatus: formValues.fleetStatus,
      description: formValues.description,
    };

    try {
      const response = await axios.post('http://localhost:3000/api/fleets', postData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200 || response.status === 201) {
        alert('Fleet created successfully!');
        // Reset form on success
        setFormValues({
          fleetId: '',
          name: '',
          fleetStatus: '',
          description: '',
        });
      } else {
        alert('Failed to create fleet');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold mb-6 dark:text-white">Add New Fleet</h2>
      <form
        className="grid grid-cols-1 gap-6 p-6 rounded-xl dark:bg-gray-800/50 bg-white/50 backdrop-blur-sm"
        onSubmit={handleSubmit}
      >
        {/* Basic Fleet Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FormField
            label="Fleet ID"
            name="fleetId"
            placeholder="Enter fleet ID"
            value={formValues.fleetId}
            onChange={handleChange}
          />
          <FormField
            label="Fleet Name"
            name="name"
            placeholder="Enter fleet name"
            value={formValues.name}
            onChange={handleChange}
          />
          <FormField
            label="Fleet Status"
            name="fleetStatus"
            options={['active', 'inactive', 'maintenance']}
            value={formValues.fleetStatus}
            onChange={handleChange}
          />
        </div>

        {/* Fleet Description */}
        <div className="col-span-full">
          <FormField
            label="Description"
            name="description"
            type="textarea"
            placeholder="Enter fleet description"
            value={formValues.description}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
              setFormValues((prevValues) => ({
                ...prevValues,
                description: e.target.value,
              }))
            }
          />
        </div>

        {/* Submit and View Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            type="submit"
            className="bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : <>
              <Plus /> Create Fleet
            </>}
          </button>
          <button
            type="button"
            onClick={() => navigate('/fleets')}
            className="bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
          >
            <Eye /> View Fleets
          </button>
        </div>
      </form>
    </div>
  );
};

export default FleetForm;
