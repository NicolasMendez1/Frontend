import Panel from "./components/Panel/Panel"
import MatrizHorario from "./components/Horario/MatrizHorario"
function App() {

  return (
    <>
      <div className="flex h-screen bg-gray-100 p-5 gap-5">
        <Panel />
        <div className="flex-1 p-6 overflow-auto">
          <h1 className="text-3xl font-bold mb-4">Horario Académico</h1>
          <MatrizHorario />
        </div>
      </div>
    </>
  )
}

export default App
