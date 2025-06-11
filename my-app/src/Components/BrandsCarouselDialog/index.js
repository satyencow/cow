import React, { useState, useEffect, useCallback } from 'react';
import {
  Dialog,
  IconButton,
  useMediaQuery,
  useTheme,
  Box,
  Typography
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
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
  // fullScreen on small viewports
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Build an array of logo URLs (public folder)
  // Adjust if your path is different
  const logos = [logo1,logo2,logo3,logo4,logo5,logo6,logo7,logo8,logo9,logo10,logo11,logo12,logo13,logo14,logo15,logo16,logo17,logo18];

  const [index, setIndex] = useState(0);

  // Handlers to move prev/next
  const handlePrev = useCallback(() => {
    setIndex(prev => (prev + logos.length - 1) % logos.length);
  }, [logos.length]);

  const handleNext = useCallback(() => {
    setIndex(prev => (prev + 1) % logos.length);
  }, [logos.length]);

  // Reset index when dialog closes
  useEffect(() => {
    if (!open) {
      setIndex(0);
    }
  }, [open]);

  // Keyboard navigation: ArrowLeft / ArrowRight, Esc to close
  useEffect(() => {
    if (!open) return;
    const handleKey = e => {
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  }, [open, handlePrev, handleNext, onClose]);

  // Swipe handlers for touch devices
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      handleNext();
    },
    onSwipedRight: () => {
      handlePrev();
    },
    trackMouse: false, // set true if you want desktop mouse dragging
  });

  // Optional: handle image load error
  const handleImageError = () => {
    console.warn('Failed to load logo:', logos[index]);
    // You could skip to next automatically, or show placeholder...
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="sm"
      fullWidth
      // Make Paper (dialog background) transparent, and backdrop lightly dim:
      PaperProps={{
        sx: {
          backgroundColor: 'transparent', // transparent so page shows behind
          boxShadow: 'none',              // remove default white shadow
        }
      }}
      BackdropProps={{
        sx: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent black, adjust alpha as desired
        }
      }}
      aria-labelledby="brands-carousel-dialog"
    >
      <Box
        {...swipeHandlers}
        sx={{
          position: 'relative',
          // Use a semi-transparent panel behind the image so the logo remains legible
          // You can adjust this to more opaque if logos need more contrast.
          bgcolor: 'rgba(255,255,255,0.8)', 
          borderRadius: 2,
          p: 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          // On mobile fullScreen, center vertically but allow some margin so page border shows:
          mx: fullScreen ? 1 : 'auto',
          my: fullScreen ? 2 : 4,
          minHeight: fullScreen ? '50vh' : 'auto',
          overflow: 'hidden',
        }}
      >
        {/* Left arrow */}
        <IconButton
          onClick={handlePrev}
          aria-label="Previous logo"
          sx={{
            position: 'absolute',
            left: 8,
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: 'rgba(0,0,0,0.3)',
            color: 'white',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' },
            zIndex: 10,
          }}
        >
          <ArrowBackIosIcon />
        </IconButton>

        {/* Logo image */}
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

        {/* Right arrow */}
        <IconButton
          onClick={handleNext}
          aria-label="Next logo"
          sx={{
            position: 'absolute',
            right: 8,
            top: '50%',
            transform: 'translateY(-50%)',
            bgcolor: 'rgba(0,0,0,0.3)',
            color: 'white',
            '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' },
            zIndex: 10,
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>

        {/* Slide indicator */}
        <Typography
          variant="body2"
          sx={{
            position: 'absolute',
            bottom: 8,
            color: 'white',
            bgcolor: 'rgba(0,0,0,0.4)',
            px: 1,
            borderRadius: 1,
          }}
        >
          {index + 1} / {logos.length}
        </Typography>
      </Box>
    </Dialog>
  );
}
