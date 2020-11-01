const checkerProp = prop => {
    if (
        prop === "null" ||
        prop === null ||
        prop === undefined ||
        prop === "undefined" ||
        `${prop}` === "NaN" ||
        prop === ""
    ) {
        return true;
    } else {
        return false;
    }
};

const setStorage = userData => {
    sessionStorage.setItem("id", userData.data._id);
    sessionStorage.setItem("firstName", userData.data.firstName);
    sessionStorage.setItem("lastName", userData.data.lastName);
    sessionStorage.setItem("avatar", userData.data.avatar);
    sessionStorage.setItem("isAdmin", userData.data.permission);
    sessionStorage.setItem("banned", userData.data.banned.status);
    if (checkerProp(userData.data.department)) {
        sessionStorage.setItem("department", null);
    } else {
        sessionStorage.setItem("department", userData.data.department.title);
    }
    sessionStorage.setItem("tokenTimeOver", userData.exp);
};

const router = (history, userAuth) => {
    userAuth();
    const hasId = !checkerProp(sessionStorage.getItem("id"));
    const hasDepartament = !checkerProp(sessionStorage.getItem("department"));
    if (hasId && !hasDepartament) {
        history.push("/team_select/");
    } else if (hasId && hasDepartament) {
        // history.push("/subscriptions/");
    }
};

const regularity = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const timeConverter = timestamp => {
    const initDate = new Date(timestamp);
    let month = "0";
    let day = "0";

    if (initDate.getMonth() < 9) {
        month += initDate.getMonth() + 1;
    } else {
        month = initDate.getMonth() + 1;
    }

    if (initDate.getDate() < 10) {
        day += initDate.getDate();
    } else {
        day = initDate.getDate();
    }

    const date = `${day}.${month}.${initDate.getFullYear()}`;

    return date;
};

const convertToClockVisibility = timestamp => {
    const initDate = new Date(timestamp);
    let min = "0";
    let hours = "0";

    if (initDate.getMinutes() < 10) {
        min += initDate.getMinutes();
    } else {
        min = initDate.getMinutes();
    }

    if (initDate.getHours() < 10) {
        hours += initDate.getHours();
    } else {
        hours = initDate.getHours();
    }

    const time = `${hours}:${min}`;

    return time;
};

const checkTokenTime = tokenTimeOver => {
    let dateNow = Number((Date.now() / 1000).toFixed());
    if (Number(tokenTimeOver) < dateNow) {
        window.location.history.replace("/");
        // removeCookie("token");
        localStorage.clear();
    } else {
        return;
    }
};

// eslint-disable-next-line no-unused-vars
const checkListSuperAdmin = () => {
    if (
        (sessionStorage.getItem("avatar") === "undefined" || sessionStorage.getItem("avatar") === null) &&
        (sessionStorage.getItem("firstName") === null || sessionStorage.getItem("firstName") === "undefined") &&
        (sessionStorage.getItem("lastName") === null || sessionStorage.getItem("lastName") === "undefined")
    ) {
        return true;
    } else {
        return false;
    }
};

function getSortedList(arr, option, sortParam) {
    return [...arr].sort((a, b) => {
        switch (sortParam) {
            case "desc":
                return a[option] < b[option] ? 1 : -1;
            case "asc":
            default:
                return a[option] > b[option] ? 1 : -1;
        }
    });
}

export {
    getSortedList,
    setStorage,
    router,
    timeConverter,
    regularity,
    convertToClockVisibility,
    checkerProp,
    checkTokenTime
};
