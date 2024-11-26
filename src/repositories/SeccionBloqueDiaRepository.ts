import { SeccionBloqueDia } from '../entities/SeccionBloqueDia';

class SeccionBloqueDiaRepository {
    private seccionesBloqueDia: SeccionBloqueDia[] = [];
    private subscribers: (() => void)[] = [];

    constructor() {
        this.fetchSeccionesBloqueDia();
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

    async fetchSeccionesBloqueDia(): Promise<void> {
        try {
            const response = await fetch('http://localhost:3000/seccionesBloqueDia');
            if (!response.ok) {
                throw new Error('Error al obtener las secciones bloque día');
            }
            this.seccionesBloqueDia = await response.json();
        } catch (error) {
            console.error('Error fetching seccionesBloqueDia:', error);
        }
    }

    async getAll(): Promise<SeccionBloqueDia[]> {
        await this.fetchSeccionesBloqueDia();
        return this.seccionesBloqueDia;
    }

    async create(seccionBloqueDia: SeccionBloqueDia): Promise<void> {
        const response = await fetch('http://localhost:3000/seccionesBloqueDia', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(seccionBloqueDia)
        });
        if (!response.ok) {
            throw new Error('Error al crear la sección bloque día');
        }
        //this.notifySubscribers();
    }

    async update(seccionBloqueDia: SeccionBloqueDia): Promise<void> {
        const response = await fetch(`http://localhost:3000/seccionesBloqueDia/${seccionBloqueDia.codigoSeccion}/${seccionBloqueDia.codigoCurso}/${seccionBloqueDia.codigoBloque}/${seccionBloqueDia.codigoDia}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(seccionBloqueDia)
        });
        if (!response.ok) {
            throw new Error('Error al actualizar la sección bloque día');
        }
        //this.notifySubscribers();
    }

    async delete(codigoSeccion: string, codigoCurso: string, codigoBloque: number, codigoDia: number): Promise<void> {
        const response = await fetch(`http://localhost:3000/seccionesBloqueDia/${codigoSeccion}/${codigoCurso}/${codigoBloque}/${codigoDia}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Error al eliminar la sección bloque día');
        }
        this.notifySubscribers();
    }
}

const seccionBloqueDiaRepository = new SeccionBloqueDiaRepository();
(window as any).seccionBloqueDiaRepository = seccionBloqueDiaRepository;
export default seccionBloqueDiaRepository;


