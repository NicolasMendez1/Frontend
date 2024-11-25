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

