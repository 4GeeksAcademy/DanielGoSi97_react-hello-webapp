import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export const AddNewContact = () => {

    const navigate = useNavigate()
    const { id } = useParams()
    const [contact, setContact] = useState({
            name: "",
            email: "",
            phone: "",
            address: ""
        })

    useEffect(() => {
        if (id != null) {
            fetch(`https://playground.4geeks.com/contact/agendas/Agenda_Persona_01/contacts`)
                .then(reponse => reponse.json())
                .then(data => {
                    //console.log("API:", data);
                    const contactEditado = data.contacts.find((contact) => contact.id == id);
                    if (contactEditado) setContact(contactEditado);
                });
        }
    }, [id])
    
        const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
         };
        const handleSubmit = (e) => {
        e.preventDefault();

        let url;
        if(id != null) { url = `https://playground.4geeks.com/contact/agendas/Agenda_Persona_01/contacts/${id}`}
        else { url = `https://playground.4geeks.com/contact/agendas/Agenda_Persona_01/contacts`} 


        let method;
        if(id != null) {
            method = "PUT";
        } else {
            method = "POST";
        }

        fetch(url, {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(contact)
        })
        .then(() => navigate("/"));
    };

    return(
        <div className="container mt-5 text-start">
            <h1 className="text-center">{id ? "Actualizar Contacto" : "Agregar Contacto"}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input name="name" value={contact.name} className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input name="email" value={contact.email} className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Telefono</label>
                    <input name="phone" value={contact.phone} className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Direccion</label>
                    <input name="address" value={contact.address} className="form-control" onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary w-100">Guardar</button>
                <Link to="/" className="d-block text-center mt-3">Volver a lista de contactos</Link>
            </form>
        </div>
    )
}
