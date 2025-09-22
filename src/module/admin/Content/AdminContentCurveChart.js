import React, { useState, useEffect } from "react";
import { Pie } from "@ant-design/plots";
import axios from "axios";
import { publicPort } from "components/url/link";

const AdminContentCurveChart = () => {
  const [data, setData] = useState([
    {
      type: "Online",
      value: 33.33,
    },
    {
      type: "Hoàn thành",
      value: 33.33,
    },
    {
      type: "Hủy",
      value: 33.33,
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from the API
    axios.get(publicPort + "api/count-in-current-month")
      .then(response => {
        // Validate response data
        if (response.data && typeof response.data === 'object') {
          const { online, completed, cancel } = response.data;
          
          // Ensure values are numbers and not undefined/null
          const safeOnline = typeof online === 'number' ? online : 0;
          const safeCompleted = typeof completed === 'number' ? completed : 0;
          const safeCancel = typeof cancel === 'number' ? cancel : 0;
          
          // Update the state with the new data
          setData([
            {
              type: "Online",
              value: safeOnline,
            },
            {
              type: "Hoàn thành",
              value: safeCompleted,
            },
            {
              type: "Hủy",
              value: safeCancel,
            },
          ]);
        } else {
          // Keep default data if API response is invalid
          console.warn("Dữ liệu không hợp lệ, sử dụng dữ liệu mặc định");
        }
      })
      .catch(error => {
        console.error("Lỗi khi tải dữ liệu:", error);
        setError("Không thể tải dữ liệu thống kê");
        // Keep default data on error
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="w-[100%] flex justify-center items-center h-96">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Đang tải dữ liệu thống kê...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-[100%] flex justify-center items-center h-96">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-2">⚠️</div>
          <p className="text-red-600 font-medium">Có lỗi xảy ra khi tải dữ liệu thống kê</p>
          <p className="text-gray-600 text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
    // Disable animation to prevent errors
    animation: false,
  };
  
  return (
    <div className="w-[100%] flex justify-center items-center">
      <div className="w-[90%] bg-white rounded-lg shadow-sm p-4">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Thống kê tháng hiện tại
          </h3>
          <p className="text-sm text-gray-600">
              Tỷ lệ Online, Hoàn thành và Hủy
          </p>
        </div>
        <Pie {...config} />
      </div>
    </div>
  );
};

export default AdminContentCurveChart;
