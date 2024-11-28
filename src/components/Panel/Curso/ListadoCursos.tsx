import { useState, useEffect } from 'react';
import cursoRepository from '../../../repositories/CursoRepository';
import { Curso } from '../../../entities/Curso';

export default function ListadoCursos() {
    const [cursos, setCursos] = useState<Curso[]>([]);
    const [loading, setLoading] = useState(true);

    const cargarCursos = async () => {
        if (loading) {
            try {
                setLoading(true);
                const cursosData = await cursoRepository.getAll();
                console.log(cursosData);
                setCursos(cursosData);
            } catch (error) {
                console.error('Error al cargar los cursos:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        cargarCursos();
        cursoRepository.subscribe(cargarCursos);
        return () => {
            cursoRepository.unsubscribe(cargarCursos);
        };
    }, []);

    if (loading) {
        return <div>Cargando cursos...</div>;
    }


    const handleDelete = async (curso: Curso) => {
        await cursoRepository.delete(curso.codigo);
    }

    return (
        <ul className="space-y-2">
          {cursos.map((curso, index) => (
            <li key={index} className="bg-white p-4 rounded-md shadow flex justify-between items-start">
              <div>
                <h3 className="font-bold">{curso.nombre}</h3>
                <p>Código: {curso.codigo}</p>
                <p>Nivel: {curso.nivel}</p>
                <p>Horas Cátedra: {curso.horasCatedra}</p>
                <p>Horas Laboratorio: {curso.horasLaboratorio}</p>
                <p>Cantidad de Estudiantes: {curso.cantidadDeEstudiantes}</p>
                {/* <p>Es Atemporal: {curso.esAtemporal ? 'Si' : 'No'}</p> */}
                {/* <p>Es Curso General: {curso.esCursoGeneral ? 'Si' : 'No'}</p> */}
              </div>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                aria-label={`Delete curso ${curso.nombre}`}
                onClick={() => handleDelete(curso)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )
}


/*
return (
    <ul className="space-y-2">
        {cursos.map((curso , index) => (
            <li key={index} className="bg-white p-4 rounded-md shadow">
                <Seccion seccion={curso} />
            </li>
        ))}
    </ul>
);
*/


