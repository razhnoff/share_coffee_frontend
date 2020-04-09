import React from "react";
import PropTypes from "prop-types";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import styles from "../scss/Maps.module.scss";

const YandexMap = ({ optionsMap, icon }) => {
    const { center } = optionsMap;

    return (
        <YMaps>
            <Map defaultState={optionsMap} className={styles.map__container}>
                <Placemark geometry={center} options={icon} />
            </Map>
        </YMaps>
    );
};

YandexMap.propTypes = {
    optionsMap: PropTypes.object,
    icon: PropTypes.object
};

export default YandexMap;
