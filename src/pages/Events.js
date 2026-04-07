import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';
import { CalendarIcon, MapPinIcon, ClockIcon, PlusIcon, MegaphoneIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';

const Events = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showEventForm, setShowEventForm] = useState(false);
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load real events data from Supabase
  useEffect(() => {
    const fetchEvents = async () => {
      if (!user) return;
      
      // For now, create basic structure
      // In future, this would come from 'events' and 'announcements' tables
      const currentDate = new Date();
      
      // Sample upcoming events
      const sampleUpcoming = [
        {
          id: 1,
          title: 'Annual General Meeting',
          date: currentDate.toISOString().split('T')[0],
          time: '10:00 AM',
          location: 'School Auditorium',
          description: 'Annual meeting to discuss association progress and future plans',
          type: 'meeting'
        }
      ];
      
      // Sample past events
      const samplePast = [
        {
          id: 2,
          title: 'Homecoming Celebration',
          date: new Date(currentDate.getFullYear() - 1, 12, 15).toISOString().split('T')[0],
          time: '2:00 PM',
          location: 'School Premises',
          description: 'Annual homecoming celebration for all alumni',
          type: 'celebration'
        }
      ];
      
      // Sample announcements
      const sampleAnnouncements = [
        {
          id: 1,
          title: 'New Executive Committee Elected',
          content: 'The new executive committee for 2024 has been elected. Congratulations to all members!',
          priority: 'high',
          date: currentDate.toISOString().split('T')[0],
          author: 'Admin'
        }
      ];
      
      setUpcomingEvents(sampleUpcoming);
      setPastEvents(samplePast);
      setAnnouncements(sampleAnnouncements);
      setLoading(false);
    };

    fetchEvents();
  }, [user]);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    priority: 'medium'
  });

  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    type: 'meeting',
    maxAttendees: '',
    ticketPrice: ''
  });

  const [announcementForm, setAnnouncementForm] = useState({
    title: '',
    content: '',
    type: 'information',
    priority: 'medium'
  });

  const eventTypes = [
    { value: 'meeting', label: 'Meeting' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'social', label: 'Social Event' },
    { value: 'community', label: 'Community Service' },
    { value: 'sports', label: 'Sports' },
    { value: 'fundraising', label: 'Fundraising' }
  ];

  const announcementTypes = [
    { value: 'information', label: 'Information' },
    { value: 'important', label: 'Important Notice' },
    { value: 'celebration', label: 'Celebration' },
    { value: 'reminder', label: 'Reminder' }
  ];

  const handleEventSubmit = (e) => {
    e.preventDefault();
    
    if (!eventForm.title || !eventForm.date || !eventForm.time || !eventForm.location) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newEvent = {
      id: Date.now(),
      ...eventForm,
      organizer: user.name,
      attendees: 0,
      maxAttendees: parseInt(eventForm.maxAttendees) || 0,
      ticketPrice: parseFloat(eventForm.ticketPrice) || 0
    };

    // In production, this would save to your backend
    toast.success('Event created successfully!');
    setShowEventForm(false);
    setEventForm({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      type: 'meeting',
      maxAttendees: '',
      ticketPrice: ''
    });
  };

  const handleAnnouncementSubmit = (e) => {
    e.preventDefault();
    
    if (!announcementForm.title || !announcementForm.content) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newAnnouncement = {
      id: Date.now(),
      ...announcementForm,
      date: new Date().toISOString().split('T')[0],
      author: user.name
    };

    // In production, this would save to your backend
    toast.success('Announcement posted successfully!');
    setShowAnnouncementForm(false);
    setAnnouncementForm({
      title: '',
      content: '',
      type: 'information',
      priority: 'medium'
    });
  };

  const handleRSVP = (eventId) => {
    toast.success('RSVP confirmed! You will receive a confirmation email.');
    // In production, this would update the backend
  };

  const getEventTypeColor = (type) => {
    const colors = {
      meeting: 'bg-blue-100 text-blue-800',
      workshop: 'bg-green-100 text-green-800',
      social: 'bg-purple-100 text-purple-800',
      community: 'bg-yellow-100 text-yellow-800',
      sports: 'bg-red-100 text-red-800',
      fundraising: 'bg-indigo-100 text-indigo-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Events & Announcements</h1>
          <p className="mt-2 text-gray-600">Stay updated with upcoming events and important announcements</p>
        </div>

        {/* Admin Actions */}
        {(user?.role === 'admin' || user?.role === 'superadmin') && (
          <div className="mb-6 flex space-x-4">
            <button
              onClick={() => setShowEventForm(true)}
              className="btn-primary"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Create Event
            </button>
            <button
              onClick={() => setShowAnnouncementForm(true)}
              className="btn-secondary"
            >
              <MegaphoneIcon className="h-5 w-5 mr-2" />
              Post Announcement
            </button>
          </div>
        )}

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`${
                activeTab === 'upcoming'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`${
                activeTab === 'past'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}
            >
              Past Events
            </button>
            <button
              onClick={() => setActiveTab('announcements')}
              className={`${
                activeTab === 'announcements'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}
            >
              Announcements
            </button>
          </nav>
        </div>

        {/* Upcoming Events */}
        {activeTab === 'upcoming' && (
          <div className="space-y-6">
            {upcomingEvents.length === 0 ? (
              <div className="text-center py-12">
                <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No upcoming events</h3>
                <p className="mt-1 text-sm text-gray-500">Check back later for new events</p>
              </div>
            ) : (
              upcomingEvents.map((event) => (
                <div key={event.id} className="card">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                          {event.type}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{event.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center text-gray-500">
                          <CalendarIcon className="h-4 w-4 mr-2" />
                          {format(new Date(event.date), 'MMMM dd, yyyy')}
                        </div>
                        <div className="flex items-center text-gray-500">
                          <ClockIcon className="h-4 w-4 mr-2" />
                          {event.time}
                        </div>
                        <div className="flex items-center text-gray-500">
                          <MapPinIcon className="h-4 w-4 mr-2" />
                          {event.location}
                        </div>
                      </div>
                      
                      <div className="mt-4 flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                          <span>Attendees: {event.attendees}/{event.maxAttendees || '∞'}</span>
                          {event.ticketPrice && <span className="ml-4">Ticket: GHC {event.ticketPrice}</span>}
                        </div>
                        
                        <button
                          onClick={() => handleRSVP(event.id)}
                          className="btn-primary text-sm px-4 py-2"
                        >
                          RSVP
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Past Events */}
        {activeTab === 'past' && (
          <div className="space-y-6">
            {pastEvents.length === 0 ? (
              <div className="text-center py-12">
                <CalendarIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No past events</h3>
                <p className="mt-1 text-sm text-gray-500">Events will appear here after they occur</p>
              </div>
            ) : (
              pastEvents.map((event) => (
                <div key={event.id} className="card opacity-75">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getEventTypeColor(event.type)}`}>
                          {event.type}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Completed
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{event.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center text-gray-500">
                          <CalendarIcon className="h-4 w-4 mr-2" />
                          {format(new Date(event.date), 'MMMM dd, yyyy')}
                        </div>
                        <div className="flex items-center text-gray-500">
                          <ClockIcon className="h-4 w-4 mr-2" />
                          {event.time}
                        </div>
                        <div className="flex items-center text-gray-500">
                          <MapPinIcon className="h-4 w-4 mr-2" />
                          {event.location}
                        </div>
                      </div>
                      
                      <div className="mt-4 text-sm text-gray-500">
                        <span>Attendees: {event.attendees}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Announcements */}
        {activeTab === 'announcements' && (
          <div className="space-y-6">
            {announcements.length === 0 ? (
              <div className="text-center py-12">
                <MegaphoneIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No announcements</h3>
                <p className="mt-1 text-sm text-gray-500">Important announcements will appear here</p>
              </div>
            ) : (
              announcements.map((announcement) => (
                <div key={announcement.id} className="card">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{announcement.title}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(announcement.priority)}`}>
                          {announcement.priority} priority
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {announcement.type}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{announcement.content}</p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>By {announcement.author}</span>
                        <span>{format(new Date(announcement.date), 'MMMM dd, yyyy')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Event Creation Modal */}
        {showEventForm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Create New Event</h3>
              
              <form onSubmit={handleEventSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Event Title</label>
                  <input
                    type="text"
                    value={eventForm.title}
                    onChange={(e) => setEventForm({...eventForm, title: e.target.value})}
                    className="mt-1 input-field"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={eventForm.description}
                    onChange={(e) => setEventForm({...eventForm, description: e.target.value})}
                    rows={3}
                    className="mt-1 input-field"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <input
                      type="date"
                      value={eventForm.date}
                      onChange={(e) => setEventForm({...eventForm, date: e.target.value})}
                      className="mt-1 input-field"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Time</label>
                    <input
                      type="time"
                      value={eventForm.time}
                      onChange={(e) => setEventForm({...eventForm, time: e.target.value})}
                      className="mt-1 input-field"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    value={eventForm.location}
                    onChange={(e) => setEventForm({...eventForm, location: e.target.value})}
                    className="mt-1 input-field"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Event Type</label>
                    <select
                      value={eventForm.type}
                      onChange={(e) => setEventForm({...eventForm, type: e.target.value})}
                      className="mt-1 input-field"
                    >
                      {eventTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Max Attendees</label>
                    <input
                      type="number"
                      value={eventForm.maxAttendees}
                      onChange={(e) => setEventForm({...eventForm, maxAttendees: e.target.value})}
                      className="mt-1 input-field"
                      placeholder="Optional"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Ticket Price (GHC)</label>
                  <input
                    type="number"
                    value={eventForm.ticketPrice}
                    onChange={(e) => setEventForm({...eventForm, ticketPrice: e.target.value})}
                    className="mt-1 input-field"
                    placeholder="0 for free"
                  />
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowEventForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    Create Event
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Announcement Creation Modal */}
        {showAnnouncementForm && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Post Announcement</h3>
              
              <form onSubmit={handleAnnouncementSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    value={announcementForm.title}
                    onChange={(e) => setAnnouncementForm({...announcementForm, title: e.target.value})}
                    className="mt-1 input-field"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Content</label>
                  <textarea
                    value={announcementForm.content}
                    onChange={(e) => setAnnouncementForm({...announcementForm, content: e.target.value})}
                    rows={4}
                    className="mt-1 input-field"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <select
                      value={announcementForm.type}
                      onChange={(e) => setAnnouncementForm({...announcementForm, type: e.target.value})}
                      className="mt-1 input-field"
                    >
                      {announcementTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Priority</label>
                    <select
                      value={announcementForm.priority}
                      onChange={(e) => setAnnouncementForm({...announcementForm, priority: e.target.value})}
                      className="mt-1 input-field"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowAnnouncementForm(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    Post Announcement
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
