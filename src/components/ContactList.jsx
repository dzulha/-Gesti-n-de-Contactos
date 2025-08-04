    import React, { useContext } from "react";
    import { ContactContext } from "../Context/ContactContext";
    import ContactCard from "./ContactCard";

    function ContactList() {
    const { contacts } = useContext(ContactContext);

    // ✅ Verificar si contacts no es un arreglo válido
    if (!Array.isArray(contacts)) {
        return <p className="text-danger">❌ Error al cargar los contactos.</p>;
    }

    return (
        <div className="container mt-4">
        <h2 className="mb-4">Lista de contactos</h2>

        {contacts.length === 0 ? (
            <p className="text-muted">No hay contactos disponibles.</p>
        ) : (
            contacts.map((contact) => (
            <ContactCard key={contact.uid} contact={contact} />
            ))
        )}
        </div>
    );
    }

    export default ContactList;
