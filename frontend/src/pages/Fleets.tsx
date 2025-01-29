import { useEffect, useState } from 'react';
import axios from 'axios';
import AddVehicleToFleet from '../components/UpdateAssetFleet';
import AddAssignmentToFleet from '../components/UpdateAssignment';

interface Fleet {
  fleetId: string;
  name: string;
  status: string;
  description: string;
}

export default function Fleets() {
  const [fleets, setFleets] = useState<Fleet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllFleets = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/fleets'); // Adjust URL as needed
        setFleets(response.data.data); // Assuming the response contains an array of fleets
        setLoading(false);
      } catch (err) {
        console.error('Error fetching fleets:', err);
        setError('Failed to fetch fleets');
        setLoading(false);
      }
    };

    fetchAllFleets();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold dark:text-white mb-8">Fleets</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {fleets.map((fleet) => (
          <div key={fleet.fleetId} className="p-6 rounded-xl dark:bg-gray-800/50 bg-white/50 backdrop-blur-sm">
            <div className="h-48 flex flex-col items-center justify-center">
              <p className="text-lg font-medium dark:text-gray-300">Fleet ID: {fleet.fleetId}</p>
              <p className="text-lg font-medium dark:text-gray-300">Fleet Name: {fleet.name}</p>
            </div>
            <div className="mt-4 text-sm dark:text-gray-400">
              <p>Status: {fleet.status}</p>
              <p>{fleet.description}</p>
            </div>
          </div>
        ))}

        <AddVehicleToFleet/>
        <AddAssignmentToFleet/>
      </div>
    </div>
  );
}