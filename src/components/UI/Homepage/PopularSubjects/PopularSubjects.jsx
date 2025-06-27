'use client';
import book from '@/assets/books.png'; // adjust path as needed
import Image from 'next/image';

const staticSubjects = [
  {
    _id: '1',
    title: 'কোরআন শিক্ষা',
    SubTitle: 'সহজ কোরআন শেখার পদ্ধতি',
    image: book,
  },
  {
    _id: '2',
    title: 'হিফজ',
    SubTitle: 'কোরআন মুখস্থ করার কোর্স',
    image: book,
  },
  {
    _id: '3',
    title: 'নাজেরা',
    SubTitle: 'সঠিকভাবে কোরআন তিলাওয়াত',
    image: book,
  },
  {
    _id: '4',
    title: 'হাদিস',
    SubTitle: 'সহীহ হাদিস অধ্যয়ন',
    image: book,
  },
  {
    _id: '5',
    title: 'তাফসীর',
    SubTitle: 'কোরআনের ব্যাখ্যা ও বিশ্লেষণ',
    image: book,
  },
  {
    _id: '6',
    title: 'আরবি ভাষা',
    SubTitle: 'আরবি শেখার মূল কোর্স',
    image: book,
  },
  {
    _id: '7',
    title: 'ইসলামিক ইতিহাস',
    SubTitle: 'ইতিহাসের আলোকে ইসলাম',
    image: book,
  },
  {
    _id: '8',
    title: 'আখলাক ও আদব',
    SubTitle: 'নৈতিক শিক্ষা ও ব্যবহার',
    image: book,
  },
];

const PopularSubjects = () => {
  const isLoading = false; // set true if you want to show loader temporarily

  return (
    <div className="mt-10">
      {isLoading ? (
       <p>Loading</p>
      ) : (
        <div className='max-w-6xl mx-auto'>
          {/* Header */}
          <div className="flex flex-col items-center justify-center mb-6 px-4 text-center">
            <h2 className="hind text-[26px] lg:text-[30px] font-bold text-[#1F2937]">
              জনপ্রিয় বিষয়সমূহ
            </h2>
            <p className="hind text-[18px] sm:text-[15px] lg:text-[20px] font-medium text-[#4B5563] mt-2">
              যেসব বিষয়গুলো ছাত্রদের কাছে সবচেয়ে জনপ্রিয়
            </p>
          </div>

          {/* Grid List */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 px-4">
            {staticSubjects.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-3 p-4 rounded-lg shadow-md bg-white hover:shadow-lg transition-all duration-300"
              >
                <Image
                  src={item.image}
                  alt="Subject"
                  className="w-10 h-10 object-contain"
                />
                <div className="flex flex-col">
                  <p className="hind font-bold text-[16px] md:text-[20px] text-[#1F2937] text-left">
                    {item.title}
                  </p>
                  <p className="inter font-medium text-[14px] md:text-[16px] lg:text-[18px] text-[#4B5563] text-left">
                    {item.SubTitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PopularSubjects;
