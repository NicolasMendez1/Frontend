import { Sala } from '../entities/Sala';
import salas from '../data/salas.json';

export class SalaRepository {
    private salas: Sala[] = salas;

    getAll(): Sala[] {
        return this.salas;
    }

    getById(codigo: string): Sala | undefined {
        return this.salas.find(sala => sala.codigo === codigo);
    }

    create(sala: Sala): void {
        this.salas.push(sala);
    }

    update(sala: Sala): void {
        const index = this.salas.findIndex(s => s.codigo === sala.codigo);
        if (index !== -1) {
            this.salas[index] = sala;
        }
    }

    delete(codigo: string): void {
        const index = this.salas.findIndex(sala => sala.codigo === codigo);
        if (index !== -1) {
            this.salas.splice(index, 1);
        }
    }
} 