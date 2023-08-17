import React from "react";
import '../../styles/login.css';
import { Helmet } from 'react-helmet';

const Login = () => {
    return (
        <div>
            <Helmet>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>matcha | Love at first chat</title>
            </Helmet>
            <div class="screen">
                <div class="form-container">
                    <div class="form-content">
                        <h2><a href="./index.html">ChatSpace</a></h2>
                        <h3>Login</h3>
                        <p>
                            By continuing you agree to our terms and conditions of use
                            as well as our cookie policy.
                        </p>
                        <form action="" method="POST">
                            <input type="text" placeholder="Username" />
                            <input type="password" placeholder="Password" />
                            <input class="btn-login" type="submit" value="Login" />
                        </form>
                        <p>
                            Don't you have an account ?
                            <a href="register.html">Register</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;