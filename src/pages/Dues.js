import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';
import { BanknotesIcon, CreditCardIcon, CalendarIcon } from '@heroicons/react/24/outline';

const Dues = () => {
  const { user } = useAuth();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [processingPayment, setProcessingPayment] = useState(false);
  
  // Mock data - in production, this would come from your API
  const duesHistory = [
    { id: 1, month: 'January 2024', amount: 50, status: 'paid', date: '2024-01-15', method: 'MTN MoMo' },
    { id: 2, month: 'February 2024', amount: 50, status: 'paid', date: '2024-02-14', method: 'Telecel Cash' },
    { id: 3, month: 'March 2024', amount: 50, status: 'pending', date: null, method: null },
    { id: 4, month: 'April 2024', amount: 50, status: 'pending', date: null, method: null },
  ];

  const totalPaid = duesHistory.filter(d => d.status === 'paid').reduce((sum, d) => sum + d.amount, 0);
  const totalOwed = duesHistory.filter(d => d.status === 'pending').reduce((sum, d) => sum + d.amount, 0);

  const handlePayment = async (method) => {
    setSelectedPaymentMethod(method);
    setProcessingPayment(true);

    try {
      // Mock Paystack integration
      if (method === 'paystack') {
        // Initialize Paystack payment
        const handler = window.PaystackPop.setup({
          key: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY || 'pk_test_your_paystack_public_key', // Use environment variable
          email: user.email,
          amount: totalOwed * 100, // Paystack uses amount in kobo/cents
          currency: 'GHS',
          callback: function(response) {
            toast.success('Payment successful!');
            // In production, you would verify the payment on your backend
            setProcessingPayment(false);
            setSelectedPaymentMethod('');
          },
          onClose: function() {
            toast.error('Payment cancelled');
            setProcessingPayment(false);
            setSelectedPaymentMethod('');
          }
        });
        handler.openIframe();
      } else {
        // Mock mobile money payment
        setTimeout(() => {
          toast.success(`${method} payment initiated successfully!`);
          setProcessingPayment(false);
          setSelectedPaymentMethod('');
        }, 2000);
      }
    } catch (error) {
      toast.error('Payment failed. Please try again.');
      setProcessingPayment(false);
      setSelectedPaymentMethod('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Monthly Dues</h1>
          <p className="mt-2 text-gray-600">Manage your monthly membership dues</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0 p-3 bg-green-100 rounded-lg">
                <BanknotesIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Paid</p>
                <p className="text-2xl font-bold text-gray-900">GHC {totalPaid}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0 p-3 bg-red-100 rounded-lg">
                <CalendarIcon className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Outstanding</p>
                <p className="text-2xl font-bold text-gray-900">GHC {totalOwed}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0 p-3 bg-blue-100 rounded-lg">
                <CreditCardIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Monthly Dues</p>
                <p className="text-2xl font-bold text-gray-900">GHC 50</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Section */}
        {totalOwed > 0 && (
          <div className="card mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pay Outstanding Dues</h3>
            <div className="mb-4">
              <p className="text-gray-600">You have GHC {totalOwed} in outstanding dues. Select a payment method to proceed:</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={() => handlePayment('mtn')}
                disabled={processingPayment}
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-yellow-400 hover:bg-yellow-50 transition-colors disabled:opacity-50"
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-yellow-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-white font-bold">MTN</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900">MTN MoMo</p>
                </div>
              </button>

              <button
                onClick={() => handlePayment('telecel')}
                disabled={processingPayment}
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors disabled:opacity-50"
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-white font-bold">T</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900">Telecel Cash</p>
                </div>
              </button>

              <button
                onClick={() => handlePayment('at')}
                disabled={processingPayment}
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors disabled:opacity-50"
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-white font-bold">AT</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900">AT Payment</p>
                </div>
              </button>

              <button
                onClick={() => handlePayment('paystack')}
                disabled={processingPayment}
                className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-colors disabled:opacity-50"
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <CreditCardIcon className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-sm font-medium text-gray-900">Card/Bank</p>
                </div>
              </button>
            </div>

            {processingPayment && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">Processing payment... Please wait.</p>
              </div>
            )}
          </div>
        )}

        {/* Dues History */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment History</h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Month
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Method
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {duesHistory.map((due) => (
                  <tr key={due.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {due.month}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      GHC {due.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        due.status === 'paid' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {due.status === 'paid' ? 'Paid' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {due.date || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {due.method || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment Information */}
        <div className="mt-8 card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h3>
          <div className="prose max-w-none text-gray-600">
            <p className="mb-4">
              Monthly dues of GHC 50 are required to maintain your active membership status. 
              These funds support various association activities and welfare programs.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Payment Methods Available:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>MTN Mobile Money (MoMo)</li>
                <li>Telecel Cash</li>
                <li>AT Payment</li>
                <li>Credit/Debit Cards (via Paystack)</li>
                <li>Bank Transfer</li>
              </ul>
            </div>
            <p className="mt-4 text-sm">
              For any payment issues or questions, please contact the association treasurer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dues;
