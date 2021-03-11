import React, {useEffect, useState} from "react";
import Loader from "../common/loader/Loader";
import Register from "./register/Register";

function AuthFormsWrapper() {
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        if(isLoading) setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [isLoading])

    return isLoading ? <Loader show={isLoading} /> : <Register />
}

export default AuthFormsWrapper
