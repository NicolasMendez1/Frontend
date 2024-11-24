import { Profesor } from '../entities/Profesor';

class ProfesorRepository {
    private profesores: Profesor[] = [];
    subscribers: (() => void)[] = [];

    constructor() {
        this.fetchProfesores();
    }

    subscribe(callback: () => void): void {
        this.subscribers.push(callback);
    }

    unsubscribe(callback: () => void): void {
        this.subscribers = this.subscribers.filter(sub => sub !== callback);
    }

    notifySubscribers(): void {
        this.subscribers.forEach(callback => {
            callback();
        });
    }

    async fetchProfesores(): Promise<void> {
        try {
            const response = await fetch('http://localhost:3000/profesores');
            if (!response.ok) {
                throw new Error('Error al obtener los profesores');
            }
            this.profesores = await response.json();
            //this.notifySubscribers();
        } catch (error) {
            console.error('Error fetching profesores:', error);
        }
    }

    async getAll(): Promise<Profesor[]> {
        await this.fetchProfesores();
        console.log("Profesores:", this.profesores);
        return this.profesores;
    }

    async createProfesor(profesor: Profesor): Promise<void> {
        const response = await fetch('http://localhost:3000/profesores', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(profesor)
        });
        if (!response.ok) {
            throw new Error('Error al crear el profesor');
        }
        this.notifySubscribers();
    }
}

const profesorRepository = new ProfesorRepository();
(window as any).profesorRepository = profesorRepository;
export default profesorRepository; 



/*
const oracledb = require('oracledb');

// Configuración de la conexión con la base de datos Oracle
const dbConfig = {
  user: 'tu_usuario',
  password: 'tu_contraseña',
  connectString: 'tu_cadena_de_conexión' // Ejemplo: 'localhost/XE'
};

// Función para llamar a la función PL/SQL y obtener el resultado
async function obtenerEstadoBloquesDias(codigoProfesor) {
  let connection;

  try {
    // Establecer conexión con la base de datos Oracle
    connection = await oracledb.getConnection(dbConfig);

    // Ejecutar la función PL/SQL
    const result = await connection.execute(
      `BEGIN

         :resultado := obtener_estado_bloques_dias(:codigo_profesor);
       END;`,
      {
        codigo_profesor: codigoProfesor, // Parámetro de entrada: código del profesor
        resultado: { dir: oracledb.BIND_OUT, type: oracledb.DB_TYPE_ARRAY } // Parámetro de salida: array retornado por la función
      }
    );

    // El resultado se encuentra en la propiedad "outBinds" del resultado
    const estadoBloquesDias = result.outBinds.resultado;

    // Imprimir el resultado
    console.log('Resultado del procedimiento:', estadoBloquesDias);

    return estadoBloquesDias;
  } catch (err) {
    console.error('Error al ejecutar la función:', err);
    throw err;
  } finally {
    // Cerrar la conexión
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error('Error al cerrar la conexión:', err);
      }
    }
  }
}

// Llamar la función con el código de un profesor (ejemplo 123)
obtenerEstadoBloquesDias(123).then((resultado) => {
  console.log('Resultado recibido en Node.js:', resultado);
}).catch((err) => {
  console.error('Error:', err);
});
*/

/*

CREATE OR REPLACE PROCEDURE obtener_profesores_con_disponibilidad (
    resultado OUT SYS_REFCURSOR
) AS
BEGIN
    OPEN resultado FOR
    SELECT p.CODIGO,
           p.NOMBRE,
           p.APELLIDO_PATERNO,
           p.APELLIDO_MATERNO,
           p.ES_FULL_TIME,
           p.BLOQUES_DISPONIBLES,
           (SELECT obtener_estado_bloques_dias(p.CODIGO) FROM DUAL) AS ESTADO_BLOQUES_DIAS
      FROM GH_PROFESOR p;
END obtener_profesores_con_disponibilidad;
*/

/*
-- Crear una función que retorna un VARRAY de enteros
CREATE OR REPLACE FUNCTION obtener_disponibilidad_profesor (
    p_codigo_profesor IN NUMBER
) RETURN num_array
IS
    v_resultado num_array := num_array();  
BEGIN
    FOR i IN 1..12 LOOP   
        FOR j IN 1..6 LOOP  
            IF EXISTS (
                SELECT 1
                FROM profesor_bloque_dia
                WHERE codigo_profesor = p_codigo_profesor
                  AND codigo_bloque = i
                  AND codigo_dia = j
            ) THEN
                v_resultado.EXTEND;  
                v_resultado(v_resultado.LAST) := 1;
            ELSE
                v_resultado.EXTEND;  
                v_resultado(v_resultado.LAST) := 0;
            END IF;
        END LOOP;
    END LOOP;

    RETURN v_resultado;
END obtener_disponibidad_pro;




CREATE OR REPLACE TYPE GH_PROFESOR_CON_DISPONIBILIDAD AS OBJECT (
    codigo          NUMBER,
    nombre          VARCHAR2(50),
    apellido_paterno VARCHAR2(50),
    apellido_materno VARCHAR2(50),
    es_full_time    NUMBER,
    estado_bloques_dias ARRAY_NUMEROS 
);

CREATE OR REPLACE TYPE GH_TABLA_PROFESOR_CON_DISPONIBILIDAD AS TABLE OF GH_PROFESOR_CON_DISPONIBILIDAD;

CREATE OR REPLACE PROCEDURE GH_obtener_profesores_con_disponibilidad (
    resultado OUT GH_TABLA_PROFESOR_CON_DISPONIBILIDAD
) AS
BEGIN
    resultado := GH_TABLA_PROFESOR_CON_DISPONIBILIDAD();

    FOR p IN (SELECT p.CODIGO,
                     p.NOMBRE,
                     p.APELLIDO_PATERNO,
                     p.APELLIDO_MATERNO,
                     p.ES_FULL_TIME,
                     (SELECT GH_obtener_disponibilidad_profesor(p.CODIGO) FROM DUAL) AS ESTADO_BLOQUES_DIAS
              FROM GH_PROFESOR p) 
    LOOP
        resultado.EXTEND;
        resultado(resultado.LAST) := GH_PROFESOR_CON_DISPONIBILIDAD(
            p.CODIGO, 
            p.NOMBRE, 
            p.APELLIDO_PATERNO, 
            p.APELLIDO_MATERNO, 
            p.ES_FULL_TIME, 
            p.ESTADO_BLOQUES_DIAS
        );
    END LOOP;
END GH_obtener_profesores_con_disponibilidad;
*/