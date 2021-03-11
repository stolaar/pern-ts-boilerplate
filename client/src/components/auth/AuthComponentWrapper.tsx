import React from "react";
import {useSelector} from "react-redux";
import {RootReducer} from "../../store/rootReducer";
import {FunctionComponent, useCallback} from "react";
import LandingPage from "../../pages/landing/LandingPage";

function AuthComponentWrapper({components}: { components: { [k: number]: FunctionComponent<any> } }) {
    const {auth: {permissions}} = useSelector((state: RootReducer) => state)

    const renderComponent = useCallback(() => {
        let component = <LandingPage/>

        for (let key in components) {
            if (permissions.find((val: any) => +val === +key)) {
                let Component = components[key]
                component = <Component/>
                break;
            }
        }
        return component
    }, [components, permissions])

    return renderComponent()
}

export default AuthComponentWrapper
