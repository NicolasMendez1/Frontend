// Bloque.js
import React, { useState, useEffect } from 'react';
import seccionRepository from '../../repositories/SeccionRepository';
import seccionBloqueDiaRepository from '../../repositories/SeccionBloqueDiaRepository';

export default function Bloque({ dia, bloque, secciones: seccionesIniciales }) {
	const [seccionesLocales, setSeccionesLocales] = useState(seccionesIniciales);
	
	// Actualizar secciones locales cuando cambien las props
	useEffect(() => {
		setSeccionesLocales(seccionesIniciales);
	}, [seccionesIniciales]);

	const diaACodigo = {
		'Lunes': 1,
		'Martes': 2,
		'Miércoles': 3,
		'Jueves': 4,
		'Viernes': 5,
		'Sábado': 6
	};

	const handleClick = async () => {
		const [seccionSeleccionada, esBloqueLaboratorio] = seccionRepository.getSeccionSeleccionada();

		console.log(seccionSeleccionada);
		if (seccionSeleccionada) {
			const nuevaSeccionBloqueDia = {
				codigoSeccion: seccionSeleccionada.codigo,
				codigoCurso: seccionSeleccionada.codigoCurso,
				codigoDia: diaACodigo[dia],
				codigoBloque: bloque,
				esBloqueDeLaboratorio: esBloqueLaboratorio
			};

			try {
				await seccionBloqueDiaRepository.create(nuevaSeccionBloqueDia);
				
				// Agregar la nueva sección al estado local
				const nuevaSeccionCompleta = {
					...nuevaSeccionBloqueDia,
					infoSeccion: seccionSeleccionada
				};
				
				setSeccionesLocales(prevSecciones => [...prevSecciones, nuevaSeccionCompleta]);
				
				// Limpiar la selección después de insertar
				//seccionRepository.setSeccionSeleccionada(null);
			} catch (error) {
				console.error('Error al asignar sección al bloque:', error);
			}
		}
	};

	const handleDelete = async (codigoSeccion, codigoCurso) => {
		console.log(codigoSeccion, codigoCurso, bloque, diaACodigo[dia]);
		await seccionBloqueDiaRepository.delete(codigoSeccion, codigoCurso, bloque, diaACodigo[dia]);
		console.log('Eliminar sección');
	};

	return (
		<td 
		  onClick={handleClick}
		  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border hover:bg-gray-50 cursor-pointer"
		>
		  {seccionesLocales && seccionesLocales.length > 0 ? (
			<div className="flex flex-col gap-1">
			  {seccionesLocales.map((seccion, index) => (
				<div 
				  key={`${seccion.codigoSeccion}-${index}`}
				  className="p-1 rounded bg-gray-50 hover:bg-gray-100 transition-colors relative group"
				>
				  <div className="font-medium">
					{seccion.codigoSeccion} - {seccion.codigoCurso}
				  </div>
				  {seccion.infoSeccion && (
					<>
					  <div className="text-xs text-gray-600">
						Profesor: {profesorRepository.getProfesorByCodigo(seccion.infoSeccion.codigoProfesor)?.nombre + ' ' + profesorRepository.getProfesorByCodigo(seccion.infoSeccion.codigoProfesor)?.apellidoPaterno + ' ' + profesorRepository.getProfesorByCodigo(seccion.infoSeccion.codigoProfesor)?.apellidoMaterno}
					  </div>
					  {!seccion.esBloqueDeLaboratorio && (
					  <div className="text-xs text-gray-600">
						Sala Catedra: {seccion.infoSeccion.codigoSalaCatedra}
					  </div>
					  )}
					  {seccion.esBloqueDeLaboratorio && (
					  <div className="text-xs text-gray-600">
						Sala Laboratorio: {seccion.infoSeccion.codigoSalaLaboratorio}
					  </div>
					  )}
					</>
				  )}
				  {seccion.esBloqueDeLaboratorio && (
					<div className="text-xs text-blue-600 font-medium mt-1">(Lab)</div>
				  )}
				  <button
					className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 text-white p-1 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						handleDelete(seccion.codigoSeccion, seccion.codigoCurso)
					}}
				  >
					<svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
					</svg>
					<span className="sr-only">Eliminar sección</span>
				  </button>
				</div>
			  ))}
			</div>
		  ) : (
			<div className="h-12"></div>
		  )}
		</td>
	  );
}


//TABLE DATA 