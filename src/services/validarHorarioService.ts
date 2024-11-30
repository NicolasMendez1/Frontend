
class ValidarHorarioService {
    async validarHorario(): Promise<any> {
        try {
            const response = await fetch('http://localhost:3000/validarHorario');
            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.error);
                throw new Error(errorData.error);
            }
        } catch (error) {
            console.error('Error al validar el horario:', error);
            throw new Error();
        }
    }
}


export const validarHorarioService = new ValidarHorarioService();
(window as any).validarHorarioService = validarHorarioService; 
export default validarHorarioService;

