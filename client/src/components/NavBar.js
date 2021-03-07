import { useHistory } from 'react-router-dom';
import { logOut } from '../actions/authActions';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import Cart from './Cart';

const Brand = () => {
    const history = useHistory();
    return (
        <a 
        className = "my-auto px-2 font-medium text-lg sm:text-3xl"
        href="!#" 
        onClick={(e)=>{e.preventDefault();history.push("/")}}
        >
            Café Río
        </a>
    );
}

const NavLink = ({text,onClick}) => {
    return (
        <a 
        className = {
            `my-auto p-2 font-medium text-calypso text-sm sm:text-lg mx-4
            transition transform ease-in-out duration-700 hover:bg-theme-color hover:scale-110 hover:text-white rounded-full`
        }
        href="!#" 
        onClick={(e)=>{e.preventDefault();onClick()}}
        >
            {text}
        </a>
    )
}

const NavLinks = ({isAuthenticated, showCart, logOut}) => {

    const history = useHistory();
    return (
        <div className="flex">
            <NavLink text="Menu" onClick={()=>history.push("/menu")} />
            <NavLink text="About" onClick={()=>history.push("/about")} />
            {isAuthenticated 
            ? <NavLink text="Logout" onClick={()=>{logOut();history.push("/")}} />
            : <NavLink text="Login" onClick={()=>history.push("/login")} />
            }
            {showCart && isAuthenticated && <Cart className="text-white"/>}
        </div>
    );
}

const NavBar = ({showCart, className,logOut,isAuthenticated}) => {

    return (
        <div className = {className + " w-full mx-auto max-w-screen-xl flex p-1 m-4 justify-between"}>
            <Brand />
            <NavLinks showCart={showCart} isAuthenticated={isAuthenticated} logOut={logOut}/>
        </div>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

NavBar.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    className: PropTypes.string,
    logOut: PropTypes.func.isRequired,
    showCart: PropTypes.bool,
};

export default connect(mapStateToProps, {logOut})(NavBar);