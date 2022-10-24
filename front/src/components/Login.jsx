import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/RegisterAndLogin.css";
function Login() {
    const navigate = useNavigate();
    const [loginMessage, setLoginMessage ] = useState(null);
    useEffect(() => {
        localStorage.clear();
    }, [])
    return (
        <div className="main">

            <h2>Login</h2>
            <p className="form-below">Enter your details.</p>

            <form onSubmit={(e) => {
                e.preventDefault();

                fetch("http://localhost:8090/v1/organiser/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: e.target.name.value,
                        password: e.target.password.value
                    })
                })
                    .then(res => res.json() )

                    .then(res => {       

           
                        if(res.error) {
                            setLoginMessage(res.error)
                        }else {
                            localStorage.setItem("organiserID", res.organiserID)
                            localStorage.setItem("Token", res.Token)
                            navigate('/participants')
                        }
                    })
                    .catch(error => console.log(error));
            }
            }>
                <div>
                    <label>Name</label>
                </div>
                <input type="text" name="name" required minLength='3' maxLength="25" />
                <div>
                    <label>Password</label>
                </div>
                <input type="password" name="password" required minLength='3' maxLength="25" />
                <div>
                    <button className="reg-log-button" type="submit">Login</button>
                </div>
            </form>

            <h3>{loginMessage}</h3>
        </div>
    )
}


export default Login;