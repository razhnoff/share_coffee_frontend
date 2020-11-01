import jwtdecode from "jwt-decode";
import isNull from "lodash-es/isNull";

export const setDecodedData = token => {
    const decodedTokenData = jwtdecode(`${token}`);

    localStorage.setItem("token", token);

    Object.keys(decodedTokenData.data).forEach(item => {
        if (typeof decodedTokenData.data[item] === "object" && !isNull(item)) {
            localStorage.setItem(item, JSON.stringify(decodedTokenData.data[item]));
        } else {
            localStorage.setItem(item, decodedTokenData.data[item]);
        }
    });
};
