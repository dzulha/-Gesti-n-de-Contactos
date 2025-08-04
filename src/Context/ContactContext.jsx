import { createContext, useEffect, useState } from "react";

export const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);

  const loadContacts = async () => {
    try {
      const res = await fetch("https://playground.4geeks.com/contact/agendas/dzulha/contacts");
      const data = await res.json();

      // Validación por si algo sale mal
      if (!Array.isArray(data.contacts)) {
        throw new Error("La respuesta no contiene una lista válida de contactos.");
      }

      setContacts(data.contacts);
    } catch (error) {
      console.error("Error al cargar contactos:", error);
      setContacts([]); // ✅ Evitar dejarlo en undefined en caso de error
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

const deleteContact = async (id) => {
  try {
    await fetch(`https://playground.4geeks.com/contact/agendas/dzulha/contacts/${id}`, {
      method: "DELETE"
    });
    await loadContacts(); // 👈 importante para actualizar después del borrado
  } catch (error) {
    console.error("Error al eliminar contacto:", error);
  }
};


  return (
    <ContactContext.Provider value={{ contacts, loadContacts, deleteContact }}>
      {children}
    </ContactContext.Provider>
  );
};
