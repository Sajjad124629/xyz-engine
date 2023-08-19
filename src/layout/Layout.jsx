import { Link, NavLink } from "react-router-dom";
import PropTypes from 'prop-types';
const Layout = (props) => {
    const {children} = props;
    return (
        <>
            <div>
                <div className="navbar fixed z-50 top-0  bg-base-100  justify-center shadow-gray-500 shadow ">

                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                <li> <NavLink to={'/'}>Home</NavLink></li>
                                <li> <NavLink to={'/result'}>Result</NavLink></li>
                            </ul>
                        </div>
                        <Link to='/' className="btn btn-ghost normal-case text-xl">XYZ ENGINE</Link>
                    </div>

                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            <li><NavLink to={'/'} >Home</NavLink></li>
                            <li> <NavLink to={'/result'}>Result</NavLink></li>
                        </ul>
                    </div>

                </div>
                {children}
            </div>
        </>
    );
};
Layout.propTypes = {
   
    children: PropTypes.array,
   
}
export default Layout;