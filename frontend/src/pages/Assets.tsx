import { useEffect, useState } from 'react';
import { getAssets } from '../api/assetApi';

interface Asset {
  _id: string; // Assuming MongoDB, change according to your database schema
  assetId: string;
  category: string;
  type: string;
  modelNumber: string;
  manufacturer: string;
  status: string;
}

export default function Assets() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const data = await getAssets();
        setAssets(data);
      } catch (error) {
        console.error('Error fetching assets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-lg dark:text-white">Loading assets...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold dark:text-white mb-8">Vehicle Assets</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assets.length === 0 ? (
          <div className="text-lg dark:text-gray-300">No assets available</div>
        ) : (
          assets.map((asset) => (
            <div
              key={asset._id}
              className="p-6 rounded-xl dark:bg-gray-800/50 bg-white/50 backdrop-blur-sm"
            >
              <div className="h-40 flex flex-col items-center justify-center">
                <p className="text-lg font-medium dark:text-gray-300">ID: {asset.assetId}</p>
                <p className="text-base font-normal dark:text-gray-400">Category: {asset.category}</p>
                <p className="text-base font-normal dark:text-gray-400">Type: {asset.type}</p>
                <p className="text-base font-normal dark:text-gray-400">Model: {asset.modelNumber}</p>
                <p className="text-base font-normal dark:text-gray-400">Manufacturer: {asset.manufacturer}</p>
                <p className="text-base font-normal dark:text-gray-400">Status: {asset.status}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
