    //====================== Importaciones ======================
    import React, { useContext, useState } from "react";
    import { ContactContext } from "../Context/ContactContext";
    import { useNavigate } from "react-router-dom";
    import DeleteModal from "./DeleteModal";

    //====================== Componente ======================
    function ContactCard({ contact }) {
    const { deleteContact } = useContext(ContactContext);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleDelete = async (uid) => {
        await deleteContact(uid);
        setShowModal(false);
    };

    return (
        <>
        <div className="card mb-3">
            <div className="card-body d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
                <img
                src={`https://ui-avatars.com/api/?name=${contact.name}`}
                className="rounded-circle me-3"
                alt="avatar"
                width={80}
                height={80}
                />
                <div>
                <h5>{contact.name}</h5>
                <p className="mb-1">
                    <i className="bi bi-geo-alt-fill me-2"></i>
                    {contact.address}
                </p>
                <p className="mb-1">
                    <i className="bi bi-telephone-fill me-2"></i>
                    {contact.phone}
                </p>
                <p className="mb-0">
                    <i className="bi bi-envelope-fill me-2"></i>
                    {contact.email}
                </p>
                </div>
            </div>

            <div>
                <button
                className="btn btn-outline-secondary btn-sm me-2"
                onClick={() => navigate(`/edit/${contact.id}`)}
                >
                <i className="bi bi-pencil"></i>
                </button>
                <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => setShowModal(true)}
                >
                <i className="bi bi-trash"></i>
                </button>
            </div>
            </div>
        </div>

        {showModal && (
            <DeleteModal
            contact={contact}
            onConfirm={handleDelete}
            onCancel={() => setShowModal(false)}
            />
        )}
        </>
    );
    }

    //====================== Exportación ======================
    export default ContactCard;
