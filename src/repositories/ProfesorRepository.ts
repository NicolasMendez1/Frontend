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
            this.notifySubscribers();
        } catch (error) {
            console.error('Error fetching profesores:', error);
        }
    }

    async getAll(): Promise<Profesor[]> {
        await this.fetchProfesores();
        return this.profesores;
    }

    async getById(codigo: number): Promise<Profesor | undefined> {
        if (this.profesores.length === 0) {
            await this.fetchProfesores();
        }
        return this.profesores.find(profesor => profesor.codigo === codigo);
    }
}

const profesorRepository = new ProfesorRepository();
(window as any).profesorRepository = profesorRepository;
export default profesorRepository; 