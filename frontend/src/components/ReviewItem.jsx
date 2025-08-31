import React from 'react';

const ReviewItem = ({ review }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const StarDisplay = ({ rating }) => {
    return (
      <div className="flex flex-wrap items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span 
            key={star}
            className={`text-base sm:text-lg ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          >
            ★
          </span>
        ))}
        <span className="ml-2 text-xs sm:text-sm text-gray-600">({rating}/5)</span>
      </div>
    );
  };

  return (
    <div className="border border-gray-200 rounded-lg p-3 sm:p-4 bg-white shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-2">
        {/* Left: user + stars */}
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h4 className="font-medium text-gray-900 text-sm sm:text-base">
              {review.userName}
            </h4>
            {review.isVerifiedPurchase && (
              <span className="bg-green-100 text-green-800 text-[10px] sm:text-xs px-2 py-0.5 rounded-full">
                ✓ Verified Purchase
              </span>
            )}
          </div>
          <StarDisplay rating={review.rating} />
        </div>

        {/* Right: date */}
        <div className="text-xs sm:text-sm text-gray-500">
          {formatDate(review.date)}
        </div>
      </div>

      {/* Review Content */}
      <div className="text-gray-700 leading-relaxed text-sm sm:text-base break-words">
        {review.comment}
      </div>
    </div>
  );
};

export default ReviewItem;
