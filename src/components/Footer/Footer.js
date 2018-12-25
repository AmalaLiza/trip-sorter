import React from 'react';
import * as styles from './Footer.css';
import propertyFinder from '../../assets/logo.svg';

const Footer = () => (
  <div className={styles.container}>
    <div className={styles.wrapper}>
      <div className={styles.logoWrapper}>
        {/*<img src={propertyFinder}/>*/}
        <span>© propertyfinder.com 2018, All Rights Reserved.</span>
      </div>
    </div>
  </div>
);

export default Footer;
