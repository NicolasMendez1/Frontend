import React, { useState, useEffect } from 'react';
import Bloque from './Bloque';
import seccionBloqueDiaData from '../../data/seccionBloqueDia.json';
import seccionRepository from '../../repositories/SeccionRepository';
import seccionBloqueDiaRepository from '../../repositories/SeccionBloqueDiaRepository';
import cursoRepository from '../../repositories/CursoRepository';
import { validarHorarioService } from "../../services/validarHorarioService";
import exportPDF from "../PDF/pdfUtil.js"


export default function MatrizHorario() {
  const [secciones, setSecciones] = useState([]);
  const [seccionesBloqueDia, setSeccionesBloqueDia] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [nivelSeleccionado, setNivelSeleccionado] = useState('todos');

  useEffect(() => {
    const cargarSecciones = async () => {
      const seccionesData = await seccionRepository.getAll();
      console.log("Secciones cargadas:", seccionesData);
      setSecciones(seccionesData);
    };
    cargarSecciones();

    const cargarCursos = async () => {
      const cursosData = await cursoRepository.getAll();
      console.log("Cursos cargados:", cursosData);
      setCursos(cursosData);
    };
    cargarCursos();

    const cargarSeccionesBloqueDia = async () => {
      const seccionesBloqueDiaData = await seccionBloqueDiaRepository.getAll();
      console.log("SeccionesBloqueDia cargadas:", seccionesBloqueDiaData);
      setSeccionesBloqueDia(seccionesBloqueDiaData);
    };
    cargarSeccionesBloqueDia();
    
    // Suscribirse a cambios
    seccionRepository.subscribe(cargarSecciones);
    seccionBloqueDiaRepository.subscribe(cargarSeccionesBloqueDia);
    cursoRepository.subscribe(cargarCursos);

    // Limpieza
    return () => {
      seccionRepository.unsubscribe(cargarSecciones);
      seccionBloqueDiaRepository.unsubscribe(cargarSeccionesBloqueDia);
      cursoRepository.unsubscribe(cargarCursos);
    };
  }, []);

  const niveles = [1, 3, 5, 7, 9, 11];
  const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const bloques = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const diaACodigo = {
    'Lunes': 1,
    'Martes': 2,
    'Miércoles': 3,
    'Jueves': 4,
    'Viernes': 5,
    'Sábado': 6
  };

  const obtenerSecciones = (dia, bloque) => {
    const codigoDia = diaACodigo[dia];
    const seccionesBloque = seccionesBloqueDia.filter(seccionBloque => 
      seccionBloque.codigoDia === codigoDia && 
      seccionBloque.codigoBloque === bloque
    );

    if(seccionesBloque.length > 0) {
      console.log(seccionesBloque);
    }

    const seccionesEnriquecidas = seccionesBloque.map(seccionBloque => {
      const infoSeccion = secciones.find(s => 
        s.codigo === seccionBloque.codigoSeccion && 
        s.codigoCurso === seccionBloque.codigoCurso
      );
      const infoCurso = cursos.find(c => c.codigo === seccionBloque.codigoCurso);
      return {
        ...seccionBloque,
        infoSeccion,
        infoCurso
      };
    });

    if(seccionesBloque.length > 0) {
      console.log(seccionesEnriquecidas);
    }

    // Si está seleccionado 'todos', retorna todas las secciones
    if (nivelSeleccionado === 'todos') {
      return seccionesEnriquecidas;
    }

    // Convertir nivelSeleccionado a número para la comparación
    const nivel = parseInt(nivelSeleccionado);
    
    const seccionesFiltradas = seccionesEnriquecidas.filter(seccion => {
      const nivelSeccion = seccion.infoCurso?.nivel;
      return nivelSeccion === nivel;
    });

    return seccionesFiltradas;
  };

  const estilo_dia = "px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider";
  const etiqueta_dia = (dia) => {
    return <th key={dia} className={estilo_dia}> {dia}</th>;
  }

  const estilo_numero_bloque = "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900";
  const etiqueta_numero_de_bloque = (bloque) => {
    return <td className={estilo_numero_bloque}>{bloque}</td>;
  }

  return (
    <div>
      <div className="mb-4 p-4 bg-gray-50 rounded-lg">
        <label className="mr-2 font-medium text-gray-700">Nivel:</label>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setNivelSeleccionado('todos')}
            className={`px-4 py-2 rounded-md ${
              nivelSeleccionado === 'todos'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Todos los niveles
          </button>
          {niveles.map((nivel) => (
            <button
              key={nivel}
              onClick={() => setNivelSeleccionado(nivel)}
              className={`px-4 py-2 rounded-md ${
                nivelSeleccionado === nivel
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Nivel {nivel}
            </button>
          ))}
                      <button onClick={async () => {
              try {
                await validarHorarioService.validarHorario();
                exportPDF(nivelSeleccionado);
              } catch (error) {
                console.error('Error printing PDF:', error);
              }
            }}
              className="px-4 py-2 rounded-md bg-blue-500 text-white font-bold hover:bg-blue-700"
            >Validar horario y generar PDF</button>
        </div>
      </div>
      <header  className="App-header">
      <div className="overflow-x-auto shadow-lg">
        <table id="Horario" className="min-w-full table-auto divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className={estilo_dia}>Bloque</th>
              {dias.map((dia) => etiqueta_dia(dia))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {console.log(seccionesBloqueDia)}
            {bloques.map((bloque) => (
              <tr key={bloque}>
                {etiqueta_numero_de_bloque(bloque)}
                {dias.map((dia) => {
                  const secciones = obtenerSecciones(dia, bloque);
                  return (
                    <Bloque 
                      key={`${dia}-${bloque}`} 
                      dia={dia} 
                      bloque={bloque}
                      secciones={secciones} // Ahora pasamos un array de secciones
                    />
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </header>
    </div>
  );
}

