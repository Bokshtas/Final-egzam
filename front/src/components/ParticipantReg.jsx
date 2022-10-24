import { useState } from "react";
import { useNavigate } from "react-router-dom";




function ParticipantReg() {
let Token = localStorage.getItem("Token");
let organisatorID = localStorage.getItem("organiserID");
    const [message, setMessage] = useState(null)
    const navigate = useNavigate();
    return(
        <div className="addUserMain">
                <h2>Add Participant</h2>
                <form onSubmit={(e) => {
                    e.preventDefault();

                    fetch("http://localhost:8090/v1/participants/register", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            "Authorization": `Bearer ${Token}`
                        },
                        body: JSON.stringify({
                            name: e.target.name.value,
                            surname: e.target.surname.value,
                            email: e.target.email.value,
                            birthday: e.target.birthday.value,
                            organiser_id: organisatorID
                        })
                    })
                        .then(res => res.json())
                        .then(res => {

                            if (res.error) {

                                setMessage(res.error)
                            } else {                               
                                setTimeout(() => {
                                    navigate('/participants')
                                }, 1000)
                            }
                        })
                        .catch(error => console.log(error));
                }}>

                    <label>Name</label>
                    <input type="text" name="name" required minLength='3' maxLength='20'/>

                    <label>Surname</label>
                    <input type="text" name="surname" required minLength='3' maxLength='20'/>

                    <label>Email</label>
                    <input type="email" name="email" required minLength='3' maxLength='20'/>
                    <label>Birthday</label>

                    <input type="date" name="birthday" required/>
                    <div className="Add">
                        <button type="submit">Add</button>
                    </div>
                </form>

                <h3>{message}</h3>
            </div>
    )
}

export default ParticipantReg;