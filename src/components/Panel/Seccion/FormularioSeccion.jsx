import React, { useState } from 'react';
import InputText from '../UI/InputTexto';
import InputNumerico from '../UI/InputNumerico';
import InputSelect from '../UI/InputSelect';

// Datos de ejemplo - En una aplicación real vendrían como props o de una API
const cursos = [
    { codigoCurso: "INF-113", nombreCurso: "Introduccion a la Computación 1" },
    { codigoCurso: "INF-114", nombreCurso: "Programación 1" },
    { codigoCurso: "INF-115", nombreCurso: "Base de Datos 1" }
];

const salas = [
    { codigoSala: "1-108", nombreSala: "Sala 1-108" },
    { codigoSala: "1-145", nombreSala: "Sala 1-145" },
    { codigoSala: "1-150", nombreSala: "Sala 1-150" }
];

const profesores = [
    { codigoProfesor: "P001", nombreProfesor: "Hugo Araya" },
    { codigoProfesor: "P002", nombreProfesor: "Pedro Perez" },
    { codigoProfesor: "P003", nombreProfesor: "Juan Perez" }
];

export default function FormularioSeccion() {
    const [seccion, setSeccion] = useState({
        numeroSeccion: 0,
        codigoCurso: '',
        bloques: [],
        codigoSalaCatedra: '',
        codigoProfesor: '',
        codigoSalaLaboratorio: '',
        cantidadEstudiantes: 0,
    });
    
    const estilo_submit_button = "w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

    const handleSubmit = (e) => {
        e.preventDefault();
        //onSubmit(seccion);
        setSeccion({
            numeroSeccion: 0,
            codigoCurso: '',
            bloques: [],
            codigoSalaCatedra: '',
            codigoProfesor: '',
            codigoSalaLaboratorio: '',
            cantidadEstudiantes: 0,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <InputNumerico
                label="Número de Sección"
                value={seccion.numeroSeccion}
                onChange={(newValue) => setSeccion({ ...seccion, numeroSeccion: newValue })}
                required={true}
            />
            <InputSelect
                label="Curso"
                value={seccion.codigoCurso}
                onChange={(newValue) => setSeccion({ ...seccion, codigoCurso: newValue })}
                options={cursos}
                valueKey="codigoCurso"
                labelKey="nombreCurso"
                placeholder="Seleccione un curso"
                required={true}
            />
            <InputSelect
                label="Profesor"
                value={seccion.codigoProfesor}
                onChange={(newValue) => setSeccion({ ...seccion, codigoProfesor: newValue })}
                options={profesores}
                valueKey="codigoProfesor"
                labelKey="nombreProfesor"
                placeholder="Seleccione un profesor"
                required={true}
            />
            <InputSelect
                label="Sala de Cátedra"
                value={seccion.codigoSalaCatedra}
                onChange={(newValue) => setSeccion({ ...seccion, codigoSalaCatedra: newValue })}
                options={salas}
                valueKey="codigoSala"
                labelKey="nombreSala"
                placeholder="Seleccione una sala"
                required={true}
            />
            <InputSelect
                label="Sala de Laboratorio"
                value={seccion.codigoSalaLaboratorio}
                onChange={(newValue) => setSeccion({ ...seccion, codigoSalaLaboratorio: newValue })}
                options={salas}
                valueKey="codigoSala"
                labelKey="nombreSala"
                placeholder="Seleccione una sala"
                required={true}
            />
            <InputNumerico
                label="Cantidad de Estudiantes"
                value={seccion.cantidadEstudiantes}
                onChange={(newValue) => setSeccion({ ...seccion, cantidadEstudiantes: newValue })}
                required={true}
            />
            <button type="submit" className={estilo_submit_button}>Crear Sección</button>
        </form>
    );
} 