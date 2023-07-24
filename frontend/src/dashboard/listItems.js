import React, { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List'; // Agrega la importación de List
import Collapse from '@mui/material/Collapse';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const MainListItems = () => {
  const [openSiniestros, setOpenSiniestros] = useState(false);

  const handleSiniestrosClick = () => {
    setOpenSiniestros(!openSiniestros);
  };

  return (
    <React.Fragment>
      <ListItemButton href="/home">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
      {/* Siniestros button with a nested sub-menu */}
      <ListItemButton onClick={handleSiniestrosClick}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Siniestros" />
        {openSiniestros ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      {/* Sub-menu for Siniestros */}
      <Collapse in={openSiniestros} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton href="/siniestros" sx={{ pl: 4 }}>
            <ListItemIcon>
              <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="Listado" />
          </ListItemButton>
          <ListItemButton href="/siniestrosRegistro" sx={{ pl: 4 }}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Registrar" />
          </ListItemButton>
          {/* Add more sub-menu items as needed */}
        </List>
      </Collapse>

      <ListItemButton href="/gestiones">
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Gestion" />
      </ListItemButton>
      <ListItemButton href="/estadisticas">
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Estadísticas" />
      </ListItemButton>
    </React.Fragment>
  );
};

export default MainListItems;
