import React from "react";
import './LandingPage.scss'
import ShapeOne from "../../components/common/ShapeOne";
import {LoginForm} from "../../components/auth/login/Login";


function LandingPage() {
    return <section className='landing-page min-h-100'>
        <div className='landing-page-content'>
            <h2>WELCOME</h2>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
                into electronic typesetting, remaining essentially unchanged.</p>
        </div>
        <div className='login-form'>
            <LoginForm/>
        </div>
        <div className='shape-bottom'>
            <ShapeOne/>
        </div>
    </section>
}

export default LandingPage
