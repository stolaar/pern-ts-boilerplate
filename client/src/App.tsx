import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Route, Switch} from "react-router"
import {guest_routes, private_routes, public_routes} from "./config/routes";
import Toast from "./components/common/toast/Toast";
import {useSelector} from "react-redux";
import {RootReducer} from "./store/rootReducer";
import ProtectedRoute from "./authGuards/ProtectedRoute";
import GuestRoute from "./authGuards/GuestRoute";
import Loader from "./components/common/loader/Loader";
import './typography/styles.scss'
import Header from "./components/layout/Header";

function App() {
    const {feedback: {showToast, showSpinner}} = useSelector((state: RootReducer) => state)

    return (
        <section>
            {showToast ? <Toast/> : null}
            {showSpinner ? <Loader show={showSpinner} /> : null}
            <Header />
            <div className="app-container">
                <Switch>
                    {public_routes.map(route => {
                        return <Route key={route.path} exact path={route.path} component={route.component}/>
                    })}
                    {private_routes.map(route => {
                        return <ProtectedRoute key={route.path} exact path={route.path} component={route.component} components={route.components}/>
                    })}
                    {guest_routes.map(route => {
                        return <GuestRoute key={route.path} exact path={route.path} component={route.component} />
                    })}
                </Switch>
            </div>
        </section>
    );
}

export default App;
