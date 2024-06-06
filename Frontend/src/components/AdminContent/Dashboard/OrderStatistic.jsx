import { Card, Divider, Typography } from "@mui/material";
import { useEffect, useState } from 'react';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import axios from 'axios';
import { useAuth } from "../../../contexts/AuthContext";
import { getCurrentWeekDates, getPreviousWeekDates } from "../../../utils/weeklyUtils";

export default function OrderStatistic() {
  const { authToken } = useAuth();
  const [currentWeekOrderCount, setCurrentWeekOrderCount] = useState(0);
  const [previousWeekOrderCount, setPreviousWeekOrderCount] = useState(0);
  const [orderChangePercentage, setOrderChangePercentage] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('https://localhost:7249/api/Order/admin', {
          headers: {
            'accept': '*/*',
            'Authorization': `Bearer ${authToken}`
          }
        });

        const orders = response.data.data;

        // Menghitung rentang tanggal untuk minggu ini dan minggu sebelumnya
        const { start: currentWeekStart, end: currentWeekEnd } = getCurrentWeekDates();
        const { start: previousWeekStart, end: previousWeekEnd } = getPreviousWeekDates();

        const currentWeekOrders = orders.filter(order => {
          const orderDate = new Date(order.orderDate);
          return orderDate >= currentWeekStart && orderDate <= currentWeekEnd;
        });

        const previousWeekOrders = orders.filter(order => {
          const orderDate = new Date(order.orderDate);
          return orderDate >= previousWeekStart && orderDate <= previousWeekEnd;
        });

        setCurrentWeekOrderCount(currentWeekOrders.length);
        setPreviousWeekOrderCount(previousWeekOrders.length);

        const changePercentage = ((currentWeekOrders.length - previousWeekOrders.length) / previousWeekOrders.length) * 100;
        setOrderChangePercentage(changePercentage);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Card sx={{ p: 2, borderRadius: 3 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
          Pesanan Minggu Ini
        </Typography>
      </div >
      <Divider sx={{ backgroundColor: 'white' }} />
      <Typography variant='h4' sx={{ marginBottom: 1, fontWeight: 'bold' }}>
        {currentWeekOrderCount}
      </Typography>
      <Typography variant='body1' sx={{ fontStyle: 'italic', display: 'flex' }}>
        {orderChangePercentage >= 0 ? (
          <ArrowDropUpIcon sx={{ color: '#00ff00' }} />
        ) : (
          <ArrowDropDownIcon sx={{ color: '#ff0000' }} />
        )}
        {Math.abs(orderChangePercentage).toFixed(2)}% dari minggu lalu
      </Typography>
    </Card>
  );
}
