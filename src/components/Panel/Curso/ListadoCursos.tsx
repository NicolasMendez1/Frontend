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
        /*
        cursoRepository.subscribe(cargarCursos);
        return () => {
            cursoRepository.unsubscribe(cargarCursos);
        };
        */
    }, []);

    if (loading) {
        return <div>Cargando cursos...</div>;
    }

    return (
        <ul className="space-y-2">
            {cursos.map((curso, index) => (
                <li key={index} className="bg-white p-4 rounded-md shadow">
                    <h3 className="font-bold">{curso.nombre}</h3>
                    <p>Código: {curso.codigo}</p>
                    <p>Nivel: {curso.nivel}</p>
                    <p>Horas Cátedra: {curso.horasCatedra}</p>
                    <p>Horas Laboratorio: {curso.horasLaboratorio}</p>
                    <p>Cantidad de Estudiantes: {curso.cantidadDeEstudiantes}</p>
                    <p>Es Atemporal: {curso.esAtemporal ? 'Si' : 'No'}</p>
                    <p>Es Curso General: {curso.esCursoGeneral ? 'Si' : 'No'}</p>
                </li>
            ))}
        </ul>
    );
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


