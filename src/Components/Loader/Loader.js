import React from 'react';
import { RingLoader } from 'react-spinners';
import { css } from '@emotion/core';
import styles from './Loader.module.css';


const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

const LoaderComponent = (props) => {
    const unClickableBackdropLoader = (
        <div className={styles.FullscreenGrey}>
            <div className={styles.LoaderWrapper}>
                <RingLoader
                    css={override}
                    sizeUnit={"px"}
                    size={90}
                    color={props.color ? props.color : '#123abc'}
                    loading={props.loading}
                />
            </div>
        </div>
    );

    const normalLoader = (
        <div className={styles.LoaderWrapper}>
            <RingLoader
                css={override}
                sizeUnit={"px"}
                size={90}
                color={props.color ? props.color : '#123abc'}
                loading={props.loading}
            />
        </div>
    );
    if (props.type === 'unClickableBackdropLoader') {
        return unClickableBackdropLoader;
    } else if (props.type === 'normal') {
        return normalLoader;
    } else {
        return normalLoader;
    }
};

export default LoaderComponent;