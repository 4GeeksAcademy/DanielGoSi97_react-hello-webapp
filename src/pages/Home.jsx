import { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {

  	const {store, dispatch} =useGlobalReducer()

	function getContactList(){
		fetch('https://playground.4geeks.com/contact/agendas/Agenda_Persona_01/contacts')
		.then((reponse) => reponse.json())
		.then((data) => {
			//console.log(data.contacts)
			dispatch({
				type: "load_contacts",
				payload: data.contacts
			})			
		})
	}

	useEffect(()=>{
		getContactList()
	},[])

	function deleteContact(idToDelete){
    console.log("deleteContact" + idToDelete)

	const requestOptions ={
		method: "DELETE"
	};

	fetch('https://playground.4geeks.com/contact/agendas/Agenda_Persona_01/contacts/'+idToDelete, requestOptions)
	.then((data) => {
		console.log(data)
		getContactList()
	})		
    // dispatch({
    //   type: "delete_contact",
    //   payload: {indexToDelete: indexToDelete}
    // })
  }

	return (
		<div className="container mt-5">
			<div className="d-flex justify-content-between aling-items-center mb-4">
				<h1>Contact List</h1>
				<button type="button" className="btn btn-success">Add New Contact</button>
			</div>
			<br />
			<ul className="list-group w-100">
			{/* Map over the 'todos' array from the store and render each item as a list element */}
			{store && store.contacts?.map((item) => {
			return (
				<li
				key={item.id}  // React key for list items.
				className="list-group-item d-flex justify-content-between"> 
				<div className="me-4">
					<img src="https://picsum.photos/id/1050/150/150"
					className="rounded-circle border" 
					alt="Foto" />
				</div>
					<div className="flex-grow-1 text-start">
						<p>Name: {item.name}</p>
						<p>Phone: {item.phone}</p>
						<p>Email: {item.email}</p>
						<p>Address: {item.address}</p>							          
					</div>
					<button className="me-4">Actualizar</button>
					<button className="me-4" onClick={() => deleteContact(item.id)}>Eliminar</button>
				</li>
			);
			})}
		</ul>
		<br />
		</div>
	);
}; 