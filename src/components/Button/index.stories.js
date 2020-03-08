import React from "react";
import { action } from "@storybook/addon-actions";
import Button from "./";

export default {
    title: "Components|Button",
    component: Button,
    decorators: [storyFn => <div style={{ textAlign: "center" }}>{storyFn()}</div>]
};

export const Login = () => {
    return <Button type={"Primary"} value={"Log in"} onClick={action("You log in")} />;
};

export const Logout = () => {
    return <Button type={"Logout"} value={"Log out"} onClick={() => alert("Logout")} />;
};

export const Subscribe = () => {
    return <Button type={"Subscribe"} value={"Subcribe"} onClick={() => alert("Subscribed!")} />;
};

export const Unsubscribe = () => {
    return <Button type={"Unsubscribe"} value={"Unsubscribe"} onClick={() => alert("Unsubscribed")} />;
};

export const DisableUnsubscribe = () => {
    return <Button type={"Unsubscribe"} value={"Unsubscribe"} disabled onClick={() => alert("Disabled")} />;
};

export const DisablePrimary = () => {
    return <Button type={"Primary"} value={"Accept"} disabled onClick={() => alert("Disabled")} />;
};

// export const SpinButton = () => {
//     const [isLoading, setLoading] = useState(true);
//     const
//     return (
//         <Button
//             value={
//                 <Fragment>
//                     {isLoading && (
//                         <div
//                             className={classnames(styles.dots, {
//                                 [styles.greenDots]: props.type === "Subscribe",
//                                 [styles.redDots]: props.type === "Unsubscribe"
//                             })}>
//                             {/* why 3 span ????????*/}
//                             <span />
//                             <span />
//                             <span />
//                         </div>
//                     )}
//                     <div className={classnames({ [styles.hidden]: props.isLoading })}>{props.text}</div>
//                 </Fragment>
//             }
//         />
//     );
// };
