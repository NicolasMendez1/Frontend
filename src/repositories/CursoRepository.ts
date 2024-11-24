import { Curso } from '../entities/Curso';

class CursoRepository {
    cursos: Curso[] = [];
    subscribers: (() => void)[] = [];

    constructor() {
        this.fetchCursos();
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

    async fetchCursos(): Promise<void> {
        try {
            const response = await fetch('http://localhost:3000/cursos');
            if (!response.ok) {
                throw new Error('Error al obtener los cursos');
            }
            this.cursos = await response.json();
        } catch (error) {
            console.error('Error fetching cursos:', error);
        }
    }

    async getAll(): Promise<Curso[]> {
        await this.fetchCursos();
        return this.cursos;
    }

    async create(curso: Curso): Promise<void> {
        const response = await fetch('http://localhost:3000/cursos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(curso)
        });
        if (!response.ok) {
            throw new Error('Error al crear el curso');
        }
        this.notifySubscribers();
    }
}

const cursoRepository = new CursoRepository();
(window as any).cursoRepository = cursoRepository; 
export default cursoRepository;
