import { useState } from "react";
import Panel from "./components/Panel/Panel"
import MatrizHorario from "./components/Horario/MatrizHorario"
import SeccionSeleccionada from "./components/SeccionSeleccionada/SeccionSeleccionada"
import Login from "./components/Login/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      {isLoggedIn ? (
        <div className="flex h-screen bg-gray-100 p-5 gap-5">
          <Panel />
          <div className="flex-1 p-6 overflow-auto">
            <h1 className="text-3xl font-bold mb-4">Horario Académico</h1>
            <SeccionSeleccionada />
            <MatrizHorario />
          </div>
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </>
  )
}

export default App
