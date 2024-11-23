import React, { useState } from 'react';

function ElementoAgregado({ texto, onDelete }) {
	const texto1 = "INF-113\nIntroduccion a la Computación 1\nSala 1-108\nHugo Araya";
  
	const toggleInfo = (e) => {
		e.stopPropagation();
	};

	return (
	  <div onClick={toggleInfo} className="mt-2 p-2 bg-blue-50 text-blue-700 rounded border border-blue-200 w-full max-w-[200px] break-words whitespace-pre-line shadow-lg relative">
		<div>{texto1}</div>
		<button
		  onClick={onDelete}
		  className="absolute top-1 right-1 p-1 bg-blue-500 text-white rounded-full hover:bg-blue-700"
		>
		  Eliminar
		</button>
	  </div>
	);
  }
  
export default ElementoAgregado;


/*

INF-113 
Introduccion a la Computación 1 
Sala 1-108 
Hugo Araya
*/