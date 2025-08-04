    //====================== Importaciones ======================
    import { useContext } from "react";
    import { ContactContext } from "../Context/ContactContext";
    import ContactCard from "../components/ContactCard";
    import { useNavigate } from "react-router-dom";

    //====================== Componente ======================
    function Home() {
    const { contacts } = useContext(ContactContext);
    const navigate = useNavigate();

    return (
        <div>
        {/* ====================== Navbar ====================== */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
            <a className="navbar-brand" href="#">
            Contactos
            </a>
            <div className="ms-auto">
            <button className="btn btn-primary" onClick={() => navigate("/add")}>
                Agregar nuevo
            </button>
            </div>
        </nav>

        {/* ====================== Contactos ====================== */}
        <div className="container mt-4">
            <h1 className="text-center mb-4">Lista de Contactos</h1>

            {contacts.length === 0 ? (
            <p className="text-center text-muted">
                No hay contactos disponibles.
            </p>
            ) : (
            contacts
                .filter((contact) => contact && contact.name) // 👈 Filtrar contactos válidos
                .map((contact) => (
                <ContactCard key={contact.uid} contact={contact} />
                ))
            )}
        </div>
        </div>
    );
    }

    //====================== Exportación ======================
    export default Home;
