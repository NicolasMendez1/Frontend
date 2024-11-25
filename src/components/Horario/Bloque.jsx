// Bloque.js
import React from 'react';

export default function Bloque({ dia, bloque, secciones }) {
	return (
		<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border">
			{secciones && secciones.length > 0 ? (
				<div className="flex flex-col gap-1">
					{secciones.map((seccion, index) => (
						<div 
							key={`${seccion.codigoSeccion}-${index}`}
							className="p-1 rounded bg-gray-50"
						>
							<div className="font-medium">{seccion.codigoSeccion}</div>
							<div className="text-xs">{seccion.codigoCurso}</div>
							{seccion.esBloqueDeLaboratorio && (
								<div className="text-xs text-blue-600">(Lab)</div>
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