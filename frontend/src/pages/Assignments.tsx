import { useEffect, useState } from 'react';
import axios from 'axios';

interface Assignment {
  assignmentId: string;
  vehicleId: {
    assetId: string;
    modelNumber: string;
  };
  projectId: string;
  startDate: string;
  endDate: string;
  status: string;
}

export default function Assignments() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch assignments from the API
    axios
      .get('http://localhost:3000/api/assignments')
      .then((response) => {
        setAssignments(response.data.data); // Adjusted based on your API's response structure
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching assignments:', err);
        setError('Failed to fetch assignments.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-4xl font-bold dark:text-white mb-8">Assignments</h1>
        <p className="text-lg dark:text-gray-300">Loading assignments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-4xl font-bold dark:text-white mb-8">Assignments</h1>
        <p className="text-lg dark:text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold dark:text-white mb-8">Assignments</h1>
      {assignments.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {assignments.map((assignment) => (
            <div
              key={assignment.assignmentId}
              className="p-6 rounded-xl dark:bg-gray-800/50 bg-white/50 backdrop-blur-sm"
            >
              <div className="h-32 flex flex-col items-center justify-center">
                <p className="text-lg font-medium dark:text-gray-300">
                  Assignment ID: {assignment.assignmentId}
                </p>
                <p className="text-sm dark:text-gray-400">Vehicle: {assignment.vehicleId.modelNumber} ({assignment.vehicleId.assetId})</p>
                <p className="text-sm dark:text-gray-400">Project ID: {assignment.projectId}</p>
                <p className="text-sm dark:text-gray-400">Start Date: {new Date(assignment.startDate).toLocaleDateString()}</p>
                <p className="text-sm dark:text-gray-400">End Date: {new Date(assignment.endDate).toLocaleDateString()}</p>
                <p className={`mt-2 text-sm font-semibold ${getStatusClass(assignment.status)}`}>
                  Status: {assignment.status.toUpperCase()}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-lg dark:text-gray-300">No assignments available.</p>
      )}
    </div>
  );
}

// Helper function to get status-specific styles
function getStatusClass(status: string) {
  switch (status) {
    case 'scheduled':
      return 'text-blue-500';
    case 'active':
      return 'text-green-500';
    case 'completed':
      return 'text-gray-500';
    default:
      return 'text-gray-400';
  }
}