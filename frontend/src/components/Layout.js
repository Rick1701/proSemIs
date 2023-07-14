import React from 'react';
import Chart from '../dashboard/Chart';
import Dashboard from '../dashboard/Dashboard';
import Deposits from '../dashboard/Deposits';
import Orders from '../dashboard/Orders';
import Title from '../dashboard/Title';

const Layout = ({ children }) => {
  return (
    <div>
      {/* Renderiza los componentes del dashboard */}
      <Chart />
      <Dashboard />
      <Deposits />
      <Orders />
      <Title />

      {/* Renderiza el contenido de la página */}
      {children}
    </div>
  );
};

export default Layout;