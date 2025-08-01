"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";



const AllPayment = () => {
  const [allPayment, setAllPayment] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        let userString = localStorage.getItem("user");
        if (!userString) {
          throw new Error("User not logged in");
        }
        let user = JSON.parse(userString);

        if (!user?.token) {
          throw new Error("Token not found");
        }

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/surjoPay`,
          config
        );

        const payments = res?.data?.data || [];
        
        setAllPayment(payments.reverse());
      } catch (error) {
        console.error("Failed to fetch payments:", error);
      }
    };

    fetchPayments();
  }, []);

  const columns = [
    "Name",
    "Email",
    "Date",
    "Amount",
    "Method",
    "Order ID",
    "Payment Status",
    "Course Name",
  ];

  const paymentData = allPayment.map(payment => [
    payment?.name || "",
    payment?.email || "",
    DateConversion(payment?.date_time?.split(" ")[0]) || "",
    payment?.amount || "",
    payment?.method || "",
    payment?.order_id || "",
    payment?.sp_massage || "",
    payment?.customer_order_id?.title || "",
  ]);

  // const options = {
  //   setRowProps: (row) => ({
  //     style: { textAlign: 'left' },
  //   }),
  //   selectableRows: false,
  //   pagination: false,
  //   responsive: 'scroll',
  // }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Student Payments</h2>
      {/* <DataTable column={columns} data={paymentData} /> */}
    </div>
  );
};

export default AllPayment;
