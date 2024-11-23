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
            this.notifySubscribers();
        } catch (error) {
            console.error('Error fetching cursos:', error);
        }
    }

    async getAll(): Promise<Curso[]> {
        await this.fetchCursos();
        return this.cursos;
    }
}

const cursoRepository = new CursoRepository();
(window as any).cursoRepository = cursoRepository; 
export default cursoRepository;

/*
import { Curso } from '../entities/Curso';

class CursoRepository {
    private cursos: Curso[] = [];
    subscribers: (() => void)[] = [];

    constructor() {
        this.fetchCursos();
    }

    subscribe(callback: () => void): void {
        this.subscribers.push(callback);
    }

    notifySubscribers(): void {
        this.subscribers.forEach(callback => {
            callback();
        });
    }

    async fetchCursos(): Promise<void> {
        try {
            const response = await fetch('http://localhost:3000/api/cursos');
            if (!response.ok) {
                throw new Error('Error al obtener los cursos');
            }
            this.cursos = await response.json();
            this.notifySubscribers();
        } catch (error) {
            console.error('Error fetching cursos:', error);
        }
    }

    async getAll(): Promise<Curso[]> {
        if (this.cursos.length === 0) {
            await this.fetchCursos();
        }
        return this.cursos;
    }

    async getById(codigo: string): Promise<Curso | undefined> {
        if (this.cursos.length === 0) {
            await this.fetchCursos();
        }
        return this.cursos.find(curso => curso.codigo === codigo);
    }

    async create(curso: Curso): Promise<void> {
        this.cursos.push(curso);
        this.notifySubscribers();
    }

    async update(curso: Curso): Promise<void> {
        const index = this.cursos.findIndex(c => c.codigo === curso.codigo);
        if (index !== -1) {
            this.cursos[index] = curso;
            this.notifySubscribers();
        }
    }

    async delete(codigo: string): Promise<void> {
        const index = this.cursos.findIndex(curso => curso.codigo === codigo);
        if (index !== -1) {
            this.cursos.splice(index, 1);
            this.notifySubscribers();
        }
    }
}   

const cursoRepository = new CursoRepository();
(window as any).cursoRepository = cursoRepository; 
export default cursoRepository;


*/