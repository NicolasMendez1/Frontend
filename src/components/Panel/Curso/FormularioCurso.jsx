import React, { useState } from 'react';
import InputText from '../UI/InputTexto';
import InputNumerico from '../UI/InputNumerico';
import CursoRepository from '../../../repositories/CursoRepository';

export default function FormularioCurso() {
    const [curso, setCurso] = useState({ codigoCurso: '', nombreCurso: '', horasCatedra: 0, horasPractica: 0, nivel: 0, cantidadEstudiantes: 0 });
	const estilo_submit_button = "w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

    const handleSubmit = (e) => {
		e.preventDefault();
        CursoRepository.create(curso);
		setCurso({ codigoCurso: '', nombreCurso: '', horasCatedra: 0, horasPractica: 0, nivel: 0 , cantidadEstudiantes: 0 });
	};

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <InputText	
            label="Código del Curso"
            value={curso.codigoCurso}
            onChange={(newValue) => setCurso({ ...curso, codigoCurso: newValue })}
            required={true}
            />
            <InputText	
            label="Nombre del Curso"
            value={curso.nombreCurso}
            onChange={(newValue) => setCurso({ ...curso, nombreCurso: newValue })}
            required={true}
            />
            <InputNumerico
            label="Horas Cátedra"
            value={curso.horasCatedra}
            onChange={(newValue) => setCurso({ ...curso, horasCatedra: newValue })}
            required={true}
            />
            <InputNumerico
            label="Horas Práctica"
            value={curso.horasPractica}
            onChange={(newValue) => setCurso({ ...curso, horasPractica: newValue })}
            required={true}
            />	
            <InputNumerico
            label="Nivel"
            value={curso.nivel}
            onChange={(newValue) => setCurso({ ...curso, nivel: newValue })}
            required={true}
            />
            <InputNumerico
            label="Cantidad de Estudiantes"
            value={curso.cantidadEstudiantes}
            onChange={(newValue) => setCurso({ ...curso, cantidadEstudiantes: newValue })}
            required={true}
            />            
            <button type="submit" className={estilo_submit_button}>Crear Curso</button>
        </form>
    );
}
