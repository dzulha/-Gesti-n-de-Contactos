    import { useState, useContext } from "react";
    import { useNavigate } from "react-router-dom";
    import { ContactContext } from "../Context/ContactContext";

    function AddContact() {
    const navigate = useNavigate();
    const { addContact } = useContext(ContactContext);

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

        const contactData = {
        name: form.full_name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        agenda_slug: "dzulha",
        };

        try {
        await addContact(contactData);
        navigate("/");
        } catch (error) {
        console.error("❌ Error al agregar contacto:", error);
        alert("Hubo un error al agregar el contacto.");
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
            Save
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
