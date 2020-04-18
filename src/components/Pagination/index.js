import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import styles from "./scss/Pagination.module.scss";

const Pagination = ({ startingPage, change, pageCount }) => {
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(startingPage);
    }, [startingPage]);

    const currentPageHandler = value => {
        setCurrentPage(value);
        change(value);
    };

    const createBtnControls = () => {
        const controls = [];

        for (let pageNumber = 1; pageNumber <= pageCount + 1; pageNumber++) {
            controls.push(
                <div
                    key={pageNumber}
                    className={`${styles.pagin_btn} ${pageNumber === currentPage ? styles.pagin_active : ""}`}
                    onClick={() => currentPageHandler(pageNumber)}>
                    {pageNumber}
                </div>
            );
        }

        return controls;
    };

    return <div className={styles.pagination}>{createBtnControls()}</div>;
};

Pagination.propTypes = {
    change: PropTypes.func,
    // currentPage: PropTypes.number,
    pageCount: PropTypes.number,
    startingPage: PropTypes.number.isRequired
};

Pagination.defaultProps = {
    startingPage: 1
};

export default Pagination;
