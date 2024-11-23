import { Profesor } from '../entities/Profesor';
import profesores from '../data/profesores.json';

class ProfesorRepository {
    private profesores: Profesor[] = profesores;
    subscribers: (() => void)[] = [];

    subscribe(callback: () => void): void {
        this.subscribers.push(callback);
    }

    private notifySubscribers(): void {
        this.subscribers.forEach(callback => {
            callback();
        });
    }

    getAll(): Profesor[] {
        return this.profesores;
    }

    getById(codigo: number): Profesor | undefined {
        return this.profesores.find(profesor => profesor.codigo === codigo);
    }

    create(profesor: Profesor): void {
        this.profesores.push(profesor);
        this.notifySubscribers();
    }

    update(profesor: Profesor): void {
        const index = this.profesores.findIndex(p => p.codigo === profesor.codigo);
        if (index !== -1) {
            this.profesores[index] = profesor;
            this.notifySubscribers();
        }
    }

    delete(codigo: number): void {
        const index = this.profesores.findIndex(profesor => profesor.codigo === codigo);
        if (index !== -1) {
            this.profesores.splice(index, 1);
            this.notifySubscribers();
        }
    }
}

// Crear una instancia global
const profesorRepository = new ProfesorRepository();
export default profesorRepository; 