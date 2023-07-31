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
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PersonIcon from '@mui/icons-material/Person';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';

const MainListItems = () => {
  const [openSiniestros, setOpenSiniestros] = useState(false);
  const [openBases, setOpenBases] = useState(false);
  const [openIncidentes, setOpenIncidentes] = useState(false);
  const [openGestiones, setOpenGestiones] = useState(false);
  const [openBrigadas, setOpenBrigadas] = useState(false);
  const [openBrigadistas, setOpenBrigadistas] = useState(false);
  const [openUterrestres, setOpenUterrestres] = useState(false); 
  const [openUaereas, setOpenUaereas] = useState(false);
  const [openEstadisticas, setOpenEstadisticas] = useState(false);

  const handleSiniestrosClick = () => {
    setOpenSiniestros(!openSiniestros);
  };

  const handleBasesClick = () => {
    setOpenBases(!openBases);
  };

  const handleIncidentesClick = () => {
    setOpenIncidentes(!openIncidentes);
  };

  const handleGestionesClick = () => { // Define la función handleGestionesClick
    setOpenGestiones(!openGestiones);
  };
  const handleBrigadasClick = () => {
    setOpenBrigadas(!openBrigadas);
  };
  const handleBrigadistasClick = () => {
    setOpenBrigadistas(!openBrigadistas);
  };
  const handleUterrestresClick = () => {
    setOpenUterrestres(!openUterrestres);
  };
  const handleUaereasClick = () => {
    setOpenUaereas(!openUaereas);
  };
  
  const handleEstaditicasClick = () => {
    setOpenEstadisticas(!openEstadisticas);
  };
  return (
    <React.Fragment>
      <ListItemButton href="/home" sx={{ background: '#778D45' }}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
      {/* Siniestros button with a nested sub-menu */}
      <ListItemButton onClick={handleSiniestrosClick} sx={{ background: '#778D45' }}>
        <ListItemIcon>
          <LocalFireDepartmentIcon />
        </ListItemIcon>
        <ListItemText primary="Siniestros" />
        {openSiniestros ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      {/* Sub-menu for Siniestros */}
      <Collapse in={openSiniestros} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton href="/siniestros" sx={{ background: '#778D45' }}>
            <ListItemIcon>
              <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="Listado" />
          </ListItemButton>
          <ListItemButton href="/siniestrosRegistro" sx={{ background: '#778D45' }}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Registrar" />
          </ListItemButton>
          {/* Add more sub-menu items as needed */}
        </List>
      </Collapse>

      <ListItemButton onClick={handleGestionesClick} sx={{ background: '#778D45' }}>
        <ListItemIcon>
          <BusinessCenterIcon />
        </ListItemIcon>
        <ListItemText primary="Gestiones" />
        {openGestiones ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      {/* Sub-menú para Gestiones */}
      <Collapse in={openGestiones} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {/* Opción para Bases */}
          <ListItemButton onClick={handleBasesClick} sx={{ background: '#778D45' }}>
            <ListItemIcon>
              <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="Bases" />
            {openBases ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          {/* Sub-menú para Bases */}
          <Collapse in={openBases} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton href="/gestionBases" sx={{ background: '#778D45' }}>
                <ListItemIcon>
                  <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="Listado" />
              </ListItemButton>
              <ListItemButton href="/baseRegistro" sx={{ background: '#778D45' }}>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Registrar Base" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* Opción para Incidentes */}
          <ListItemButton onClick={handleIncidentesClick} sx={{ background: '#778D45' }}>
            <ListItemIcon>
              <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="Incidentes" />
            {openIncidentes ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          {/* Sub-menú para Incidentes */}
          <Collapse in={openIncidentes} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton href="/gestionIncidentes" sx={{ background: '#778D45' }}>
                <ListItemIcon>
                  <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="Listado" />
              </ListItemButton>
              <ListItemButton href="/incidentesRegistro" sx={{ background: '#778D45' }}>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Registrar Incidente" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* Opción para Brigadas */}
          <ListItemButton onClick={handleBrigadasClick} sx={{ background: '#778D45' }}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Brigadas" />
            {openBrigadas ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          {/* Sub-menú para Brigadas */}
          <Collapse in={openBrigadas} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton href="/gestionBrigada" sx={{ background: '#778D45' }}>
                <ListItemIcon>
                  <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="Listado de Brigadas" />
              </ListItemButton>
              <ListItemButton href="/brigadaRegistro" sx={{ background: '#778D45' }}>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Registrar Brigada" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* Opción para Brigadistas */}
          <ListItemButton onClick={handleBrigadistasClick} sx={{ background: '#778D45' }}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Brigadistas" />
            {openBrigadistas ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          {/* Sub-menú para Brigadistas */}
          <Collapse in={openBrigadistas} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton href="/gestionBrigadista" sx={{ background: '#778D45' }}>
                <ListItemIcon>
                  <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="Listado de Brigadistas" />
              </ListItemButton>
              <ListItemButton href="/brigadistasRegistro" sx={{ background: '#778D45' }}>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Registrar Brigadista" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* Opción para Unidades Terrestres */}
          <ListItemButton onClick={handleUterrestresClick} sx={{ background: '#778D45' }}>
            <ListItemIcon>
              <DriveEtaIcon />
            </ListItemIcon>
            <ListItemText primary="Unidades Terrestres" />
            {openUterrestres ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          {/* Sub-menú para Unidades Terrestres */}
          <Collapse in={openUterrestres} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton href="/gestionUterrestre" sx={{ pl: 8 }}>
                <ListItemIcon>
                  <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="Listado de Unidades Terrestres" />
              </ListItemButton>
              <ListItemButton href="/uterrestresRegistro" sx={{ background: '#778D45' }}>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Registrar Unidad Terrestre" />
              </ListItemButton>
            </List>
          </Collapse>

          {/* Opción para Unidades Aéreas */}
          <ListItemButton onClick={handleUaereasClick} sx={{ background: '#778D45' }}>
            <ListItemIcon>
              <LocalAirportIcon />
            </ListItemIcon>
            <ListItemText primary="Unidades Aéreas" />
            {openUaereas ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          {/* Sub-menú para Unidades Aéreas */}
          <Collapse in={openUaereas} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton href="/gestionUaerea" sx={{ pl: 8 }}>
                <ListItemIcon>
                  <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="Listado de Unidades Aéreas" />
              </ListItemButton>
              <ListItemButton href="/uaereasRegistro" sx={{ background: '#778D45' }}>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Registrar Unidad Aérea" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Collapse>



      {/* Siniestros button with a nested sub-menu */}
      <ListItemButton onClick={handleEstaditicasClick} sx={{ background: '#778D45' }}>
        <ListItemIcon>
        <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Estadisticas" />
        {openEstadisticas ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      {/* Sub-menu for Estadisticas */}
      <Collapse in={openEstadisticas} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton href="/estadisticas" sx={{ background: '#778D45' }}>
            <ListItemIcon>
            <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="EstadisticasNumericas" />
          </ListItemButton>
          <ListItemButton href="/Graficos" sx={{ background: '#778D45' }}>
            <ListItemIcon>
            <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Graficos" />
          </ListItemButton>
          
          {/* Add more sub-menu items as needed */}
        </List>
      </Collapse>



    </React.Fragment>
  );
};

export default MainListItems;
