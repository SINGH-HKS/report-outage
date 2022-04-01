import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
      };
    return (
        <AppBar position="static">
            <Toolbar variant="dense">
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                    }}
                >
                    <MenuItem onClick={()=>{
                       navigate('/')
                       setAnchorElNav(null);
                    }}>
                        <Typography variant="h6" color="inherit" component="div">
                            Register Outage
                        </Typography>
                    </MenuItem>
                    <MenuItem onClick={()=>{
                       navigate('/view-records')
                       setAnchorElNav(null);
                    }}>
                        <Typography variant="h6" color="inherit" component="div">
                            View Records
                        </Typography>
                    </MenuItem>
                    <MenuItem onClick={()=>{
                       navigate('/view-graph')
                       setAnchorElNav(null);
                    }}>
                        <Typography variant="h6" color="inherit" component="div">
                            View Graph
                        </Typography>
                    </MenuItem>
                </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                onClick={()=>navigate('/')}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
               Register Outage
              </Button>
              <Button
                onClick={()=>navigate('/view-records')}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
               View Records
              </Button>
              <Button
               
                onClick={()=>navigate('/view-graph')}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
               View Graph
              </Button>
         
          </Box>
            </Toolbar>
        </AppBar>
    );
}
