import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";



// Recuerda que tendrá que hacer el GET al inicio 
// y mostrarlo en las inputs

const Edit = () => {
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();
    const { id } = useParams(); //ID del contacto al que llamamos desde la url


    //Buscar el contacto actual en la store
    const contactToEdit = store.contacts.find(contact => contact.id === parseInt(id));


    //Estados locales para editar el formulario
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });


    useEffect(() => {
        if (contactToEdit) {
            setFormData({
                name: contactToEdit.name || "",
                email: contactToEdit.email || "",
                phone: contactToEdit.phone || "",
                address: contactToEdit.address || ""
            });
        }
    }, [contactToEdit])




    const handleChange = (e) => {
        setFormData({
            ...formData, //copia los otros campos que ya teníamos en el formulario
            [e.target.name]: e.target.value// Acceder al "name" del inmput, 
            //obtiene el valor escrito por el usuario
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            const res = await fetch(`https://playground.4geeks.com/contact/agendas/MohamedRouias/contacts/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...formData,
                    slug: "MohamedRouias" //Necesarui para la API
                })
            });

            if (!res.ok) throw new Error("Error al actualizar el contacto!!!");

            const updatedContact = await res.json();

            //Actualizar el estado global
            dispatch({ type: "edit_contact", payload: updatedContact });

            //Volver a Homer
            navigate("/");
        } catch (error) {
            console.log("Error aleditar contacto", error);
        }
    };

    if (!contactToEdit) {
        return <p>CONTACTO NO ENCONTRADO</p>
    }


    return (
        <div>

            <div className="container">
                <h1>Editar Contacto</h1>
                <div className="card mt-4 p-4">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label for="inputName" className="form-label">Full Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name='name'
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label for="inputEmail" className="form-label">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>


                        <div>
                            <label for="inputPhone" className="form-label">Phone</label>
                            <input
                                type="text"
                                className="form-control"
                                name='phone'
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label for="inputAddres" className="form-label">Address</label>
                            <input
                                type="text"
                                className="form-control"
                                name='address'
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </div>


                        <button type="submit" className="btn btn-primary mt-4 w-100">
                            Save
                        </button>


                    </form>
                    <Link to="/">
                        <button className="btn btn-primary mt-3">Back home</button>
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default Edit;
