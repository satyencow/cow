import React, { useState, useEffect, useCallback } from 'react';
import {
  Dialog,
  useMediaQuery,
  useTheme,
  Box,

  Fade
} from '@mui/material';
import { useSwipeable } from 'react-swipeable';
import logo1 from '../../Images/brands/logo1.png'
import logo2 from '../../Images/brands/logo2.png'
import logo3 from '../../Images/brands/logo3.png'
import logo4 from '../../Images/brands/logo4.png'
import logo5 from '../../Images/brands/logo5.png'
import logo6 from '../../Images/brands/logo6.png'
import logo7 from '../../Images/brands/logo7.png'
import logo8 from '../../Images/brands/logo8.png'
import logo9 from '../../Images/brands/logo9.png'
import logo10 from '../../Images/brands/logo10.png'
import logo11 from '../../Images/brands/logo11.png'
import logo12 from '../../Images/brands/logo12.png'
import logo13 from '../../Images/brands/logo13.png'
import logo14 from '../../Images/brands/logo14.png'
import logo15 from '../../Images/brands/logo15.png'
import logo16 from '../../Images/brands/logo16.png'
import logo17 from '../../Images/brands/logo17.png'
import logo18 from '../../Images/brands/logo18.png'

export default function BrandsCarouselDialog({ open, onClose }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8, logo9, logo10, logo11, logo12, logo13, logo14, logo15, logo16, logo17, logo18];
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const handlePrev = useCallback(() => {
    setFade(false);
    setTimeout(() => {
      setIndex(prev => (prev + logos.length - 1) % logos.length);
      setFade(true);
    }, 200);
  }, [logos.length]);

  const handleNext = useCallback(() => {
    setFade(false);
    setTimeout(() => {
      setIndex(prev => (prev + 1) % logos.length);
      setFade(true);
    }, 200);
  }, [logos.length]);

  useEffect(() => {
    if (!open) {
      setIndex(0);
      return;
    }

    const interval = setInterval(() => {
      handleNext();
    }, 1200); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [open, handleNext]);

  useEffect(() => {
    if (!open) return;
    const handleKey = e => {
      if (e.key === 'ArrowLeft') handlePrev();
      else if (e.key === 'ArrowRight') handleNext();
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, handlePrev, handleNext, onClose]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    trackMouse: false,
  });

  const handleImageError = () => {
    console.warn('Failed to load logo:', logos[index]);
  };

  const handlePaperClick = (event) => {
    if (event.target === event.currentTarget) onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
        onClick: handlePaperClick,
      }}
      BackdropProps={{
        sx: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }
      }}
      aria-labelledby="brands-carousel-dialog"
    >
      <Box
        {...swipeHandlers}
        sx={{
          position: 'relative',
          bgcolor: 'rgba(255,255,255,1)',
          borderRadius: 2,
          p: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mx: fullScreen ? 1 : 'auto',
          my: fullScreen ? 2 : 4,
          minHeight: fullScreen ? '50vh' : 'auto',
          overflow: 'hidden',
        }}
      >
        <Fade in={fade} timeout={500} key={index}>
          <Box
            component="img"
            src={logos[index]}
            alt={`Logo ${index + 1}`}
            sx={{
              maxWidth: '80%',
              maxHeight: fullScreen ? '40vh' : '60vh',
              objectFit: 'contain',
              mx: 'auto',
            }}
            onError={handleImageError}
          />
        </Fade>
      </Box>
    </Dialog>
  );
}
