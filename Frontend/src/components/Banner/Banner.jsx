import { useState, useEffect } from 'react';
import { Button, Paper, Typography, Grid, Box } from '@mui/material';

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const promotions = [
    {
      title: 'Special Offer',
      description: 'Get 20% off on all fruits this weekend!',
      image: 'https://754969b0.rocketcdn.me/grogin/wp-content/uploads/2024/01/slider-05-scaled.jpg',
    },
    {
      title: 'New Arrivals',
      description: 'Check out our fresh produce section!',
      image: 'https://754969b0.rocketcdn.me/grogin/wp-content/uploads/2023/11/slider-03.jpg',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % promotions.length);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + promotions.length) % promotions.length);
  };

  // Function to automatically change slides at a specified interval
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((currentSlide + 1) % promotions.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <>
      {/* <Container component={Paper} maxWidth="lg" sx={{ bgcolor: '#fafafa', borderRadius: 3, padding: 1 }}> */}
      <Paper
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          borderRadius: 3,
          backgroundImage: `url(${promotions[currentSlide].image})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '50&',
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
            color: '#fafafa', // Adjust text color
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h3" sx={{ fontWeight: 'bold' }}>{promotions[currentSlide].title}</Typography>
              <Typography variant="body1">{promotions[currentSlide].description}</Typography>
            </Grid>
            <Grid item xs={6}></Grid>
          </Grid>
        </div>
        <Button
          style={{
            position: 'absolute',
            top: '50%',
            left: '8px',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            color: '#000',
          }}
          onClick={prevSlide}
        >
          &#10094;
        </Button>
        <Button
          style={{
            position: 'absolute',
            top: '50%',
            right: '8px',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            color: '#000',
          }}
          onClick={nextSlide}
        >
          &#10095;
        </Button>
        <Box
          sx={{
            position: 'absolute',
            bottom: '5px',
            left: '50%',
            transform: 'translateX(-50%)',
            transition: 'transform 2s ease-in-out',
            display: 'flex',
          }}
        >
          {promotions.map((_, index) => (
            <Box
              key={index}
              sx={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: index === currentSlide ? '#649' : '#fff',
                margin: '0 5px',
              }}
            />
          ))}
        </Box>
      </Paper>
      {/* </Container> */}
    </>
  );
}