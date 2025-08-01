import React, { useEffect, useState } from 'react';
import AdminFeedbackCard from './AdminFeedbackCard';


const AllFeedback = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/reviews/getReview`)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data?.reverse());
        setIsLoading(false);
      });
  }, [isLoading]);

  return (
    <div>
      {isLoading && 'loading......'}
      <AdminFeedbackCard reviews={reviews} setIsLoading={setIsLoading} />
    </div>
  );
};

export default AllFeedback;
