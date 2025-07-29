// Updated React component with API integration
import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, User, RefreshCw } from 'lucide-react';

const HealthcareReviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  // API Configuration
  const API_BASE_URL = 'http://localhost:8080/api/reviews';

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/recent`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setReviews(data.reviews);
        setAverageRating(data.averageRating);
        setTotalCount(data.totalCount);
        setError(null);
      } else {
        throw new Error(data.message || 'Failed to fetch reviews');
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError('Failed to load reviews. Please try again.');
      // Fallback to empty array or show error state
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 14) return '1 week ago';
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) > 1 ? 's' : ''} ago`;
  };

  const nextSlide = () => {
    if (reviews.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }
  };

  const prevSlide = () => {
    if (reviews.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
    }
  };

  useEffect(() => {
    if (isAutoPlaying && reviews.length > 0) {
      const interval = setInterval(nextSlide, 4000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, isAutoPlaying, reviews.length]);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={`${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const getVisibleReviews = () => {
    if (reviews.length === 0) return [];

    const visibleReviews = [];
    for (let i = 0; i < Math.min(3, reviews.length); i++) {
      const index = (currentIndex + i) % reviews.length;
      visibleReviews.push(reviews[index]);
    }
    return visibleReviews;
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-lg">
        <div className="text-center">
          <RefreshCw className="animate-spin mx-auto mb-4" size={48} />
          <p className="text-gray-600">Loading reviews...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-red-50 to-white rounded-xl shadow-lg">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchReviews}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className=" mx-auto p-10 bg-gradient-to-br from-blue-50 to-white shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Patient Reviews</h2>
        <p className="text-gray-600">See what our doctors are saying about their healthcare experience</p>
        <div className="flex items-center justify-center mt-4 space-x-2">
          <div className="flex">{renderStars(Math.round(averageRating))}</div>
          <span className="text-gray-700 font-semibold">{averageRating} out of 5</span>
          <span className="text-gray-500">({totalCount} reviews)</span>
        </div>
      </div>

      {reviews.length > 0 ? (
        <>
          <div
            className="relative overflow-hidden"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {reviews.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
                >
                  <ChevronLeft size={24} className="text-gray-600" />
                </button>

                <button
                  onClick={nextSlide}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
                >
                  <ChevronRight size={24} className="text-gray-600" />
                </button>
              </>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6  m-4">
              {getVisibleReviews().map((review, index) => (
                <div
                  key={`${review.id}-${currentIndex}`}
                  className={`bg-white rounded-lg p-6 shadow-md border border-gray-200 transform transition-all duration-500 hover:shadow-lg hover:-translate-y-1 ${index === 1 ? 'md:scale-103 md:shadow-xl' : ''
                    }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <User size={20} className="text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{review.name}</h4>
                        <p className="text-sm text-gray-500">{formatDate(review.date)}</p>
                      </div>
                    </div>
                    {review.verified && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Verified
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 mb-3">
                    <div className="flex">{renderStars(review.rating)}</div>
                    <span className="text-sm font-medium text-gray-700">{review.rating}.0</span>
                  </div>

                  <div className="mb-3">
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {review.service}
                    </span>
                  </div>

                  <p className="text-gray-700 text-sm leading-relaxed">{review.review}</p>
                </div>
              ))}
            </div>
          </div>

          {reviews.length > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${index === currentIndex ? 'bg-blue-500 w-6' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600">No reviews available at the moment.</p>
        </div>
      )}

      <div className="text-center mt-6">
        <button
          onClick={fetchReviews}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 mr-4"
        >
          Refresh Reviews
        </button>
      </div>
    </div>
  );
};

export default HealthcareReviews;