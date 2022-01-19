import React from "react";
import { Redirect } from "react-router";
import { auth } from "../../Config/firebase";

export interface IAuthRouteProps {}

const AuthRoute: React.FC<IAuthRouteProps> = props => {
    const { children } = props;

    if (!auth.currentUser) {
        console.log('no user detected, redirecting')
        return <Redirect to="/login" />
    }

    return (
        <div>{children}</div>
    )
}

export default AuthRoute;