import { Seccion } from '../entities/Seccion';

class SeccionRepository {
    secciones: Seccion[] = [];
    seccionSeleccionada: Seccion | null = null;
    esBloqueLaboratorio: boolean = false;
    subscribers: (() => void)[] = [];

    constructor() {
        this.fetchSecciones();
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

    async fetchSecciones(): Promise<void> {
        try {
            const response = await fetch('http://localhost:3000/secciones');
            if (!response.ok) {
                throw new Error('Error al obtener las secciones');
            }
            this.secciones = await response.json();
        } catch (error) {
            console.error('Error fetching secciones:', error);
        }
    }

    async getAll(): Promise<Seccion[]> {
        await this.fetchSecciones();
        return this.secciones;
    }

    async create(seccion: Seccion): Promise<void> {
        const response = await fetch('http://localhost:3000/secciones', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(seccion)
        });
        if (!response.ok) {
            const errorMessage = 'Error al crear la sección';
            alert(errorMessage);
            throw new Error(errorMessage);
        }
        this.notifySubscribers();
    }

    async delete(id: string, codigoCurso: string): Promise<void> {
        const response = await fetch(`http://localhost:3000/secciones/${id}/${codigoCurso}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Error al eliminar la sección');
        }
        this.notifySubscribers();
    }

    setSeccionSeleccionada(seccion: Seccion, esBloqueLaboratorio: boolean): void {
        this.seccionSeleccionada = seccion;
        this.esBloqueLaboratorio = esBloqueLaboratorio;
    }

    getSeccionSeleccionada(): [Seccion, boolean] | null {
        return this.seccionSeleccionada ? [this.seccionSeleccionada, this.esBloqueLaboratorio] : null;
    }
}

const seccionRepository = new SeccionRepository();
(window as any).seccionRepository = seccionRepository;
export default seccionRepository;
