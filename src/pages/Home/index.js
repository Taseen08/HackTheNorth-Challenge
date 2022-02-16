import React, { useState } from "react";
import styles from "./index.module.css";
import { Link } from "react-router-dom";
import {
    Container,
    Alert,
    AlertIcon,
    AlertTitle,
    CloseButton
  } from '@chakra-ui/react'



const Home = () => {
    const [email, SetEmail] = useState("email");
    const [password, SetPassword] = useState("password");
    const [loggedIn, SetLoggedIn] = useState(false);
    const [popAlert, SetPopAlert] = useState(false);

    const checkInfo = () => {
        if (email === "challenge@testmail.com" && password === "12345") {
            SetLoggedIn(true);
        } else {
            SetPopAlert(true);
            SetLoggedIn(false);
        }
    }
    return (
        <div className={styles.divStyle}>
            <div className={styles.loginStyle}>

                <Container fontSize={'25px'} ml={'2'}>
                <p><strong><span style={{color : "rgb(250, 227, 19)", fontSize : "55px"}}>Hello There!</span><br/>Let me help you explore all the amazing events and workshops we have to offer!</strong></p>
</Container>
                <div className={styles.infoStyle}>
                    <p>Email</p>
                    <input
                        type="email"
                        placeholder=""
                        required
                        onChange={event => SetEmail(event.target.value)}
                    />
                    <p>Password</p>
                    <input
                        type="password"
                        placeholder=""
                        required
                        onChange={event => SetPassword(event.target.value)}
                    />
                    {popAlert && <Alert status='error'>
  <AlertIcon />
  <AlertTitle mr={2}>Email/password incorrect!</AlertTitle>
  <CloseButton onClick={() => SetPopAlert(false)} position='absolute' right='8px' top='8px' />
</Alert>}
                    <div className={styles.buttonsStyle}>
                      <div onClick={() => checkInfo()}>
                        <Link
                            to={(email === "challenge@testmail.com" && password === "12345") ? "/events" : "/"}
                            state={{ email, password, loggedIn : true }}
                            className={styles.buttonStyle}
                        >
                            <p>Sign in</p>
                        </Link>
                        </div>


                        <Link
                            to={"/events"}
                            state={{ email, password, loggedIn }}
                            className={styles.buttonStyle}
                        >
                            <p>Continue as Guest</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;