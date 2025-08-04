//====================== Importaciones ======================
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ContactProvider } from "./Context/ContactContext";
import Home from "./Pages/Home";
import AddContact from "./Pages/AddContact";
import EditContact from "./Pages/EditContact";

//====================== Componente principal ======================
function App() {
  return (
    <ContactProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddContact />} />
          <Route path="/edit/:id" element={<EditContact />} />
        </Routes>
      </Router>
    </ContactProvider>
  );
}

//====================== Exportación ======================
export default App;
