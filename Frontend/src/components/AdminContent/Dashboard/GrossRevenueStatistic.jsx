import { Card, Divider, Typography } from "@mui/material";
import { useEffect, useState } from 'react';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import axios from 'axios';
import { useAuth } from "../../../contexts/AuthContext";
import { getCurrentWeekDates, getPreviousWeekDates } from "../../../utils/weeklyUtils";

export default function RevenueStatistic() {
  const { authToken } = useAuth();
  const [currentWeekRevenue, setCurrentWeekRevenue] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [previousWeekRevenue, setPreviousWeekRevenue] = useState(0);
  const [revenueChangePercentage, setRevenueChangePercentage] = useState(0);

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

        // Filter hanya pesanan dengan status 4
        const statusFourOrders = orders.filter(order => order.orderStatus === 4);

        // Menghitung rentang tanggal untuk minggu ini dan minggu sebelumnya
        const { start: currentWeekStart, end: currentWeekEnd } = getCurrentWeekDates();
        const { start: previousWeekStart, end: previousWeekEnd } = getPreviousWeekDates();

        const currentWeekOrders = statusFourOrders.filter(order => {
          const orderDate = new Date(order.orderDate);
          return orderDate >= currentWeekStart && orderDate <= currentWeekEnd;
        });

        const previousWeekOrders = statusFourOrders.filter(order => {
          const orderDate = new Date(order.orderDate);
          return orderDate >= previousWeekStart && orderDate <= previousWeekEnd;
        });

        const currentWeekRevenue = currentWeekOrders.reduce((total, order) => total + order.totalAmount, 0);
        const previousWeekRevenue = previousWeekOrders.reduce((total, order) => total + order.totalAmount, 0);

        setCurrentWeekRevenue(currentWeekRevenue);
        setPreviousWeekRevenue(previousWeekRevenue);

        const changePercentage = ((currentWeekRevenue - previousWeekRevenue) / previousWeekRevenue) * 100;
        setRevenueChangePercentage(changePercentage);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [authToken]);

  return (
    <Card sx={{ p: 2, bgcolor: '#634C9F', color: 'white', borderRadius: 3 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant='h6' sx={{ fontWeight: 'bold' }}>
          Pendapatan Minggu Ini
        </Typography>
      </div >
      <Divider sx={{ backgroundColor: 'white' }} />
      <Typography variant='h4' sx={{ marginBottom: 1, fontWeight: 'bold' }}>
        {currentWeekRevenue.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
      </Typography>
      <Typography variant='body1' sx={{ fontStyle: 'italic', display: 'flex' }}>
        {revenueChangePercentage >= 0 ? (
          <ArrowDropUpIcon sx={{ color: '#00ff00' }} />
        ) : (
          <ArrowDropDownIcon sx={{ color: '#ff0000' }} />
        )}
        {Math.abs(revenueChangePercentage).toFixed(2)}% dari minggu lalu
      </Typography>
    </Card>
  );
}
