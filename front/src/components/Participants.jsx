import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./css/Participants.css";
import { useNavigate } from 'react-router-dom'

function Participants() {
    
    let Token = localStorage.getItem("Token");
    let organisatorID = localStorage.getItem("organiserID");
    const navigate = useNavigate()
    const [participants, setParticipants] = useState(null);
    const [deletep, setDeletep] = useState(0);
    const [edit, setEdit] = useState(false);
    


    useEffect(() => {
        if(Token) {
            fetch(`http://localhost:8090/v1/participants/${organisatorID}`, {
            headers: {
                "Authorization": `Bearer ${Token}`
            }
        })
            .then(res => res.json())
            .then(res => {
                setParticipants(res)

            })
            .catch(error => console.log(error));
        }else {
            navigate("/login")
            alert('To see participants you must login first !');
        }       
    }, [deletep, Token, organisatorID, navigate])

    return (
        <div>
          {edit && <form onSubmit={(e) => {
                    e.preventDefault();

                    fetch(`http://localhost:8090/v1/participants/change/${edit.id}`, {
                                                method: "PATCH",
                                                headers: {
                                                    'Content-Type': 'application/json',
                                                },
                                                body: JSON.stringify({
                                                    name: e.target.name.value,
                                                    surname: e.target.surname.value,
                                                    email: e.target.email.value,
                                                    birthday: e.target.birthday.value,
                                                })
                                            })
                                                .then(res => res.json())
                                                .then(res => {

                                                    setDeletep(deletep + 1)
                                                    setEdit(null)
                                                })
                                                .catch(error => console.log(error));
                    
}}>
                    <label>Name</label>
                    <input type="text" name="name" defaultValue={edit.name} required minLength='3' maxLength='20'/>

                    <label>Surname</label>
                    <input type="text" name="surname" defaultValue={edit.surname}  required minLength='3' maxLength='20'/>

                    <label>Email</label>
                    <input type="email" name="email" defaultValue={edit.email} required minLength='3' maxLength='20'/>
                    <label>Birthday</label>

                    <input type="date" name="birthday" defaultValue={edit.birthday} required/>
                    <div className="Add">
                        <button type="submit">Edit</button>
                    </div>
                </form> }



            <h2>Participants</h2>
            {participants && participants.length === 0 && <h2 className="no-p">You dont have any participants ...</h2>}
            <div className="addPatricipant-button-wrap">
                <Link className="add-participant" to='/participant-add'>Add Participant</Link>
            </div>

            
            {participants && <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Name</th>
                        <th>Birthday</th>
                        <th>Delete or edit</th>
                    </tr>
                </thead>
                {participants && participants.map((participant, num) => {
                    return (
                        <tbody key={num}>
                            <tr>
                                <td>{participant.name}</td>
                                <td>{participant.surname}</td>
                                <td>{participant.email}</td>
                                <td>{participant.birthday}</td>
                                <td>


                                <span className="Delete" onClick={() => {
                                    fetch(`http://localhost:8090/v1/participants/${participant.id}`, {
                                        method: "DELETE"
                                    })
                                        .then(res => res.json())
                                        .then(res => {
                                            setDeletep(deletep + 1)
                                        })
                                        .catch(error => console.log(error))
                                }
                                }>Delete</span>
                                    /
                                    <span className="Edit" onClick={() => {
                                    
                                            setEdit({
                                                name: participant.name,
                                                surname: participant.surname,
                                                email: participant.email,
                                                birthday: participant.birthday,
                                                id: participant.id
                                            })

                                }
                                }>Edit</span>

                                    
                                </td>
                            </tr>
                        </tbody>

                    )
                })}
            </table>
            }
            

        </div>
    )
}

export default Participants;