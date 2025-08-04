import React from "react";

function DeleteModal({ contact, onConfirm, onCancel }) {
  return (
    <div className="modal show fade" style={{ display: "block" }} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirmar eliminación</h5>
            <button type="button" className="btn-close" onClick={onCancel}></button>
          </div>
          <div className="modal-body">
            <p>¿Estás seguro de que deseas eliminar a <strong>{contact?.name}</strong>?</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onCancel}>
              Cancelar
            </button>
            <button className="btn btn-danger" onClick={() => onConfirm(contact.id)}>
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
