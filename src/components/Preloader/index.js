import React from "react";
import logo from "../../assets/icons/preloader-logo.png";

import styles from "./scss/Preloader.module.scss";

const Preloader = () => {
    return (
        <div className={styles.preloader}>
            <div className={styles.preloader_image__container}>
                <img src={logo} alt="wait" />
                <div className={styles.preloader_animation__container}>
                    <div className={styles.preloader_animation} />
                </div>
            </div>
        </div>
    );
};

export default Preloader;
