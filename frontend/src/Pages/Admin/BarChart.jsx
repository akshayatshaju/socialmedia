import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import axiosInstanceAdmin from "../../utils/axiosInstanceAdmin";
import { baseUrl } from "../../utils/Constants";
import AdminNav from "../../Components/AdminNav";
import AdminSide from "../../Components/AdminSide";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      try {
        const response = await axiosInstanceAdmin.get(`${baseUrl}myAdmin/graph`);
        if (response.status === 200) {
          setChartData(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    };

    fetchChartData();
  }, []);

  const data = {
    labels: chartData.map((item) => item.joining_month),
    datasets: [{
      label: 'User Count',
      data: chartData.map((item) => item.user_count),
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(153, 102, 255, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(153, 102, 255, 1)',
    }]
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 16
          },
          color: '#4B5563'
        }
      },
      title: {
        display: true,
        text: 'User Joining Month Statistics',
        font: {
          size: 24
        },
        color: '#1F2937'
      },
      tooltip: {
        backgroundColor: '#4B5563',
        titleColor: '#fff',
        bodyColor: '#fff',
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#4B5563'
        },
        grid: {
          display: false
        }
      },
      y: {
        ticks: {
          color: '#4B5563'
        },
        grid: {
          color: '#D1D5DB'
        }
      }
    }
  };

  return (
    <div className='admin'>
      <AdminNav />
      <div className="flex flex-col lg:flex-row">
        <AdminSide />
        <div className="lg:w-3/4 p-4">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <div className="bg-white p-5 rounded-lg shadow-md" style={{ maxWidth: '800px', margin: 'auto', border: '2px solid #E5E7EB' }}>
              <Line data={data} height={400} options={options} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BarChart;
