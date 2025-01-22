import React, { useState } from 'react';
import { 
  Car, 
  Truck, 
  CheckSquare, 
  Calendar,
  Plus,
  ListPlus,
  Heart,
  User
} from 'lucide-react';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  
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
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="min-h-screen dark:bg-gray-900 bg-white relative">
        {/* Grid Background */}
        <div className="absolute inset-0 dark:bg-grid-white/[0.05] bg-grid-black/[0.05] pointer-events-none" />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/30 via-transparent to-blue-500/30 pointer-events-none" />
        
        {/* Content */}
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

          {/* Vehicle Registration Form */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 dark:text-white">Add New Vehicle</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 rounded-xl dark:bg-gray-800/50 bg-white/50 backdrop-blur-sm">
              <Input label="Vehicle ID" placeholder="Enter vehicle ID" />
              <Select label="Vehicle Category" options={['Sedan', 'SUV', 'Truck', 'Van']} />
              <Select label="Vehicle Type" options={['Commercial', 'Passenger', 'Heavy Duty']} />
              <Input label="Model Number" placeholder="Enter model number" />
              <Input label="Manufacturer" placeholder="Enter manufacturer" />
              <Select label="Vehicle Status" options={['Available', 'In Use', 'Maintenance']} />
              <button className="col-span-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" />
                Add Vehicle
              </button>
            </form>
          </div>

          {/* Assignment Form */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 dark:text-white">Create Assignment</h2>
            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 rounded-xl dark:bg-gray-800/50 bg-white/50 backdrop-blur-sm">
              <Input label="Assignment ID" placeholder="Enter assignment ID" />
              <Input label="Vehicle Need" placeholder="Enter vehicle requirements" />
              <Input label="Project ID" placeholder="Enter project ID" />
              <Input label="Start Date" type="date" />
              <Input label="End Date" type="date" />
              <Select label="Scheduled" options={['Yes', 'No']} />
              <button className="col-span-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" />
                Create Assignment
              </button>
            </form>
          </div>

          {/* Fleet Management Form */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 dark:text-white">Add New Fleet</h2>
            <form className="grid grid-cols-1 gap-6 p-6 rounded-xl dark:bg-gray-800/50 bg-white/50 backdrop-blur-sm">
              {/* Basic Fleet Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Input label="Fleet ID" placeholder="Enter fleet ID" />
                <Input label="Fleet Name" placeholder="Enter fleet name" />
                <Select label="Fleet Status" options={['Active', 'Inactive', 'Maintenance', 'Reserved']} />
              </div>
              
              {/* Fleet Description */}
              <div className="col-span-full">
                <label className="block text-sm font-medium mb-2 dark:text-gray-300">Description</label>
                <textarea 
                  className="w-full px-4 py-2 rounded-lg dark:bg-gray-700 bg-white border dark:border-gray-600 border-gray-300 focus:ring-2 focus:ring-purple-500 dark:text-white h-32"
                  placeholder="Enter fleet description"
                />
              </div>

              {/* Vehicle and Assignment Selection in Flex Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Vehicle Selection */}
                <div className="bg-gray-900/20 p-4 rounded-lg">
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">Add Vehicles</label>
                  <div className="space-y-2">
                    {sampleVehicles.map(vehicle => (
                      <div key={vehicle.id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={vehicle.id}
                          className="rounded dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-purple-600 focus:ring-purple-500"
                        />
                        <label htmlFor={vehicle.id} className="text-sm dark:text-gray-300">{vehicle.name}</label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Assignment Selection */}
                <div className="bg-gray-900/20 p-4 rounded-lg">
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">Add Assignments</label>
                  <div className="space-y-2">
                    {sampleAssignments.map(assignment => (
                      <div key={assignment.id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={assignment.id}
                          className="rounded dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-purple-600 focus:ring-purple-500"
                        />
                        <label htmlFor={assignment.id} className="text-sm dark:text-gray-300">{assignment.name}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button className="bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
                <ListPlus className="w-5 h-5" />
                Create Fleet
              </button>
            </form>
          </div>

          {/* Footer */}
          <footer className="text-center py-6 dark:text-gray-400 text-gray-600 flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> by Rustix
          </footer>
        </div>
      </div>
    </div>
  );
}

// Component for stat cards
function StatCard({ icon, title, value }) {
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
function Input({ label, type = 'text', placeholder }) {
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
function Select({ label, options }) {
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