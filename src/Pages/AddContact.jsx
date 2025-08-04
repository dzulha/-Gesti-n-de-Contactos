    import { useState, useContext } from "react";
    import { useNavigate } from "react-router-dom";
    import { ContactContext } from "../Context/ContactContext";

    function AddContact() {
    const navigate = useNavigate();
    const { loadContacts } = useContext(ContactContext);

    const [form, setForm] = useState({
        full_name: "",
        email: "",
        phone: "",
        address: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = "https://playground.4geeks.com/contact/agendas/dzulha/contacts";
    const bodyData = {
    name: form.full_name,
    email: form.email,
    phone: form.phone,
    address: form.address,
    agenda_slug: "dzulha",
    };



        console.log("🚀 Enviando POST a:", url);
        console.log("🧾 Datos:", bodyData);

        try {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bodyData),
        });

        const data = await res.json();
        console.log("📦 Respuesta del servidor:", data);

        if (res.ok) {
            await loadContacts();
            navigate("/");
        } else {
            alert("Error al guardar el contacto:\n" + JSON.stringify(data, null, 2));

        }
        } catch (error) {
        console.error("❌ Error de red:", error);
        alert("No se pudo conectar con el servidor.");
        }
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "500px" }}>
        <h2 className="text-center mb-4">Add a new contact</h2>
        <form onSubmit={handleSubmit}>
            <input
            className="form-control mb-3"
            placeholder="Full Name"
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            required
            />
            <input
            className="form-control mb-3"
            placeholder="Enter email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            />
            <input
            className="form-control mb-3"
            placeholder="Enter phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            />
            <input
            className="form-control mb-3"
            placeholder="Enter address"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            />
            <button className="btn btn-primary w-100 mb-2" type="submit">
            save
            </button>
        </form>
        <p className="text-center">
            <a href="/" className="text-decoration-underline">
            or get back to contacts
            </a>
        </p>
        </div>
    );
    }

    export default AddContact;
