import { useEffect, useState } from "react"
import { Seccion } from "../../entities/Seccion";
import seccionRepository from "../../repositories/SeccionRepository";


export default function SeccionSeleccionada(){
    const [seccion, setSeccion] = useState<Seccion | null>(null);
    const [esBloqueLaboratorio, setEsBloqueLaboratorio] = useState<boolean>(false);

    useEffect(() => {
        setSeccion(seccionRepository.seccionSeleccionada);
        setEsBloqueLaboratorio(seccionRepository.esBloqueLaboratorio);
        seccionRepository.suscribeToSeccionSeleccionada(() => {
            setSeccion(seccionRepository.seccionSeleccionada);
            setEsBloqueLaboratorio(seccionRepository.esBloqueLaboratorio);
        });
    }, []);

    const deseleccionarSeccion = () => {
        seccionRepository.setSeccionSeleccionada(null, false);
    }

    return (
        <>
        {seccion && (
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-800">
                Agregando bloque <span className="ml-2 text-blue-600">{esBloqueLaboratorio ? "laboratorio" : "cátedra"} </span>de la sección:
                <span className="ml-2 text-blue-600">{seccion.codigo} {seccion.codigoCurso}</span>
              </h2>
              <button
                onClick={deseleccionarSeccion}
                className="flex items-center px-4 py-2 text-lg font-medium text-red-600 bg-red-100 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
              >
                <span className="mr-2">&#x2715;</span>
                Deseleccionar
              </button>
            </div>
          </div>
        )}
      </>
    
    )
}
