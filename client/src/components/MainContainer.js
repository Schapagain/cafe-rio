import React from 'react'
import SignIn from "./SignIn";
import HomePage from "./HomePage";
import Checkout from "./Checkout";
import Menu from './Menu';
import SignUp from './SignUp';
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import NavBar from './NavBar';
import About from './About';

export default function MainContainer() {
    return (
        <div className="w-full h-full flex">
            <Switch>
                <Route 
                exact 
                path="/login"
                render={(props) => <SignIn {...props.location.state} />}
                />
                <Route exact path="/about">
                    <div className="w-full h-screen p-5 bg-cover bg-brown-paper justify-center flex flex-col">
                            <NavBar className="z-50 bg-theme-color rounded-xl text-offwhite"/>
                            <About className="text-offwhite"/>
                    </div>
                </Route>
                <Route exact path="/signup">
                    <SignUp />
                </Route>
                <Route exact path="/checkout">
                    <Checkout />  
                </Route>
                <Route exact path="/menu">
                    <div className="w-full h-full p-5 bg-cover bg-brown-paper justify-center flex flex-col">
                        <NavBar className="z-50 bg-theme-color rounded-xl text-offwhite"/>
                        <Menu className="text-offwhite"/>
                    </div>
                </Route>
                <Route path="/">
                    <div className="w-full h-screen p-5 bg-cover bg-coffee-on-desk justify-center flex flex-col">
                        <NavBar className="z-50 text-white"/>
                        <HomePage />
                    </div>  
                </Route>
            </Switch>
        </div>
    )
}
