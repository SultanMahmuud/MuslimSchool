'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import AnalyticsRightbar from '@/components/TeacherDashboard/Analytics/AnalyticsRightbar';



const Analytics = () => {
 
  const [category, setCategory] = useState([]);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState([]);
  const [sumOfQuestionMarks, setSumOfQuestionMarks] = useState(null);
  const [sumOfTotalQuestionMarks, setSumOfTotalQuestionMarks] = useState(null);
const user = {
    email: 'QUT7.liyas@qawmiuniversity.live',
   
  };

  useEffect(() => {
    const marks = [];
    const date = [];
    const total = [];

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/user/questionMarks/${user?.email}`)
      .then((response) => {
        response.data.data.questionMarks.map((item) => {
          marks.push(item?.questionMark);
          date.push(item?.questionSubmittedDate);
          total.push(item?.totalMark);
        });
        setCategory(date);
        setData(marks);
        setTotal(total);

        const sumQuestionTotal = total?.reduce(
          (partialSum, a) => partialSum + a,
          0
        );
        const sumQuestionMarks = marks?.reduce(
          (partialSum, a) => partialSum + a,
          0
        );

        setSumOfTotalQuestionMarks(sumQuestionTotal);
        setSumOfQuestionMarks(sumQuestionMarks);
      })
      .catch((e) => {
        // alert(e);
      });
  }, []);

  return (
    <div className="w-full px-2 md:px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left chart (spans 2/3 columns) */}
        <div className="md:col-span-2 bg-white p-6 rounded-md shadow-md">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Assignments
          </h2>
          <div id="chart">
            <div id="chart-timeline">
              <ReactApexChart
                options={{
                  chart: {
                    id: 'apexchart-example',
                  },
                  xaxis: {
                    categories: category,
                  },
                }}
                series={[
                  {
                    name: 'Marks',
                    data: data,
                  },
                  {
                    name: 'Total',
                    data: total,
                  },
                ]}
                type="area"
                height={350}
              />
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="bg-white p-6 rounded-md shadow-md">
          <AnalyticsRightbar
            
            sumOfQuestionMarks={sumOfQuestionMarks}
            sumOfTotalQuestionMarks={sumOfTotalQuestionMarks}
          />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
