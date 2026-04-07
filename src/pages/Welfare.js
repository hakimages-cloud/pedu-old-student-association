import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';
import { HeartIcon, PlusIcon, DocumentTextIcon, CheckCircleIcon, ClockIcon, XCircleIcon } from '@heroicons/react/24/outline';

const Welfare = () => {
  const { user } = useAuth();
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applications, setApplications] = useState([
    {
      id: 1,
      type: 'funeral',
      amount: 500,
      description: 'Support for father\'s funeral expenses',
      status: 'approved',
      date: '2024-02-15',
      approvedDate: '2024-02-18',
      approvedBy: 'Admin User'
    },
    {
      id: 2,
      type: 'medical',
      amount: 300,
      description: 'Medical emergency support',
      status: 'pending',
      date: '2024-03-01',
      approvedDate: null,
      approvedBy: null
    }
  ]);
  
  const [formData, setFormData] = useState({
    type: '',
    amount: '',
    description: '',
    urgency: 'normal',
    documents: []
  });

  const applicationTypes = [
    { value: 'funeral', label: 'Funeral Support', maxAmount: 1000 },
    { value: 'wedding', label: 'Wedding Support', maxAmount: 500 },
    { value: 'medical', label: 'Medical Emergency', maxAmount: 800 },
    { value: 'education', label: 'Education Support', maxAmount: 600 },
    { value: 'other', label: 'Other', maxAmount: 400 }
  ];

  const urgencyLevels = [
    { value: 'low', label: 'Low (2-3 weeks processing)' },
    { value: 'normal', label: 'Normal (1-2 weeks processing)' },
    { value: 'high', label: 'High (3-5 days processing)' },
    { value: 'emergency', label: 'Emergency (24-48 hours processing)' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();
    
    if (!formData.type || !formData.amount || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    const selectedType = applicationTypes.find(t => t.value === formData.type);
    if (selectedType && parseFloat(formData.amount) > selectedType.maxAmount) {
      toast.error(`Maximum amount for ${selectedType.label} is GHC ${selectedType.maxAmount}`);
      return;
    }

    const newApplication = {
      id: Date.now(),
      ...formData,
      amount: parseFloat(formData.amount),
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      approvedDate: null,
      approvedBy: null,
      applicant: user.name
    };

    setApplications([newApplication, ...applications]);
    setFormData({
      type: '',
      amount: '',
      description: '',
      urgency: 'normal',
      documents: []
    });
    setShowApplicationForm(false);
    toast.success('Welfare application submitted successfully!');
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircleIcon className="h-5 w-5 text-red-500" />;
      case 'pending':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      default:
        return <ClockIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800'
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welfare Support</h1>
          <p className="mt-2 text-gray-600">Apply for welfare support and track your applications</p>
        </div>

        {/* Welfare Information */}
        <div className="card mb-8">
          <div className="flex items-center mb-4">
            <HeartIcon className="h-8 w-8 text-red-500 mr-3" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Welfare Program</h2>
              <p className="text-gray-600">Support for members in times of need</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {applicationTypes.map((type) => (
              <div key={type.value} className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900">{type.label}</h3>
                <p className="text-sm text-gray-600 mt-1">Maximum: GHC {type.maxAmount}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Apply for Welfare Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowApplicationForm(true)}
            className="btn-primary"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Apply for Welfare Support
          </button>
        </div>

        {/* Application Form */}
        {showApplicationForm && (
          <div className="card mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">New Welfare Application</h3>
            
            <form onSubmit={handleSubmitApplication} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Application Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="mt-1 input-field"
                    required
                  >
                    <option value="">Select type...</option>
                    {applicationTypes.map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Amount Requested (GHC)</label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className="mt-1 input-field"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Urgency Level</label>
                  <select
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleInputChange}
                    className="mt-1 input-field"
                  >
                    {urgencyLevels.map(level => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="mt-1 input-field"
                  placeholder="Please provide details about your situation and why you need support..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Supporting Documents</label>
                <div className="mt-1">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="input-field"
                    onChange={(e) => {
                      const files = Array.from(e.target.files);
                      setFormData(prev => ({ ...prev, documents: files }));
                    }}
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Upload any supporting documents (PDF, JPG, PNG). Maximum 5 files.
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowApplicationForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Applications History */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Applications</h3>
          
          {applications.length === 0 ? (
            <div className="text-center py-8">
              <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">No applications yet</p>
              <button
                onClick={() => setShowApplicationForm(true)}
                className="mt-2 text-sm text-primary-600 hover:text-primary-500 font-medium"
              >
                Apply for welfare support
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.map((application) => (
                <div key={application.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(application.status)}
                        <h4 className="font-medium text-gray-900 capitalize">
                          {applicationTypes.find(t => t.value === application.type)?.label || application.type}
                        </h4>
                        {getStatusBadge(application.status)}
                      </div>
                      
                      <p className="text-gray-600 mt-2">{application.description}</p>
                      
                      <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Amount:</span>
                          <span className="ml-2 font-medium">GHC {application.amount}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Applied:</span>
                          <span className="ml-2 font-medium">{application.date}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Urgency:</span>
                          <span className="ml-2 font-medium capitalize">{application.urgency}</span>
                        </div>
                        {application.status === 'approved' && (
                          <div>
                            <span className="text-gray-500">Approved by:</span>
                            <span className="ml-2 font-medium">{application.approvedBy}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Welfare Guidelines */}
        <div className="mt-8 card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Welfare Guidelines</h3>
          <div className="prose max-w-none text-gray-600">
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <h4 className="font-medium text-blue-900 mb-2">Eligibility Criteria:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-blue-800">
                <li>Must be a fully paid-up member for at least 6 months</li>
                <li>Dues must be up to date at the time of application</li>
                <li>Applications must be for genuine welfare needs</li>
                <li>Supporting documents may be required for verification</li>
              </ul>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-medium text-yellow-900 mb-2">Important Notes:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-yellow-800">
                <li>Welfare support is subject to availability of funds</li>
                <li>Emergency applications will be prioritized</li>
                <li>False information may lead to rejection and membership suspension</li>
                <li>All applications are reviewed by the welfare committee</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welfare;
