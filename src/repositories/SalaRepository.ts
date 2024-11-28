import { Sala } from '../entities/Sala';

class SalaRepository {
    private salas: Sala[] = [];
    subscribers: (() => void)[] = [];

    constructor() {
        this.fetchSalas();
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

    async fetchSalas(): Promise<void> {
        try {
            const response = await fetch('http://localhost:3000/salas');
            if (!response.ok) {
                throw new Error('Error al obtener las salas');
            }
            this.salas = await response.json();
            //this.notifySubscribers();
        } catch (error) {
            console.error('Error fetching salas:', error);
        }
    }

    async getAll(): Promise<Sala[]> {
        await this.fetchSalas();
        return this.salas;
    }

    async create(sala: Sala): Promise<void> {
        console.log("Creando sala:", sala);
        const response = await fetch('http://localhost:3000/salas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(sala)
        });
        if (!response.ok) {
            const errorMessage = 'Error al crear la sala';  
            alert(errorMessage);
            throw new Error(errorMessage);
        }
        this.notifySubscribers();
    }

    async delete(id: string): Promise<void> {
        const response = await fetch(`http://localhost:3000/salas/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Error al eliminar la sala');
        }
        this.notifySubscribers();
    }
}

export const salaRepository = new SalaRepository();
(window as any).salaRepository = salaRepository; 
export default salaRepository;

