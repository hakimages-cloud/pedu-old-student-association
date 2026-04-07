import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import WidgetCard from '../components/WidgetCard';
import { 
  UserGroupIcon, 
  CalendarIcon, 
  BanknotesIcon, 
  HeartIcon,
  PhotoIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const { user } = useAuth();

  const navigationItems = [
    { 
      name: 'Profile', 
      href: '/profile', 
      icon: UserCircleIcon, 
      color: 'bg-blue-500',
      description: 'Manage your profile and dependants'
    },
    { 
      name: 'Dues', 
      href: '/dues', 
      icon: BanknotesIcon, 
      color: 'bg-green-500',
      description: 'View and pay monthly dues'
    },
    { 
      name: 'Welfare', 
      href: '/welfare', 
      icon: HeartIcon, 
      color: 'bg-red-500',
      description: 'Apply for welfare support'
    },
    { 
      name: 'Gallery', 
      href: '/gallery', 
      icon: PhotoIcon, 
      color: 'bg-purple-500',
      description: 'View photos and videos'
    },
    { 
      name: 'Events', 
      href: '/events', 
      icon: CalendarIcon, 
      color: 'bg-yellow-500',
      description: 'Upcoming events and announcements'
    }
  ];

  if (user?.role === 'admin' || user?.role === 'superadmin') {
    navigationItems.push({ 
      name: 'Member Management', 
      href: '/member-management', 
      icon: UserGroupIcon, 
      color: 'bg-indigo-500',
      description: 'Manage association members'
    });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="mt-2 text-gray-600">
            Pedu Old Student Association Dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {navigationItems.map((item) => (
            <WidgetCard
              key={item.name}
              title={item.name}
              description={item.description}
              href={item.href}
              icon={item.icon}
              color={item.color}
            />
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Announcements</h3>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-900">Monthly Meeting - March 2024</p>
                <p className="text-xs text-gray-600 mt-1">Join us for our monthly general meeting on March 25th at 5:00 PM</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-900">Dues Reminder</p>
                <p className="text-xs text-gray-600 mt-1">Please ensure your monthly dues are paid to enjoy all benefits</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-900">New Welfare Initiative</p>
                <p className="text-xs text-gray-600 mt-1">We've expanded our welfare support program. Learn more in the welfare section.</p>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-primary-50 rounded-lg">
                <p className="text-2xl font-bold text-primary-600">150+</p>
                <p className="text-sm text-gray-600">Active Members</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">GHC 50</p>
                <p className="text-sm text-gray-600">Monthly Dues</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">12</p>
                <p className="text-sm text-gray-600">Events This Year</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">25</p>
                <p className="text-sm text-gray-600">Welfare Cases</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
