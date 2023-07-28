import React from 'react';
import Chart from '../dashboard/Chart';
import Dashboard from '../dashboard/Dashboard';


const Layout = ({ children }) => {
  return (
    <div>
      <Dashboard>
          {/* Renderiza los componentes del dashboard */}
          <Chart />
          {/*<Deposits />
          <Orders /> */}
          {/* Renderiza el contenido de la página */}
          {children}
      </Dashboard>
    </div>
  );
};

export default Layout;