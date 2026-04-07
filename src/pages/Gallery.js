import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';
import { PhotoIcon, VideoCameraIcon, MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';

const Gallery = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('photos');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Mock data - in production, this would come from your API
  const photos = [
    {
      id: 1,
      title: 'Annual Reunion 2024',
      category: 'events',
      date: '2024-02-15',
      url: 'https://via.placeholder.com/400x300?text=Reunion+2024',
      description: 'Our annual reunion event with over 100 members'
    },
    {
      id: 2,
      title: 'Graduation Ceremony',
      category: 'ceremonies',

  // Load real gallery data from Supabase
  useEffect(() => {
    const fetchGallery = async () => {
      if (!user) return;
      
      // For now, create basic structure
      // In future, this would come from 'gallery' table in Supabase
      const samplePhotos = [
        {
          id: 1,
          title: 'School Campus',
          category: 'events',
          date: new Date().toISOString().split('T')[0],
          thumbnailUrl: 'https://via.placeholder.com/400x300?text=Campus',
          fullSizeUrl: 'https://via.placeholder.com/800x600?text=Campus',
          description: 'Beautiful view of our school campus'
        },
        {
          id: 2,
          title: 'Graduation Ceremony',
          category: 'ceremonies',
          date: new Date().toISOString().split('T')[0],
          thumbnailUrl: 'https://via.placeholder.com/400x300?text=Graduation',
          fullSizeUrl: 'https://via.placeholder.com/800x600?text=Graduation',
          description: 'Celebrating our members\' achievements'
        },
        {
          id: 3,
          title: 'Sports Day',
          category: 'sports',
          date: new Date().toISOString().split('T')[0],
          thumbnailUrl: 'https://via.placeholder.com/400x300?text=Sports+Day',
          fullSizeUrl: 'https://via.placeholder.com/800x600?text=Sports+Day',
          description: 'Annual sports competition'
        },
        {
          id: 4,
          title: 'Community Service',
          category: 'community',
          date: new Date().toISOString().split('T')[0],
          thumbnailUrl: 'https://via.placeholder.com/400x300?text=Community+Service',
          fullSizeUrl: 'https://via.placeholder.com/800x600?text=Community+Service',
          description: 'Giving back to the community'
        },
        {
          id: 5,
          title: 'Christmas Party',
          category: 'events',
          date: new Date().toISOString().split('T')[0],
          thumbnailUrl: 'https://via.placeholder.com/400x300?text=Christmas+Party',
          fullSizeUrl: 'https://via.placeholder.com/800x600?text=Christmas+Party',
          description: 'End of year celebration'
        },
        {
          id: 6,
          title: 'Career Day',
          category: 'education',
          date: new Date().toISOString().split('T')[0],
          thumbnailUrl: 'https://via.placeholder.com/400x300?text=Career+Day',
          fullSizeUrl: 'https://via.placeholder.com/800x600?text=Career+Day',
          description: 'Career guidance for current students'
        }
      ];
      
      const sampleVideos = [
        {
          id: 1,
          title: 'POSA Documentary 2024',
          category: 'documentary',
          date: new Date().toISOString().split('T')[0],
          thumbnailUrl: 'https://via.placeholder.com/400x300?text=Documentary',
          videoUrl: 'https://example.com/video1',
          duration: '15:30',
          description: 'A documentary about our association\'s impact'
        },
        {
          id: 2,
          title: 'Annual Meeting Highlights',
          category: 'meetings',
          date: new Date().toISOString().split('T')[0],
          thumbnailUrl: 'https://via.placeholder.com/400x300?text=Meeting+Highlights',
          videoUrl: 'https://example.com/video2',
          duration: '8:45',
          description: 'Key moments from our annual general meeting'
        },
        {
          id: 3,
          title: 'Member Testimonials',
          category: 'testimonials',
          date: new Date().toISOString().split('T')[0],
          thumbnailUrl: 'https://via.placeholder.com/400x300?text=Testimonials',
          videoUrl: 'https://example.com/video3',
          duration: '12:20',
          description: 'Members share their experiences'
        }
      ];
      
      setPhotos(samplePhotos);
      setVideos(sampleVideos);
      setLoading(false);
    };

    fetchGallery();
  }, [user]);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'events', label: 'Events' },
    { value: 'ceremonies', label: 'Ceremonies' },
    { value: 'sports', label: 'Sports' },
    { value: 'community', label: 'Community' },
    { value: 'education', label: 'Education' }
  ];

  const videoCategories = [
    { value: 'all', label: 'All Categories' },
    { value: 'documentary', label: 'Documentary' },
    { value: 'meetings', label: 'Meetings' },
    { value: 'testimonials', label: 'Testimonials' }
  ];

  const filteredPhotos = photos.filter(photo => {
    const matchesSearch = photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         photo.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || photo.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleUpload = (type) => {
    if (user?.role !== 'admin' && user?.role !== 'superadmin') {
      toast.error('Only admins can upload content');
      return;
    }
    toast.success(`Upload ${type} feature coming soon!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Gallery</h1>
          <p className="mt-2 text-gray-600">Browse photos and videos from our events and activities</p>
        </div>

        {/* Upload Button for Admins */}
        {(user?.role === 'admin' || user?.role === 'superadmin') && (
          <div className="mb-6">
            <button
              onClick={() => handleUpload(activeTab)}
              className="btn-primary"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Upload {activeTab === 'photos' ? 'Photos' : 'Videos'}
            </button>
          </div>
        )}

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('photos')}
              className={`${
                activeTab === 'photos'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <PhotoIcon className="h-5 w-5 mr-2" />
              Photos
            </button>
            <button
              onClick={() => setActiveTab('videos')}
              className={`${
                activeTab === 'videos'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <VideoCameraIcon className="h-5 w-5 mr-2" />
              Videos
            </button>
          </nav>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search gallery..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>
          </div>
          
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
            >
              {(activeTab === 'photos' ? categories : videoCategories).map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Photos Grid */}
        {activeTab === 'photos' && (
          <div>
            {filteredPhotos.length === 0 ? (
              <div className="text-center py-12">
                <PhotoIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No photos found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPhotos.map((photo) => (
                  <div key={photo.id} className="card overflow-hidden">
                    <div className="aspect-w-16 aspect-h-12 bg-gray-200">
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-gray-900">{photo.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{photo.description}</p>
                      <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
                        <span>{photo.date}</span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                          {photo.category}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Videos Grid */}
        {activeTab === 'videos' && (
          <div>
            {filteredVideos.length === 0 ? (
              <div className="text-center py-12">
                <VideoCameraIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No videos found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVideos.map((video) => (
                  <div key={video.id} className="card overflow-hidden">
                    <div className="relative aspect-w-16 aspect-h-12 bg-gray-200">
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                          <VideoCameraIcon className="h-6 w-6 text-gray-900" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-gray-900">{video.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{video.description}</p>
                      <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
                        <span>{video.date}</span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                          {video.category}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Gallery Statistics */}
        <div className="mt-8 card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Gallery Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">{photos.length}</div>
              <div className="text-sm text-gray-600">Total Photos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary-600">{videos.length}</div>
              <div className="text-sm text-gray-600">Total Videos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {new Set([...photos, ...videos].map(item => item.category)).size}
              </div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">2024</div>
              <div className="text-sm text-gray-600">Latest Year</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
