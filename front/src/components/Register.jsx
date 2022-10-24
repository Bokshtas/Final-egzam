import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./css/RegisterAndLogin.css";
function Register() {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.clear();
    }, [])
    return (
        <div className="main">
            <h2>Create Account</h2>
            <p className="form-below">Fill the form below.</p>

            <form onSubmit={(e) => {
                e.preventDefault();

                fetch("http://localhost:8090/v1/organiser/register", {
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
                        res.err ? console.log(res.err) : navigate("/login")

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
                    <button className="reg-log-button" type="submit">Register</button>
                </div>
            </form>

        </div>
    )
}


export default Register;