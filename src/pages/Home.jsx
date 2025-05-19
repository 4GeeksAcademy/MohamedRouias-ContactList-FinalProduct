import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";



export const Home = () => {
	const { store, dispatch } = useGlobalReducer()

	useEffect(() => {
		cargarAgenda();
	}, []);

	const cargarAgenda = async () => {
		try {
			const res = await fetch("https://playground.4geeks.com/contact/agendas/MohamedRouias");
			if (res.status === 404) {
				console.log("no existe la agenda")
				crearAgenda();
				console.log("Agenda Creada!!!")
			}
			getAgenda();
			const data = await res.json();

			return Array.isArray(data) ? data : data.contacts || [];


		} catch (err) {
			console.error("Error al cargar la agenda:", err);
			return null;
		}
	};

	const crearAgenda = async (slug) => {
		try {
			const res = await fetch("https://playground.4geeks.com/contact/agendas/MohamedRouias", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ slug })

			});
			console.log("LA LISTA DE CONTACTOS HA SIDO CREADA!!")
			getAgenda();// NO SE SI HACE FALTA 
			if (!res.ok) throw new Error("Error al crear agenda");

			return true;
		} catch (err) {
			console.error("Error creando agenda:", err);
			return false;
		}
	}; //FUNCIONA

	const getAgenda = () => {
		fetch("https://playground.4geeks.com/contact/agendas/MohamedRouias")
			.then((res) => {
				if (!res.ok) throw new Error("Error al obtener tareas");
				return res.json();
			})
			.then((data) => {
				console.log(data)
				const contactos = Array.isArray(data) ? data : data.contacts || [];
				dispatch({ type: "set_contacts", payload: contactos });
				console.log("AQUÍ TIENES LA LISTA DE CONTACTOS")
			})

			.catch((err) => console.error("Fetch error:", err));
	}; //FUNCIONA



	const deleteContact = (id) => {
		fetch(`https://playground.4geeks.com/contact/agendas/MohamedRouias/contacts/${id}`, {
			method: "DELETE",
		})
			.then((res) => {
				if (!res.ok) throw new Error("Error al eliminar contacto");
				// Actualiza el store eliminando el contacto
				dispatch({ type: "delete_contact", payload: id });
			})
			.catch((err) => console.error("Delete error:", err));
	};






	return (
		<div className="text-center mt-5">
			<h1>CONTACT LIST</h1>
			<div className="container">
				<Link to="/add-contact">
					<button id="add-btn" className="btn btn-primary mb-3 ">Add Contact</button>
				</Link>
				<div className="container">
					<ul className="list-group">
						{/* Map over the 'todos' array from the store and render each contact as a list element */}
						{store && store.contacts?.map((contact, index) => {
							return (
								<li
									key={contact.id || index}  // React key for list items.
									className="list-group-item d-flex justify-content-between"
									style={{}}>

									{/* Link to the detail page of this todo. */}
									<img
										src="https://randomuser.me/api/portraits/men/75.jpg"
										alt="Profile"
										className="rounded-circle me-3"
										style={{ width: "50px", height: "50px", objectFit: "cover" }}
									/>
									<div className="">
										<div>
											<h4>{contact.name}</h4>
										</div>
										<div>
											<i className="fa-solid fa-envelope mx-2"></i>
											{contact.email}
										</div>
										<i className="fa-solid fa-phone-flip mx-2"></i>
										{contact.phone}
										<div>
											<i class="fa-solid fa-location-dot mx-2"></i>
											{contact.address}
										</div>
										
									</div>
									<div>
										<Link to={`/edit-contact/${contact.id}`}>

											<button className="btn me-2">
												<i className="fa-solid fa-pencil"></i>
											</button>
										</Link>
										<button className="btn btn-sm " onClick={() => deleteContact(contact.id)}>
											<i class="fa-solid fa-trash"></i>
										</button>
									</div>
								</li>
							);
						})}
					</ul>
					<br />

				</div>
			</div>


			<div class="card m-4 p-4">
				<h5 class="card-title">Special title treatment</h5>
				<p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
			</div>

		</div>
	);
}; 