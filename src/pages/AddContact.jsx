import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const AddContact = () => {
  const { dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");




  const addContact = async (contactData, dispatch, navigate) => {
		try {
			const res = await fetch('https://playground.4geeks.com/contact/agendas/MohamedRouias/contacts', {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					...contactData,
					agenda_slug: "MohamedRouias"
				})
			});

			if (!res.ok) throw new Error("Error al crear contacto");

			const data = await res.json();

			// Añadir el nuevo contacto al store
			dispatch({ type: "add_contact", payload: data });

			// Volver a la home
			navigate("/");

		} catch (error) {
			console.error("Error al agregar contacto:", error);
		}
	};


  return (
    <div>
      <h1>Página ADDCONTACT</h1>
      <div className="container">
        <div className="card mt-4 p-4">
          <form>
            <div>
              <label for="inputName" className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                placeholder='Full Name'
                onChange={(e)=>setName(e.target.value)}
              />
            </div>

            <div>
              <label for="inputEmail" className="form-label">Email address</label>
              <input
                type="text"
                className="form-control"
                value={email}
                placeholder='Email Address'
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>


            <div>
              <label for="inputPhone" className="form-label">Phone</label>
              <input
                type="text"
                className="form-control"
                value={phone}
                placeholder='Email Address'
                onChange={(e)=>setPhone(e.target.value)}
              />
            </div>

            <div>
              <label for="inputAddres" className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                value={address}
                placeholder='Address'
                onChange={(e)=>setAddress(e.target.value)}
              />
            </div>


            <button
              type="submit"
              className="btn btn-primary mt-3"
              onClick={(e) => {
                e.preventDefault();  // Evita recargar la página

                const newContact = {
                  name,
                  email,
                  phone,
                  address
                };

                addContact(newContact, dispatch, navigate);
              }}
            >
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

export default AddContact
