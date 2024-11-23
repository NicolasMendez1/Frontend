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

    async getById(codigo: string): Promise<Sala | undefined> {
        if (this.salas.length === 0) {
            await this.fetchSalas();
        }
        return this.salas.find(sala => sala.codigo === codigo);
    }
}

export const salaRepository = new SalaRepository();
(window as any).salaRepository = salaRepository; 