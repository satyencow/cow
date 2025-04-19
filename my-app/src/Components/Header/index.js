import React, { useState } from 'react';
import { AppBar, Toolbar, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import './styles.css';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setIsOpen(true);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setIsOpen(false);
  };


 

  return (
    <AppBar
      position="fixed"
      style={{
        backgroundColor: 'transparent',
        boxShadow: 'none',
        transition: 'background-color 0.3s',
      }}
    >
      <Toolbar style={{ marginLeft: 'auto' }}>
        <IconButton style={{ color: 'white' }} edge="end" color="inherit" onClick={handleMenuOpen} className="hamburger">
          <MenuIcon />
        </IconButton>

        <div className="menu-items">
          <Button component={Link} to="/" style={{ color: 'white', fontWeight: 'bolder', fontSize: '13px' }}>
            Home
          </Button>
          <hr style={{ border: '1px solid rgba(28,177,105,0.8)', height: '20px' }} />
          <Button component={Link} to="/about" style={{ color: 'white', fontWeight: 'bolder', fontSize: '13px' }}>
            About
          </Button>
          <hr style={{ border: '1px solid rgba(28,177,105,0.8)', height: '20px' }} />
          <Button component={Link} to="/services" style={{ color: 'white', fontWeight: 'bolder', fontSize: '13px' }}>
            Services
          </Button>
          <hr style={{ border: '1px solid rgba(28,177,105,0.8)', height: '20px' }} />
          <Button component={Link} to="/contact" style={{ color: 'white', fontWeight: 'bolder', fontSize: '13px' }}>
            Contact Us
          </Button>
          {/* <hr style={{ border: '1px solid rgba(28,177,105,0.8)', height: '20px' }} />
          <Button component={Link} to="/privacy-policy" style={{ color: 'white', fontWeight: 'bolder', fontSize: '13px' }}>
            Privacy Policy
          </Button> */}
        </div>
      </Toolbar>

      <Menu anchorEl={anchorEl} open={isOpen} onClose={handleMenuClose} style={{ marginTop: '45px' }}>
        <MenuItem component={Link} to="/" onClick={handleMenuClose}>Home</MenuItem>
        <MenuItem component={Link} to="/about" onClick={handleMenuClose}>About</MenuItem>
        <MenuItem component={Link} to="/services" onClick={handleMenuClose}>Services</MenuItem>
        <MenuItem component={Link} to="/contact" onClick={handleMenuClose}>Contact Us</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Header;