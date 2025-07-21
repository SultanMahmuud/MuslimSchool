'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CourseCard from '@/components/Shared/CourseCard/CourseCard';
import { Button } from '@/components/UI/button';



// Static sample data
const featuredCourses = [
  { title: 'Learn Quranic Arabic', badge: 'Popular' },
  { title: 'Introduction to Hadith', badge: null },
  { title: 'Islamic Theology', badge: null },
];

const chips = ['Tajweed', 'Hadith', 'Arabic', 'Kids', 'Adults'];

export default function AllCourses() {
  const [search, setSearch] = useState('');
  const [activeChip, setActiveChip] = useState('');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all courses from API
  useEffect(() => {
    setLoading(true);
    axios
      .get('https://api.qawmiuniversity.com/course')
      .then((res) => {
        setCourses(res.data.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Filtered courses (by search and chip)
  const filteredCourses = courses?.filter((course) => {
    const matchSearch = course?.title
      ?.toLowerCase()
      ?.includes(search.toLowerCase());
    const matchChip = !activeChip || course?.title?.toLowerCase().includes(activeChip.toLowerCase());
    return matchSearch && matchChip;
  });

  return (
    <>
   
      <section className="px-4 py-8 max-w-5xl mx-auto">
        {/* Featured Courses */}
        <h2 className="text-3xl font-semibold text-center mb-6">Featured Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {featuredCourses.map((course, idx) => (
            <div
              key={`featured-${idx}`}
              className="relative rounded-2xl p-6 h-56 flex items-end"
              style={{
                background: 'linear-gradient(to bottom, #6CCFAD, #3A8D56)',
              }}
            >
              {course.badge && (
                <span
                  className={`absolute top-4 left-4 px-3 py-1 text-sm font-medium rounded-full ${
                    course.badge === 'Popular'
                      ? 'bg-yellow-400 text-white'
                      : 'bg-red-500 text-white'
                  }`}
                >
                  {course.badge}
                </span>
              )}
              <h3 className="text-white text-xl font-bold">{course.title}</h3>
            </div>
          ))}
        </div>

        {/* Search + Filter */}
        <h2 className="text-3xl font-semibold text-center mb-2">Join Thousands of Learners</h2>
        <p className="text-center text-gray-600 mb-4">Browse by topic or search</p>

        {/* Chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {chips.map((chip,i) => (
            <Button
              key={i}
              onClick={() => setActiveChip(activeChip === chip ? '' : chip)}
              className={`px-4 py-1 rounded-full border transition ${
                activeChip === chip
                  ? 'bg-green-100 border-green-400 text-green-800'
                  : 'bg-white border-gray-300 text-gray-800'
              }`}
            >
              {chip}
            </Button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, idx) => (
                <p>loading</p>
              ))
            : filteredCourses.length > 0
            ? filteredCourses.map((course, _id) => (
                <CourseCard key={_id} course={course} loading={false} />
              ))
            : (
              <p className="text-center text-gray-500 col-span-full">
                No courses found.
              </p>
            )}
        </div>
      </section>
      
    </>
  );
}
