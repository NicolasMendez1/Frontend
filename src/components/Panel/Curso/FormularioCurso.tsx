import { useState } from 'react';
import InputText from '../UI/InputTexto';
import InputNumerico from '../UI/InputNumerico';
import CursoRepository from '../../../repositories/CursoRepository';
import { Curso } from '../../../entities/Curso';

export default function FormularioCurso() {
    const [curso, setCurso] = useState<Curso>({ 
        codigo: '', 
        nombre: '', 
        horasCatedra: 0, 
        horasLaboratorio: 0, 
        nivel: 0,
        esAtemporal: false,
        esCursoGeneral: false,
        cantidadDeEstudiantes: 0 
    });
    const estilo_submit_button = "w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

    const handleSubmit = (e: any) => {
        e.preventDefault();
        CursoRepository.create(curso);
        setCurso({ 
            codigo: '', 
            nombre: '', 
            horasCatedra: 0, 
            horasLaboratorio: 0, 
            nivel: 0,
            esAtemporal: false,
            esCursoGeneral: false,
            cantidadDeEstudiantes: 0 
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <InputText	
                label="Código del Curso"
                value={curso.codigo}
                onChange={(newValue) => setCurso({ ...curso, codigo: newValue })}
                required={true}
            />
            <InputText	
                label="Nombre del Curso"
                value={curso.nombre}
                onChange={(newValue) => setCurso({ ...curso, nombre: newValue })}
                required={true}
            />
            <InputNumerico
                label="Horas Cátedra"
                value={curso.horasCatedra}
                onChange={(newValue) => setCurso({ ...curso, horasCatedra: newValue })}
                required={true}
            />
            <InputNumerico
                label="Horas Laboratorio"
                value={curso.horasLaboratorio}
                onChange={(newValue) => setCurso({ ...curso, horasLaboratorio: newValue })}
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
                value={curso.cantidadDeEstudiantes}
                onChange={(newValue) => setCurso({ ...curso, cantidadDeEstudiantes: newValue })}
                required={true}
            />            
            <button type="submit" className={estilo_submit_button}>Crear Curso</button>
        </form>
    );
}
