import { createContext, useEffect, useState } from "react";

export const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);

  const agendaSlug = "dzulha";
  const baseUrl = "https://playground.4geeks.com/contact/agendas";

  const loadContacts = async () => {
    try {
      const res = await fetch(`${baseUrl}/${agendaSlug}/contacts`);
      const data = await res.json();

      if (!Array.isArray(data.contacts)) {
        throw new Error("La respuesta no contiene una lista válida de contactos.");
      }

      setContacts(data.contacts);
    } catch (error) {
      console.error("Error al cargar contactos:", error);
      setContacts([]);
    }
  };

  const addContact = async (contactData) => {
    try {
      const res = await fetch(`${baseUrl}/${agendaSlug}/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(contactData)
      });

      if (res.status === 404) {
        console.warn("Agenda no encontrada, se intentará crearla...");

        const agendaRes = await fetch(`${baseUrl}/${agendaSlug}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ slug: agendaSlug })
        });

        if (!agendaRes.ok) {
          throw new Error("No se pudo crear la agenda.");
        }

        // Intenta guardar el contacto otra vez después de crear la agenda
        const retryRes = await fetch(`${baseUrl}/${agendaSlug}/contacts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(contactData)
        });

        if (!retryRes.ok) {
          const retryError = await retryRes.json();
          throw new Error(`Error al guardar el contacto: ${JSON.stringify(retryError)}`);
        }
      } else if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`Error al guardar el contacto: ${JSON.stringify(errorData)}`);
      }

      await loadContacts();
    } catch (error) {
      console.error(error.message);
      alert(`Error al guardar el contacto:\n${error.message}`);
    }
  };

  const deleteContact = async (id) => {
    try {
      await fetch(`${baseUrl}/${agendaSlug}/contacts/${id}`, {
        method: "DELETE"
      });
      await loadContacts();
    } catch (error) {
      console.error("Error al eliminar contacto:", error);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  return (
    <ContactContext.Provider value={{ contacts, loadContacts, deleteContact, addContact }}>
      {children}
    </ContactContext.Provider>
  );
};
