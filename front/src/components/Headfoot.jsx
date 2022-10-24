import { Link } from "react-router-dom";
import "./css/Headfoot.css";

function Headfoot({ children }) {
    return (
        <div>
            <div className="header">
                <Link to='/' className="page-name">Organise</Link>


                <div className="addres">

                    <Link to="/" >Registration</Link>

                    <Link to="/login" >Login</Link>

                   <Link to="/participants" >Participants</Link>

                </div>

            </div>

            {children}

            <footer>
                Copyright © 2022. All Rights Reserved.
            </footer>
        </div>
    )
}

export default Headfoot;