import React, { Fragment } from "react";
import PropTypes from "prop-types";
import PageTitle from "../../components/PageTitle";
import TelegramLoginButton from "../../helpers/TelegramLoginButton";
import SectionInfo from "../../components/SectionInfo";
import Header from "../../components/Header";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { setStorage, router } from "../../helpers/helpers";
import Preloader from "../../components/Preloader";
import Button from "../../components/Button";
import Client from "../../services/api";
import { setDecodedData } from "../../utils";

const LoginPage = ({ history, userAuth }) => {
    const mockAuthLogin = async () => {
        const mockTelegramData = {
            auth_date: "1558179510",
            first_name: "Lenora",
            hash:
                "e996557ea013d1adfe86e88d1127943402b526ad55326dd3b93c9c044a2df60f",
            id: 84037740,
            last_name: "Myers",
            photo_url: "https://t.me/i/userpic/320/dasnein.jpg",
            username: "Dotson"
        };
        const response = await Client.userAuth(mockTelegramData);
        await setDecodedData(response.data.token);

        // if (localStorage.getItem("department")) {
        //     history.push("/subscriptions/");
        // } else {
        history.push("/team_select/");
        // }
    };

    const handleTelegramResponse = async tgResponse => {
        // const requestObj = {
        //     method: "post",
        //     url: "https://forgeserver.herokuapp.com/login/",
        //     data: tgResponse,
        //     mode: "cors",
        //     "Content-Type": "application/json"
        // };
        // const token = await axios(requestObj)
        //     .then(response => {
        //         return response.data.token;
        //     })
        //     .catch(err => {
        //         return err;
        //     });
        // setDecodedData();
        // const userData = jwtDecode(`${token}`);
        // const date = new Date(userData.exp * 1000).toUTCString();
        // setCookie("token", token, { expires: date });
        // await setStorage(userData);
        // router(history, userAuth);
    };

    return (
        <Fragment>
            <Header permission={0} />
            <PageTitle
                title="Get your own kick off"
                description="with Wargaming S&C"
            />
            <SectionInfo value="Use Telegram to be aware of upcoming meets and manage subscriptions:" />
            <div id="telegram__login__container" className="section">
                {process.env.NODE_ENV === "production" ? (
                    <TelegramLoginButton
                        dataOnauth={handleTelegramResponse}
                        botName="rdmcoffee_bot"
                        requestAccess="write"
                        buttonSize="large"
                        cornerRadius={20}
                        usePic={false}
                    />
                ) : (
                    <Button onClick={mockAuthLogin}>
                        {"Log in via Telegram"}
                    </Button>
                )}
            </div>
        </Fragment>
    );
};

LoginPage.propTypes = {
    history: PropTypes.object,
    userAuth: PropTypes.func
};

export default LoginPage;
// export default class LoginPage extends Component {
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             loadingData: false
//         };
//         this.departments = [];
//         this.mockLogin = this.mockLogin.bind(this);
//     }
//
//     componentDidMount() {
//         this.fetchDepartments();
//         console.log(this.departments);
//     }
//
//     async fetchDepartments() {
//         this.departments = await Client.get("api/departments/");
//         console.log(this.departments);
//     }
//
//     mockLogin() {
//         axios.post("/login/", {
//             auth_date: "1558179510",
//             first_name: "Maxim",
//             hash: "e996557ea013d1adfe86e88d1127943402b526ad55326dd3b93c9c044a2df60f",
//             id: 84037740,
//             last_name: "Razhnov",
//             photo_url: "https://t.me/i/userpic/320/dasnein.jpg",
//             username: "@mxma"
//         });
//     }
//
//     render() {
//         // const isBanned = sessionStorage.getItem("banned") === "true" ? true : false;
//         // eslint-disable-next-line no-unused-vars
//         const handleTelegramResponse = async telegramResponse => {
//             this.setState({
//                 loadingData: true
//             });
//             const requestObj = {
//                 method: "post",
//                 url: "https://forgeserver.herokuapp.com/login/",
//                 data: telegramResponse,
//                 mode: "cors",
//                 "Content-Type": "application/json"
//             };
//             const token = await axios(requestObj)
//                 .then(response => {
//                     return response.data.token;
//                 })
//                 .catch(err => {
//                     return err;
//                 });
//             const userData = jwtDecode(`${token}`);
//             const date = new Date(userData.exp * 1000).toGMTString();
//             setCookie("token", token, { expires: date });
//             await setStorage(userData);
//             //from helpers.js
//             router(this.props);
//         };
//
//         // const { error } = this.state;
//         if (this.state.loadingData) {
//             return (
//                 <div className="preloader-body">
//                     <Preloader />
//                 </div>
//             );
//         }
//
//         return (
//             <Fragment>
//                 <Header permissionStatus={{ superAdmin: false, admin: false }} />
//                 <PageTitle title="Get your own kick off" description="with Wargaming S&C" />
//                 <SectionInfo value="Use Telegram to be aware of upcoming meets and manage subscriptions:" />
//                 <div id="telegram__login__container" className="section" onClick={this.update}>
//                     {process.NODE_ENV === "production" ? (
//                         <TelegramLoginButton
//                             dataOnauth={handleTelegramResponse}
//                             botName="rdmcoffee_bot"
//                             requestAccess="write"
//                             buttonSize="large"
//                             cornerRadius={20}
//                             usePic={false}
//                         />
//                     ) : (
//                         <Button type={PRIMARY} onClick={this.mockLogin}>
//                             {"Log in via Telegram"}
//                         </Button>
//                     )}
//                 </div>
//             </Fragment>
//         );
//     }
// }
