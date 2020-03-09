import React from 'react';
import styles from './Header.module.css';
import UserImage from '../../Assets/Images/UserProfile.png';

const Header = (props) => {
    return (
        <div className={styles.HeaderWrapper} >
            <div className={styles.HeaderContent}>
                <div className={styles.HeaderTitleWrapper}>
                    Order Summary
                </div>
                <div className={styles.UserIconWrapper}>
                    <div className={styles.UserImageContainer}>
                        <img className={styles.UserImage} src={UserImage} alt='User' onClick={props.ToggleMenu} />
                    </div>
                    {props.isMenuOpen ?
                        <div className={styles.Backdrop} onClick={props.ToggleMenu}>
                            <div className={styles.MenuWrapper}>
                                <div className={styles.UserName}>
                                    Amitabh Sharma
                                </div>
                                <div className={styles.MenuItem}>
                                    Logout
                            </div>
                            </div>
                        </div>
                        : null}

                </div>
            </div>
        </div>
    )
};
export default Header;