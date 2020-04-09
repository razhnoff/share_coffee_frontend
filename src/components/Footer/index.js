import React from "react";
import { FOOTER_TITLE } from "../../constants";
import styles from "./scss/Footer.module.scss";

const Footer = () => {
    return (
        <div className={`${styles.footer_wrapper} ${styles.footer}`}>
            <span className={styles.footer__title}>{FOOTER_TITLE}</span>
        </div>
    );
};

export default Footer;
