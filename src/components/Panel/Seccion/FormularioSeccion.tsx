import React, { useState, useEffect } from 'react';
import InputNumerico from '../UI/InputNumerico';
import InputSelect from '../UI/InputSelect';
import cursoRepository from '../../../repositories/CursoRepository';
import profesorRepository from '../../../repositories/ProfesorRepository';
import salaRepository from '../../../repositories/SalaRepository';
import { Curso } from '../../../entities/Curso';
import { Profesor } from '../../../entities/Profesor';
import { Sala } from '../../../entities/Sala';
import seccionRepository from '../../../repositories/SeccionRepository';
import { Seccion } from '../../../entities/Seccion';
import InputText from '../UI/InputTexto';


export default function FormularioSeccion() {
    const [seccion, setSeccion] = useState<Seccion>({
        codigo: '',
        codigoCurso: '',
        codigoSalaCatedra: '',
        codigoProfesor: 0,
        codigoSalaLaboratorio: '',
        cantidadDeEstudiantesSeccion: 0,
    });

    const [cursos, setCursos] = useState<Curso[]>([]);
    const [profesores, setProfesores] = useState<Profesor[]>([]);
    const [salas, setSalas] = useState<Sala[]>([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [cursosData, profesoresData, salasData] = await Promise.all([
                    cursoRepository.getAll(),
                    profesorRepository.getAll(),
                    salaRepository.getAll()
                ]);
                setCursos(cursosData);
                setProfesores(profesoresData);
                setSalas(salasData);
            } catch (error) {
                console.error('Error cargando datos:', error);
            }
        };

        loadData();
    }, []);
    
    const estilo_submit_button = "w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //onSubmit(seccion);
        console.log(seccion);
        seccionRepository.create(seccion);
        setSeccion({
            codigo: '',
            codigoCurso: '',
            codigoSalaCatedra: '',
            codigoProfesor: 0,
            codigoSalaLaboratorio: '',
            cantidadDeEstudiantesSeccion: 0,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <InputText
                label="Código de Sección"
                value={seccion.codigo}
                onChange={(newValue: string) => setSeccion({ ...seccion, codigo: newValue })}
                required={true}
            />
            <InputSelect
                label="Curso"
                value={seccion.codigoCurso}
                onChange={(newValue: string) => setSeccion({ ...seccion, codigoCurso: newValue })}
                options={cursos}
                valueKey="codigo"
                labelKey="nombre"
                placeholder="Seleccione un curso"
                required={true}
            />
            <InputSelect
                label="Profesor"
                value={seccion.codigoProfesor}
                onChange={(newValue: string) => setSeccion({ ...seccion, codigoProfesor: parseInt(newValue) })}
                options={profesores}
                valueKey="codigo"
                labelKey="nombre"
                placeholder="Seleccione un profesor"
                required={true}
            />
            <InputSelect
                label="Sala de Cátedra"
                value={seccion.codigoSalaCatedra}
                onChange={(newValue: string) => setSeccion({ ...seccion, codigoSalaCatedra: newValue })}
                options={salas}
                valueKey="codigo"
                labelKey="nombre"
                placeholder="Seleccione una sala"
                required={true}
            />
            <InputSelect
                label="Sala de Laboratorio"
                value={seccion.codigoSalaLaboratorio}
                onChange={(newValue: string) => setSeccion({ ...seccion, codigoSalaLaboratorio: newValue })}
                options={salas}
                valueKey="codigo"
                labelKey="nombre"
                placeholder="Seleccione una sala"
                required={true}
            />
            <InputNumerico
                label="Cantidad de Estudiantes"
                value={seccion.cantidadDeEstudiantesSeccion}
                onChange={(newValue: number) => setSeccion({ ...seccion, cantidadDeEstudiantesSeccion: newValue })}
                required={true}
            />
            <button type="submit" className={estilo_submit_button}>Crear Sección</button>
        </form>
    );
} 