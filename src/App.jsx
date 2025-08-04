import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListUsers from "./pages/listUsers";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import ListEventos from "./pages/listEventos";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateEvent from "./pages/CreateEvent";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/eventos" element={
            <ProtectedRoute>
              <ListEventos/>
            </ProtectedRoute>
          }/>
          <Route path="/users" element={
            <ProtectedRoute>
              <ListUsers />
            </ProtectedRoute>
          }/>
          <Route path="/CreateEvent" element={
            <ProtectedRoute>
              <CreateEvent />
            </ProtectedRoute>
          }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
