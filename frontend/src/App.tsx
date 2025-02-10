import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { 
  Car, 
  Truck, 
  CheckSquare, 
  Calendar,
  Plus,
  ListPlus,
  Heart,
  User,
  Eye,
  X,
  Mail,
  Lock
} from 'lucide-react';

// Import pages
import Assets from './pages/Assets';
import Assignments from './pages/Assignments';
import Fleets from './pages/Fleets';
import AddAsset from './components/AddAsset';
import AddAssignments from './components/AddAssignment';
import FleetForm from './components/AddFleet';

// Auth Modal Component
function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl w-full max-w-md relative">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold mb-6 dark:text-white">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>

        {/* Form */}
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-300">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg dark:bg-gray-700 bg-white border dark:border-gray-600 border-gray-300 focus:ring-2 focus:ring-purple-500 dark:text-white"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-300">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg dark:bg-gray-700 bg-white border dark:border-gray-600 border-gray-300 focus:ring-2 focus:ring-purple-500 dark:text-white"
                placeholder="Enter your password"
              />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-300">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2 rounded-lg dark:bg-gray-700 bg-white border dark:border-gray-600 border-gray-300 focus:ring-2 focus:ring-purple-500 dark:text-white"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        {/* Toggle between login and signup */}
        <p className="mt-4 text-center text-sm dark:text-gray-400">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
}

// Main dashboard component
function Dashboard() {
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  // Sample data for demonstration
  const stats = {
    totalFleets: 156,
    completedAssignments: 892,
    pendingAssignments: 43,
    availableVehicles: 78
  };

  // Sample data for vehicle and assignment selection
  const sampleVehicles = [
    { id: 'V001', name: 'Toyota Camry - ABC123' },
    { id: 'V002', name: 'Ford F-150 - XYZ789' },
    { id: 'V003', name: 'Honda CR-V - DEF456' },
  ];

  const sampleAssignments = [
    { id: 'A001', name: 'City Delivery Route' },
    { id: 'A002', name: 'Airport Transfer Service' },
    { id: 'A003', name: 'Corporate Transportation' },
  ];

  return (
    <div className="relative p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold dark:text-white">Fleet Management Dashboard</h1>
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors flex items-center gap-2"
        >
          <User className="w-4 h-4" />
          Login
        </button>
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />

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

      {/* Vehicle Registration Form */}
      <AddAsset/>

      {/* Assignment Form */}
      <AddAssignments/>

      {/* Fleet Management Form */}
      <FleetForm/>

      {/* Footer */}
      <footer className="text-center py-6 dark:text-gray-400 text-gray-600 flex items-center justify-center gap-2">
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
function StatCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: number }) {
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
function Input({ label, type = 'text', placeholder }: { label: string; type?: string; placeholder: string }) {
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
function Select({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2 dark:text-gray-300">{label}</label>
      <select className="w-full px-4 py-2 rounded-lg dark:bg-gray-700 bg-white border dark:border-gray-600 border-gray-300 focus:ring-2 focus:ring-purple-500 dark:text-white">
        <option value="">Select {label}</option>
        {options.map((option: string) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

export default App;