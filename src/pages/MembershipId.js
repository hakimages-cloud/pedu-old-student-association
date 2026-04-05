import React, { useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import { useReactToPrint } from 'react-to-print';
import { QrCodeIcon, IdentificationIcon } from '@heroicons/react/24/outline';

const MembershipId = () => {
  const { user } = useAuth();
  const idCardRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => idCardRef.current,
    pageStyle: `
      @page {
        size: 85.6mm 53.98mm;
        margin: 0;
      }
      @media print {
        body { margin: 0; }
        .no-print { display: none !important; }
      }
    `
  });

  const IdCard = () => (
    <div 
      ref={idCardRef}
      className="w-[336px] h-[212px] bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg p-4 text-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full -ml-12 -mb-12"></div>
      </div>
      
      {/* Logo */}
      <div className="absolute top-4 right-4">
        <div className="w-12 h-12 bg-white rounded-full p-1">
          <img src="/CREST.jpeg" alt="POSA Logo" className="w-full h-full rounded-full object-cover" />
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <div className="mb-3">
          <h2 className="text-xs font-semibold opacity-80">PEDU OLD STUDENT ASSOCIATION</h2>
          <p className="text-xs opacity-60">Membership Identification Card</p>
        </div>
        
        <div className="flex items-start space-x-3">
          <div className="w-16 h-20 bg-white rounded-lg flex items-center justify-center">
            <IdentificationIcon className="h-8 w-8 text-primary-600" />
          </div>
          
          <div className="flex-1">
            <h3 className="font-bold text-sm">{user?.name || 'Member Name'}</h3>
            <p className="text-xs opacity-80 mt-1">ID: {user?.membershipNumber || 'POS0000'}</p>
            <p className="text-xs opacity-80 mt-1">Role: {user?.role || 'member'}</p>
            <p className="text-xs opacity-80 mt-1">Email: {user?.email || 'member@posa.com'}</p>
            <p className="text-xs opacity-80 mt-1">Phone: {user?.phone || '0000000000'}</p>
          </div>
        </div>
        
        <div className="absolute bottom-3 left-4 right-4">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs opacity-60">Valid Until:</p>
              <p className="text-xs font-semibold">Dec 31, 2024</p>
            </div>
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
              <QrCodeIcon className="h-6 w-6 text-primary-600" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Card Back Template (for reference) */}
      <div className="absolute inset-0 opacity-0 pointer-events-none">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <p className="text-xs opacity-60">This card is the property of</p>
            <p className="text-sm font-bold">PEDU OLD STUDENT ASSOCIATION</p>
            <p className="text-xs opacity-60 mt-2">If found, please return to:</p>
            <p className="text-xs">Pedu M/A Basic School 'A'</p>
            <p className="text-xs">Cape Coast, Ghana</p>
            <p className="text-xs opacity-60 mt-2">www.posa-ghana.com</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Membership ID</h1>
          <p className="mt-2 text-gray-600">Your digital membership identification card</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ID Card Preview */}
          <div>
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Your ID Card</h2>
              
              <div className="flex justify-center mb-6">
                <IdCard />
              </div>
              
              <div className="flex justify-center space-x-3 no-print">
                <button
                  onClick={handlePrint}
                  className="btn-primary"
                >
                  Print ID Card
                </button>
                <button
                  onClick={() => {
                    // In production, this would download a PDF version
                    alert('PDF download feature coming soon!');
                  }}
                  className="btn-secondary"
                >
                  Download PDF
                </button>
              </div>
            </div>
          </div>

          {/* Member Information */}
          <div>
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Member Information</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Full Name</p>
                    <p className="text-gray-900">{user?.name || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Membership Number</p>
                    <p className="text-gray-900">{user?.membershipNumber || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="text-gray-900">{user?.email || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Phone</p>
                    <p className="text-gray-900">{user?.phone || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Role</p>
                    <p className="text-gray-900 capitalize">{user?.role || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Year of Completion</p>
                    <p className="text-gray-900">{user?.yearOfCompletion || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Program</p>
                    <p className="text-gray-900">{user?.program || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Join Date</p>
                    <p className="text-gray-900">{user?.joinDate || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Usage Guidelines */}
            <div className="card mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">ID Card Usage Guidelines</h3>
              
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <p>This ID card confirms your active membership status in the Pedu Old Student Association.</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <p>Present this card at association events, meetings, and when accessing member benefits.</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <p>The card is valid for one calendar year and must be renewed annually.</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <p>Report lost or stolen cards immediately to the association office.</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <p>This card remains the property of POSA and must be surrendered upon request.</p>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="card mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Member Benefits</h3>
              
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Welfare Support</p>
                    <p className="text-sm text-gray-600">Access to welfare fund for emergencies</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Event Access</p>
                    <p className="text-sm text-gray-600">Priority booking for association events</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Networking</p>
                    <p className="text-sm text-gray-600">Connect with fellow alumni</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Voting Rights</p>
                    <p className="text-sm text-gray-600">Participate in association decisions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipId;
