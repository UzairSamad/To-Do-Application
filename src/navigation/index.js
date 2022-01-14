import React, { useEffect, useState } from "react";
import firebase from "firebase"
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import Loader from "../components/Loader";

const Navigation = () => {

    const [component, setComponent] = useState(<Loader />)

    useEffect(() => {
        setTimeout(() => {
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    setComponent(<AppStack />)
                }
                else {
                    setComponent(<AuthStack />)
                }
            })

        }, 3000)
    }, [])

    return (
        <>
            {component}
        </>

    );
};
export default Navigation;
