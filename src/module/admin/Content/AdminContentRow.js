import React, { useState, useEffect } from "react";
import { Column } from "@ant-design/plots";
import axios from "axios";
import { publicPort } from "components/url/link";

const AdminContentRow = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get(`${publicPort}api/countByDoctorOfData`);
        
        // Kiểm tra xem response có data không
        if (response.data && Array.isArray(response.data)) {
          const newData = response.data.map((item, index) => ({
            Type: item.type || 'Unknown Type',
            Name: item.name || `Item ${index + 1}`,
            Number: typeof item.number === 'number' ? item.number : 0,
          }));
          setData(newData);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.response?.data?.message || error.message || 'Có lỗi xảy ra khi tải dữ liệu');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const config = {
    data,
    isGroup: true,
    xField: "Name",
    yField: "Number",
    seriesField: "Type",
    height: 400, // Đặt chiều cao cố định
    autoFit: true, // Tự động điều chỉnh kích thước
    label: {
      position: "middle",
      layout: [
        {
          type: "interval-adjust-position",
        },
        {
          type: "interval-hide-overlap",
        },
        {
          type: "adjust-color",
        },
      ],
    },
    // Thêm các tùy chọn để cải thiện UI
    columnStyle: {
      radius: [2, 2, 0, 0], // Bo tròn góc trên
    },
    color: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd'], // Màu sắc tùy chỉnh
    tooltip: {
      formatter: (datum) => {
        return {
          name: datum.Type,
          value: `${datum.Number} bác sĩ`,
        };
      },
    },
    // Thêm animation
    animation: {
      appear: {
        animation: 'grow-in-y',
        duration: 1000,
      },
    },
  };

  // Loading state
  if (loading) {
    return (
      <div className="w-[100%] flex justify-center items-center h-96">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
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
          <p className="text-red-600 font-medium">Có lỗi xảy ra</p>
          <p className="text-gray-600 text-sm mt-1">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  // No data state
  if (!data || data.length === 0) {
    return (
      <div className="w-[100%] flex justify-center items-center h-96">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">📊</div>
          <p className="text-gray-600 font-medium">Không có dữ liệu</p>
          <p className="text-gray-500 text-sm mt-1">Hiện tại chưa có thông tin thống kê</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[100%] flex justify-center items-center">
      <div className="w-[90%] bg-white rounded-lg shadow-sm p-4">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Thống kê số liệu theo bác sĩ
          </h3>
          <p className="text-sm text-gray-600">
            Hiển thị dữ liệu phân loại theo từng loại và bác sĩ
          </p>
        </div>
        <Column {...config} />
      </div>
    </div>
  );
};

export default AdminContentRow;