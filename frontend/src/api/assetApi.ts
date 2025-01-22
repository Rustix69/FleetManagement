import axios from 'axios';

// Define the type for asset data
interface AssetData {
  assetId: string;
  category: string;
  type: string;
  modelNumber: string;
  manufacturer: string;
  status: string;
}

const BASE_URL = 'http://localhost:3000/api/vehicles'; // Update to your backend URL

// Function to create a new asset
export const createAsset = async (assetData: AssetData): Promise<any> => {
  try {
    const response = await axios.post(BASE_URL, assetData);
    return response.data;
  } catch (error: any) {
    console.error('Error creating asset:', error.response?.data || error.message);
    throw error;
  }
};

// Function to fetch all assets
export const getAssets = async () => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data.data; // Access the nested array if needed
    } catch (error) {
      console.error('Error fetching assets:', error);
      throw error;
    }
  };

// Function to update the status of an asset
export const updateAssetStatus = async (id: string, status: string): Promise<any> => {
  try {
    const response = await axios.patch(`${BASE_URL}/${id}/status`, { status });
    return response.data;
  } catch (error: any) {
    console.error('Error updating asset status:', error.response?.data || error.message);
    throw error;
  }
};

// Function to fetch a specific asset with assignments
export const getAssetWithAssignments = async (id: string): Promise<any> => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching asset with assignments:', error.response?.data || error.message);
    throw error;
  }
};

// Function to check asset availability
export const getAssetAvailability = async (id: string): Promise<any> => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}/availability`);
    return response.data;
  } catch (error: any) {
    console.error('Error checking asset availability:', error.response?.data || error.message);
    throw error;
  }
};
