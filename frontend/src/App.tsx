import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { 
  Car, 
  Truck, 
  CheckSquare, 
  Calendar,
  ListPlus,
  Heart,
  User,
  Eye
} from 'lucide-react';
import Assets from './pages/Assets';
import Assignments from './pages/Assignments';
import Fleets from './pages/Fleets';
import AddAsset from './components/AddAsset';
import AddAssignments from './components/AddAssignment';
import FleetForm from './components/AddFleet';


// Main dashboard component
function Dashboard() {
  const navigate = useNavigate();
  
  // Sample data for demonstration
  const stats = {
    totalFleets: 156,
    completedAssignments: 892,
    pendingAssignments: 43,
    availableVehicles: 78
  };

  return (
    <div className="relative p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold dark:text-white">Fleet Management Dashboard</h1>
        <button
          className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <User className="w-4 h-4" />
          Login
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard
          icon={<Truck className="w-8 h-8" />}
          title="Total Fleets"
          value={stats.totalFleets}
        />
        <StatCard
          icon={<CheckSquare className="w-8 h-8" />}
          title="Completed Assignments"
          value={stats.completedAssignments}
        />
        <StatCard
          icon={<Calendar className="w-8 h-8" />}
          title="Pending Assignments"
          value={stats.pendingAssignments}
        />
        <StatCard
          icon={<Car className="w-8 h-8" />}
          title="Available Vehicles"
          value={stats.availableVehicles}
        />
      </div>



      {/* Assets Registration Form */}
      <AddAsset />

      {/* Assignment Form */}
      <AddAssignments/>

      {/* Fleet Management Form */}
      <FleetForm/>

      {/* Footer */}
      <footer className="text-center dark:text-gray-400 text-gray-600 font-serif font-normal text-xl flex items-center justify-center gap-2">
        Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> by Rustix
      </footer>
    </div>
  );
}

function App() {
  const [isDarkMode] = useState(true);

  return (
    <Router>
      <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
        <div className="min-h-screen dark:bg-gray-900 bg-white relative">
          {/* Grid Background */}
          <div className="absolute inset-0 dark:bg-grid-white/[0.05] bg-grid-black/[0.05] pointer-events-none" />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/30 via-transparent to-blue-500/30 pointer-events-none" />
          
          {/* Content */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/assets" element={<Assets />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/fleets" element={<Fleets />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

// Component for stat cards
interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: number;
}

function StatCard({ icon, title, value }: StatCardProps) {
  return (
    <div className="p-6 rounded-xl dark:bg-gray-800/50 bg-white/50 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg dark:bg-purple-500/20 bg-purple-100">
          {icon}
        </div>
        <div>
          <h3 className="text-sm font-medium dark:text-gray-400 text-gray-600">{title}</h3>
          <p className="text-2xl font-bold dark:text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}

// Input component
interface InputProps {
  label: string;
  type?: string;
  placeholder: string;
}

function Input({ label, type = 'text', placeholder }: InputProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2 dark:text-gray-300">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-2 rounded-lg dark:bg-gray-700 bg-white border dark:border-gray-600 border-gray-300 focus:ring-2 focus:ring-purple-500 dark:text-white"
      />
    </div>
  );
}

// Select component
interface SelectProps {
  label: string;
  options: string[];
}

function Select({ label, options }: SelectProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2 dark:text-gray-300">{label}</label>
      <select className="w-full px-4 py-2 rounded-lg dark:bg-gray-700 bg-white border dark:border-gray-600 border-gray-300 focus:ring-2 focus:ring-purple-500 dark:text-white">
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

export default App;