import React from 'react';
import styles from './Footer.module.css';

const Footer = (props) => {
    return (
        <div>
            <div className={styles.DummyHeight}></div>
            <div className={styles.FooterContent}>
                <div className={styles.FooterTextWrapper}>
                    Developed by <a className={styles.LinkText} href='https://amitabh.dev' target='_blank' rel="noopener noreferrer">Amitabh Sharma</a>
                </div>
            </div>
        </div>
    )
};
export default Footer;