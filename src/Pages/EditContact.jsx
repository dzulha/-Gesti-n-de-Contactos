    //====================== Importaciones ======================
    import { useContext, useEffect, useState } from "react";
    import { ContactContext } from "../Context/ContactContext";
    import { useNavigate, useParams } from "react-router-dom";

    //====================== Componente ======================
    function EditContact() {
    const { contacts, loadContacts } = useContext(ContactContext);
    const navigate = useNavigate();
    const { id } = useParams();

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    // Cargar los datos del contacto
    useEffect(() => {
        const contact = contacts.find((c) => c.uid === id);
        if (contact) {
        setForm({
            name: contact.name || "",
            email: contact.email || "",
            phone: contact.phone || "",
            address: contact.address || ""
        });
        }
    }, [contacts, id]);

    // Actualizar el estado del formulario
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Enviar cambios
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        await fetch(`https://playground.4geeks.com/contact/agendas/dzulha/contacts/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...form, agenda_slug: "dzulha" })
        });

        await loadContacts();
        navigate("/");
        } catch (error) {
        console.error("Error al actualizar contacto:", error);
        }
    };

    //====================== Render ======================
    return (
        <div className="container mt-5">
        <h2 className="mb-4">Editar Contacto</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
                type="text"
                className="form-control"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
            />
            </div>

            <div className="mb-3">
            <label className="form-label">Email</label>
            <input
                type="email"
                className="form-control"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
            />
            </div>

            <div className="mb-3">
            <label className="form-label">Teléfono</label>
            <input
                type="text"
                className="form-control"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
            />
            </div>

            <div className="mb-3">
            <label className="form-label">Dirección</label>
            <input
                type="text"
                className="form-control"
                name="address"
                value={form.address}
                onChange={handleChange}
                required
            />
            </div>

            <button type="submit" className="btn btn-primary">Guardar Cambios</button>
        </form>
        </div>
    );
    }

    //====================== Exportación ======================
    export default EditContact;
