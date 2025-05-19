import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


// Recuerda que tendrá que hacer el GET al inicio 
// y mostrarlo en las inputs

const Edit = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Página EDIT</h1>
            <div className="container">
                <div className="card mt-4 p-4">
                    <form>
                        <div>
                            <label for="inputName" className="form-label">Full Name</label>
                            <input
                                type="test"
                                className="form-control"
                                id="inputName"
                                placeholder='Full Name'
                            />
                        </div>

                        <div>
                            <label for="inputEmail" className="form-label">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="inputPhone"
                                placeholder='Email Address'
                            />
                        </div>


                        <div>
                            <label for="inputPhone" className="form-label">Phone</label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputPhone"
                                placeholder='Phone'
                            />
                        </div>

                        <div>
                            <label for="inputAddres" className="form-label">Address</label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputAddress"
                                placeholder='Address'
                            />
                        </div>


                        <button
                            type="submit"
                            className="btn btn-primary mt-3"
                            onClick={() => {
                                //Lógica para hacer el POST 
                                console.log("Se envió el formulario")
                                navigate("/");
                            }}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
            <Link to="/">
                <button className="btn btn-primary">Back home</button>
            </Link>
        </div>
    )
}

export default Edit;
