import React, { useState } from 'react';
import axios from 'axios';

const AddAssignmentToFleet = () => {
  const [fleetId, setFleetId] = useState('');
  const [assignmentId, setAssignmentId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`http://localhost:3000/api/fleets/${fleetId}/assignments`, {
        assignmentId: assignmentId
      });

      if (response.status === 200 || response.status === 201) {
        alert('Assignment added to fleet successfully!');
        setFleetId('');
        setAssignmentId('');
      } else {
        alert('Failed to add vehicle to fleet');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Add Assignment to Fleet</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="fleetId" className="block mb-1">Fleet ID:</label>
          <input
            type="text"
            id="fleetId"
            value={fleetId}
            onChange={(e) => setFleetId(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="assignmentId" className="block mb-1">Assignment ID:</label>
          <input
            type="text"
            id="assignmentId"
            value={assignmentId}
            onChange={(e) => setAssignmentId(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add Vehicle to Fleet'}
        </button>
      </form>
    </div>
  );
};

export default AddAssignmentToFleet;
