import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash-es/isEmpty";
import Dropdown from "../../components/Dropdown";
import Button from "../../components/Button";
import SectionInfo from "../../components/SectionInfo";
import PageTitle from "../../components/PageTitle";
import Header from "../../components/Header";
import Preloader from "../../components/Preloader";
import { PRIMARY } from "../../constants";
import Client from "../../services/api";
import { setDecodedData } from "../../utils";

const TeamsSelect = props => {
    const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
    const [options, setOptions] = useState([]);
    const [isDataLoaded, setDataLoaded] = useState(false);

    if (localStorage.getItem("department")) {
        props.history.replace("/subscriptions/");
    }

    useEffect(() => {
        const fetchDepartments = async () => {
            const response = await Client.getDepartments(localStorage.getItem("token"));

            setDataLoaded(true);
            setOptions(getAccountOptions(response.data.data));
        };

        fetchDepartments();
    }, [props.history]);

    const setDepartment = async () => {
        const response = await Client.setUserDepartment(
            localStorage.getItem("_id"),
            {
                newDepartment: selectedDepartmentId
            },
            localStorage.getItem("token")
        );

        setDecodedData(response.data.token);
        props.history.push("/subscriptions/");
    };

    const fullName =
        isEmpty(localStorage.getItem("firstName")) && isEmpty(localStorage.getItem("lastName"))
            ? "User"
            : `${localStorage.getItem("firstName")} ${localStorage.getItem("lastName")}`;

    return (
        <Fragment>
            {isDataLoaded ? (
                <Fragment>
                    <Header
                        isActive
                        hasDepartment={false}
                        permission={Number(localStorage.getItem("permission"))}
                        location={props}
                    />
                    <main className="select-main_section">
                        <PageTitle title={`Hello, ${fullName}`} />
                        <SectionInfo value="Select your team to start knowledge sharing and having some coffee:" />
                        <div className="select-dropdown_container">
                            <Dropdown
                                options={options}
                                value={selectedDepartmentId}
                                onChange={setSelectedDepartmentId}
                            />
                        </div>

                        <Button type={PRIMARY} onClick={setDepartment} disabled={!selectedDepartmentId}>
                            {"Accept"}
                        </Button>
                    </main>
                </Fragment>
            ) : (
                <Preloader />
            )}
        </Fragment>
    );
};

function getAccountOptions(departments) {
    if (isEmpty(departments)) {
        return [];
    }

    return departments.map(({ title: label, _id: value }) => {
        return { label, value };
    });
}

TeamsSelect.propTypes = {
    history: PropTypes.object
};

export default TeamsSelect;
