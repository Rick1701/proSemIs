import React from 'react';
import Link from 'next/link';
import styles from '@/styles/Sidebar.module.css';

const Sidebar = () => {
  return (
    <nav className={styles.sidebar}>
      {/* Aquí va el código HTML de la barra lateral */}
      {/* Recuerda ajustar las rutas de los enlaces según tu estructura de páginas */}
      <ul className={styles.navList}>
        <li>
          <Link href="/dashboard">
            <a>Dashboard</a>
          </Link>
        </li>
        <li>
          <Link href="/users">
            <a>Users</a>
          </Link>
        </li>
        {/* Otros enlaces de la barra lateral */}
      </ul>
    </nav>
  );
};

export default Sidebar;