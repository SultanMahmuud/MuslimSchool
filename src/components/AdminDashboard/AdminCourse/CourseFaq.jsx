import React, { useEffect, useState } from 'react';
import { MdExpandMore } from 'react-icons/md';


const PaymentFaq = () => {
  const [faqData, setFaqData] = useState([]);
  const [expandedPanel, setExpandedPanel] = useState(0);
console.log(faqData,'faqdata')
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/faq`)
      .then(response => response.json())
      .then(data => {
        const paymentData = data.data.filter(item => item.category === 'পেমেন্ট');
        setFaqData(paymentData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleToggle = index => {
    setExpandedPanel(prev => (prev === index ? null : index));
  };



  const handleEnrollNow = () => {
    // navigate(`/check-out/${data?.singleCourse?.data?._id}`);
  };

  return (
    <div className="mb-12 bg-white p-4 md:p-8 rounded-lg">
      <div>
        {faqData.map((item, index) => (
          <div
            key={index}
            className="mb-2 rounded-md shadow-sm border border-gray-200"
          >
            <button
              className="w-full flex justify-between items-center text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-md transition"
              onClick={() => handleToggle(index)}
            >
              <span className="font-semibold text-[16px] text-gray-800">{item.question}</span>
              <MdExpandMore
                className={`text-xl transform transition-transform ${
                  expandedPanel === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedPanel === index && (
              <div className="px-4 py-3 text-gray-700 text-[16px] font-medium">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        {/* <ButtonStyle
          label="এখনই ভর্তি হোন"
          lg="40%"
          margin="auto"
          onClick={handleEnrollNow}
        /> */}
      </div>
    </div>
  );
};

export default PaymentFaq;
