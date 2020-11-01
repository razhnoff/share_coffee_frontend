import axios from "axios";

import * as URL from "../../constants";

const addNewEvent = data => {
    axios({
        method: "POST",
        url: URL.ADD_NEW_TOPIC,
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "content-type": "application/json"
        },
        data
    });
};

const updateEvent = (id, data) => {
    axios({
        method: "PUT",
        url: URL.UPDATE_TOPIC(id),
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "content-type": "application/json"
        },
        data
    });
};

const api = {
    addNewEvent,
    updateEvent
};

export default api;
