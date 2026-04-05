import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';
import { UserCircleIcon, PlusIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    yearOfCompletion: user?.yearOfCompletion || '',
    program: user?.program || '',
    address: user?.address || '',
    occupation: user?.occupation || '',
    bio: user?.bio || ''
  });
  
  const [dependants, setDependants] = useState(user?.dependants || []);
  const [showAddDependant, setShowAddDependant] = useState(false);
  const [newDependant, setNewDependant] = useState({
    name: '',
    relationship: '',
    age: '',
    phone: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await updateUser(formData);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handleAddDependant = () => {
    if (!newDependant.name || !newDependant.relationship) {
      toast.error('Please fill in required fields');
      return;
    }

    const updatedDependants = [...dependants, { ...newDependant, id: Date.now() }];
    setDependants(updatedDependants);
    updateUser({ dependants: updatedDependants });
    
    setNewDependant({ name: '', relationship: '', age: '', phone: '' });
    setShowAddDependant(false);
    toast.success('Dependant added successfully!');
  };

  const handleRemoveDependant = (id) => {
    const updatedDependants = dependants.filter(d => d.id !== id);
    setDependants(updatedDependants);
    updateUser({ dependants: updatedDependants });
    toast.success('Dependant removed successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                  >
                    <PencilIcon className="h-4 w-4 mr-2" />
                    Edit Profile
                  </button>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="mt-1 input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1 input-field"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="mt-1 input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Year of Completion</label>
                      <input
                        type="text"
                        name="yearOfCompletion"
                        value={formData.yearOfCompletion}
                        onChange={handleInputChange}
                        className="mt-1 input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Program</label>
                      <input
                        type="text"
                        name="program"
                        value={formData.program}
                        onChange={handleInputChange}
                        className="mt-1 input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Occupation</label>
                      <input
                        type="text"
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleInputChange}
                        className="mt-1 input-field"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                      className="mt-1 input-field"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Bio</label>
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={4}
                      className="mt-1 input-field"
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn-primary"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="text-lg font-medium text-gray-900">{formData.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="text-lg font-medium text-gray-900">{formData.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="text-lg font-medium text-gray-900">{formData.phone || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Membership Number</p>
                      <p className="text-lg font-medium text-gray-900">{user?.membershipNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Year of Completion</p>
                      <p className="text-lg font-medium text-gray-900">{formData.yearOfCompletion || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Program</p>
                      <p className="text-lg font-medium text-gray-900">{formData.program || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Occupation</p>
                      <p className="text-lg font-medium text-gray-900">{formData.occupation || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Role</p>
                      <p className="text-lg font-medium text-gray-900 capitalize">{user?.role}</p>
                    </div>
                  </div>
                  
                  {formData.address && (
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="text-lg font-medium text-gray-900">{formData.address}</p>
                    </div>
                  )}
                  
                  {formData.bio && (
                    <div>
                      <p className="text-sm text-gray-500">Bio</p>
                      <p className="text-gray-900">{formData.bio}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Dependents Section */}
          <div className="lg:col-span-1">
            <div className="card">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Dependants</h3>
                <button
                  onClick={() => setShowAddDependant(true)}
                  className="inline-flex items-center p-2 border border-transparent rounded-full text-primary-600 bg-primary-100 hover:bg-primary-200"
                >
                  <PlusIcon className="h-4 w-4" />
                </button>
              </div>

              {showAddDependant && (
                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Add Dependant</h4>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Name"
                      value={newDependant.name}
                      onChange={(e) => setNewDependant({...newDependant, name: e.target.value})}
                      className="input-field text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Relationship"
                      value={newDependant.relationship}
                      onChange={(e) => setNewDependant({...newDependant, relationship: e.target.value})}
                      className="input-field text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Age"
                      value={newDependant.age}
                      onChange={(e) => setNewDependant({...newDependant, age: e.target.value})}
                      className="input-field text-sm"
                    />
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={newDependant.phone}
                      onChange={(e) => setNewDependant({...newDependant, phone: e.target.value})}
                      className="input-field text-sm"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={handleAddDependant}
                        className="flex-1 btn-primary text-sm py-1"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => setShowAddDependant(false)}
                        className="flex-1 px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {dependants.length === 0 ? (
                <div className="text-center py-8">
                  <UserCircleIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">No dependants added yet</p>
                  <button
                    onClick={() => setShowAddDependant(true)}
                    className="mt-2 text-sm text-primary-600 hover:text-primary-500 font-medium"
                  >
                    Add your first dependant
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {dependants.map((dependant) => (
                    <div key={dependant.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{dependant.name}</p>
                          <p className="text-sm text-gray-500">{dependant.relationship}</p>
                          {dependant.age && <p className="text-xs text-gray-400">Age: {dependant.age}</p>}
                          {dependant.phone && <p className="text-xs text-gray-400">{dependant.phone}</p>}
                        </div>
                        <button
                          onClick={() => handleRemoveDependant(dependant.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
