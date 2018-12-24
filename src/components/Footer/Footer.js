import React from 'react';
import * as styles from './Footer.css';
import olx from '../../assets/olx-logo-en.png';

const Footer = () => (
  <div className={styles.container}>
    <div className={styles.wrapper}>
      <div className={styles.logoWrapper}>
        <img src={olx}/>
        <span>© dubizzle.com 2018, All Rights Reserved.</span>
      </div>
    </div>
  </div>
);

export default Footer;
