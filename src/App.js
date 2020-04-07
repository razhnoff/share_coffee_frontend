import React, { Component } from "react";
import {getCookie} from "tiny-cookie";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import styles from "./styles.module.scss";
import LoginPage from "./views/LoginPage";
import PageTeamSelect from "./views/PageTeamSelect";
import SubscriptionsPage from "./views/Events/SubscriptionsPage";
import HomeAdmin from "./views/HomeAdmin";
import OneTopic from "./views/HomeAdmin/Topics/oneTopic";
import OneUser from "./views/HomeAdmin/Users/oneUser";
import Footer from "./components/Footer";
import NotFound from "./views/NotFound";
import TopicCreate from "./views/HomeAdmin/Topics";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: sessionStorage.getItem("id"),
            token: getCookie("token")
        };

        this.userAuth = this.userAuth.bind(this);
    }

    userAuth() {
        this.setState({
            id: sessionStorage.getItem("id"),
            token: getCookie("token")
        });
    }

    render() {
        //if no info about user
        // if (!this.state.id || !this.state.token) {
        //     return (
        //         <div className={`${styles.App} ${styles.wrapper}`}>
        //             <Switch>
        //                 <Route path="/" render={props => <LoginPage userAuth={this.userAuth} {...props} />} exact />
        //                 <Route path="/admin" component={HomeAdmin} exact />
        //
        //                 <Redirect to="/" />
        //             </Switch>
        //         </div>
        //     );
        // }

        return (
            <div className={`${styles.App} ${styles.wrapper}`}>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" component={LoginPage} exact/>
                        <Route path="/team_select/" component={PageTeamSelect} exact/>
                        <Route path="/subscriptions/" component={SubscriptionsPage}/>
                        <Route path="/admin" component={HomeAdmin} exact/>
                        <Route path="/admin/topic/:id" component={OneTopic} exact/>
                        <Route path="/admin/topic-create" component={TopicCreate} exact/>
                        <Route path="/admin/user/:id" component={OneUser} exact/>
                        <Route path="/404" component={NotFound} exact/>
                        <Route component={NotFound} exact/>
                    </Switch>
                </BrowserRouter>
                <Footer/>
            </div>
        );
    }
}
