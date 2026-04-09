import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';
import { PhotoIcon, VideoCameraIcon, MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';

const Gallery = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('photos');
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  // Load real gallery data from Supabase
  useEffect(() => {
    const fetchGallery = async () => {
      if (!user) return;
      
      try {
        // For now, create basic structure until gallery table is created
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
          }
        ];
        
        const sampleVideos = [
          {
            id: 1,
            title: 'School Documentary',
            category: 'documentary',
            date: new Date().toISOString().split('T')[0],
            thumbnailUrl: 'https://via.placeholder.com/400x300?text=Documentary',
            fullSizeUrl: 'https://via.placeholder.com/800x600?text=Documentary',
            description: 'A documentary about our school history',
            duration: '45:00'
          }
        ];
        
        setPhotos(samplePhotos);
        setVideos(sampleVideos);
      } catch (error) {
        console.error('Error fetching gallery:', error);
      } finally {
        setLoading(false);
      }
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

  const handleUploadPhoto = () => {
    toast.success('Photo upload feature coming soon!');
  };

  const handleUploadVideo = () => {
    toast.success('Video upload feature coming soon!');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Gallery</h1>
          
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search photos and videos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-field pl-10"
                />
              </div>
            </div>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-field"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('photos')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'photos'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <PhotoIcon className="h-5 w-5 mr-2 inline" />
                Photos
              </button>
              <button
                onClick={() => setActiveTab('videos')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'videos'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <VideoCameraIcon className="h-5 w-5 mr-2 inline" />
                Videos
              </button>
            </nav>
          </div>
        </div>

        {/* Upload Button */}
        <div className="mb-6">
          <button
            onClick={activeTab === 'photos' ? handleUploadPhoto : handleUploadVideo}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Upload {activeTab === 'photos' ? 'Photo' : 'Video'}
          </button>
        </div>

        {/* Photos Grid */}
        {activeTab === 'photos' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPhotos.map(photo => (
              <div key={photo.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={photo.thumbnailUrl || photo.url}
                  alt={photo.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{photo.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{photo.description}</p>
                  <p className="text-xs text-gray-500">{photo.date}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Videos Grid */}
        {activeTab === 'videos' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredVideos.map(video => (
              <div key={video.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <VideoCameraIcon className="h-12 w-12 text-white" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{video.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{video.description}</p>
                  <p className="text-xs text-gray-500">{video.duration} • {video.date}</p>
                </div>
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
