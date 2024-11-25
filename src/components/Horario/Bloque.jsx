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
		const seccionSeleccionada = seccionRepository.getSeccionSeleccionada();
		console.log(seccionSeleccionada);
		if (seccionSeleccionada) {
			const nuevaSeccionBloqueDia = {
				codigoSeccion: seccionSeleccionada.codigo,
				codigoCurso: seccionSeleccionada.codigoCurso,
				codigoDia: diaACodigo[dia],
				codigoBloque: bloque,
				esBloqueDeLaboratorio: false
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
							className="p-1 rounded bg-gray-50 hover:bg-gray-100 transition-colors"
						>
							<div className="font-medium">
								{seccion.codigoSeccion} - {seccion.codigoCurso}
							</div>
							{seccion.infoSeccion && (
								<>
									<div className="text-xs text-gray-600">
										Profesor: {seccion.infoSeccion.codigoProfesor}
									</div>
									<div className="text-xs text-gray-600">
										Sala Catedra: {seccion.infoSeccion.codigoSalaCatedra}
									</div>
									<div className="text-xs text-gray-600">
										Sala Laboratorio: {seccion.infoSeccion.codigoSalaLaboratorio}
									</div>
								</>
							)}
							{seccion.esBloqueDeLaboratorio && (
								<div className="text-xs text-blue-600 font-medium mt-1">(Lab)</div>
							)}
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