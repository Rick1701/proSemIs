import React, { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List'; // Agrega la importación de List
import Collapse from '@mui/material/Collapse';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

const MainListItems = () => {
  const [openSiniestros, setOpenSiniestros] = useState(false);
  const [openGestiones, setOpenGestiones] = useState(false);

  const handleSiniestrosClick = () => {
    setOpenSiniestros(!openSiniestros);
  };
  const handleGestionesClick = () => {
    setOpenGestiones(!openGestiones);
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
          <LocalFireDepartmentIcon />
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

{/* Sub-menu for Gestiones */}
<ListItemButton onClick={handleGestionesClick}>
  <ListItemIcon>
    <ShoppingCartIcon />
  </ListItemIcon>
  <ListItemText primary="Gestiones" />
  {openGestiones ? <ExpandLess /> : <ExpandMore />}
</ListItemButton>

{/* Sub-menu for Gestiones */}
<Collapse in={openGestiones} timeout="auto" unmountOnExit>
  <List component="div" disablePadding>
    {/* Option for Bases */}
    <ListItemButton href="/gestionBases" sx={{ pl: 4 }}>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Bases" />
    </ListItemButton>
    <ListItemButton href="/baseRegistro" sx={{ pl: 4 }}>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Registrar Base" />
    </ListItemButton>

    {/* Option for Incidentes */}
    <ListItemButton href="/gestionIncidentes" sx={{ pl: 4 }}>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Incidentes" />
    </ListItemButton>
    <ListItemButton href="/incidentesRegistro" sx={{ pl: 4 }}>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Registrar Incidente" />
    </ListItemButton>

    {/* Add more options for other entities as needed */}
  </List>
</Collapse>

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
