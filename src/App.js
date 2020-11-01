import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import styles from "./styles.module.scss";
import LoginPage from "./views/UserLogin";
import TeamsSelect from "./views/TeamsSelect";
import Topics from "./views/Topics";
// import HomeAdmin from "./views/HomeAdmin";
import OneTopic from "./views/HomeAdmin/Topics/oneTopic";
import OneUser from "./views/HomeAdmin/Users/oneUser";
import Footer from "./components/Footer";
import NotFound from "./views/NotFound";
import TopicCreate from "./views/HomeAdmin/Topics";

const App = () => {
    return (
        <div className={`${styles.App} ${styles.wrapper}`}>
            <BrowserRouter>
                <Switch>
                    <Route path="/" component={LoginPage} exact />
                    <Route path="/team_select/" component={TeamsSelect} exact />
                    <Route path="/subscriptions/" component={Topics} />
                    {/*<Route path="/admin/" component={HomeAdmin} exact />*/}
                    <Route path="/admin/topic/:id/" component={OneTopic} exact />
                    <Route path="/admin/topic-create/" component={TopicCreate} exact />
                    <Route path="/admin/user/:id/" component={OneUser} exact />
                    <Route path="/404/" component={NotFound} exact />
                    <Route component={NotFound} />
                </Switch>
            </BrowserRouter>
            <Footer />
        </div>
    );
};

export default App;

// export default class App extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isLogged: false,
//             id: sessionStorage.getItem("id"),
//             token: getCookie("token")
//         };
//
//         this.userAuth = this.userAuth.bind(this);
//     }
//
//     userAuth() {
//         this.setState({
//             id: sessionStorage.getItem("id"),
//             token: getCookie("token")
//         });
//     }
//
//     render() {
//         if no info about user
//         if (!this.state.id || !this.state.token) {
//             return (
//                 <div className={`${styles.App} ${styles.wrapper}`}>
//                     <Switch>
//                         <Route path="/" render={props => <LoginPage userAuth={this.userAuth} {...props} />} exact />
//                         <Route path="/admin" component={HomeAdmin} exact />
//
//                         <Redirect to="/" />
//                     </Switch>
//                 </div>
//             );
//         }
//
//         return (
//             <div className={`${styles.App} ${styles.wrapper}`}>
//                 <BrowserRouter>
//                     <Switch>
//                         <Route path="/" component={LoginPage} exact />
//                         <Route path="/team_select/" component={TeamsSelect} exact />
//                         <Route path="/subscriptions/" component={Topics} />
//                         <Route path="/admin/" component={HomeAdmin} exact />
//                         <Route path="/admin/topic/:id/" component={OneTopic} exact />
//                         <Route path="/admin/topic-create/" component={TopicCreate} exact />
//                         <Route path="/admin/user/:id/" component={OneUser} exact />
//                         <Route path="/404/" component={NotFound} exact />
//                         <Route component={NotFound} />
//                     </Switch>
//                 </BrowserRouter>
//                 <Footer />
//             </div>
//         );
//     }
// }
