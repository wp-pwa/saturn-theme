import React from 'react';
import NavbarItem from './NavbarItem';
import styles from './styles.css';

const categories = [
  'Home',
  'España',
  'World',
  'Jamon',
  'Albaricoque',
  'Queso',
  'Home',
  'España',
  'World',
  'Jamon',
  'Albaricoque',
  'Queso',
];

const Navbar = () => (
  <div className={styles.navbar}>
    <ul>
      {categories.map((name, index) => (
        <NavbarItem key={index} name={name} active={!index} />
      ))}
    </ul>
  </div>
);

export default Navbar;
