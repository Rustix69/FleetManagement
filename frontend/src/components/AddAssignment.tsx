import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Plus, Eye } from 'lucide-react';
import FormField from './FormField';

interface Vehicle {
    assetId: string;
    modelNumber: string;
}


export default function AddAssignments() {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [assignmentData, setAssignmentData] = useState({
        assignmentId: '',
        vehicleId: '',
        projectId: '',
        startDate: '',
        endDate: '',
        status: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch available vehicles from the backend
        axios
            .get('http://localhost:3000/api/vehicles') // Replace with your backend route for fetching vehicles
            .then((response) => {
                if (response.data && Array.isArray(response.data.data)) {
                    setVehicles(response.data.data); // Ensure the data is an array
                } else {
                    console.error('Unexpected API response format:', response.data);
                }
            })
            .catch((error) => console.error('Error fetching vehicles:', error));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setAssignmentData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/assignments', assignmentData); // Replace with your backend route for creating assignments
            console.log('Assignment created:', response.data);
            alert('Assignment created successfully!');
            setAssignmentData({
                assignmentId: '',
                vehicleId: '',
                projectId: '',
                startDate: '',
                endDate: '',
                status: '',
            });
        } catch (error) {
            console.error('Error creating assignment:', error);
            alert('Failed to create assignment.');
        }
    };

    return (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 dark:text-white">Create Assignment</h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 rounded-xl dark:bg-gray-800/50 bg-white/50 backdrop-blur-sm"
          >
            <FormField
              label="Assignment ID"
              name="assignmentId"
              value={assignmentData.assignmentId}
              onChange={handleChange}
              placeholder="Enter assignment ID"
            />
            <FormField
              label="Asset Needed"
              name="vehicleId"
              value={assignmentData.vehicleId}
              onChange={handleChange}
              options={vehicles.map((vehicle) => `${vehicle.assetId}`)}
            />
            <FormField
              label="Project ID"
              name="projectId"
              value={assignmentData.projectId}
              onChange={handleChange}
              placeholder="Enter project ID"
            />
            <FormField
              label="Start Date"
              name="startDate"
              type="date"
              value={assignmentData.startDate}
              onChange={handleChange}
            />
            <FormField
              label="End Date"
              name="endDate"
              type="date"
              value={assignmentData.endDate}
              onChange={handleChange}
            />
            <FormField
              label="Status"
              name="status"
              value={assignmentData.status}
              onChange={handleChange}
              options={['scheduled', 'active', 'completed']}
            />
            <div className="col-span-full grid grid-cols-2 gap-4">
              <button
                type="submit"
                className="bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create Assignment
              </button>
              <button
                type="button"
                onClick={() => navigate('/assignments')}
                className="bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                View Assignments
              </button>
            </div>
          </form>
        </div>
      );
    }
