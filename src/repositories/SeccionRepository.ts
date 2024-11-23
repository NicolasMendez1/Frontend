import { Seccion } from '../entities/Seccion';
import secciones from '../data/secciones.json';

export class SeccionRepository {
    private secciones: Seccion[] = secciones;

    getAll(): Seccion[] {
        return this.secciones;
    }

    getById(codigo: string): Seccion | undefined {
        return this.secciones.find(seccion => seccion.codigo === codigo);
    }

    create(seccion: Seccion): void {
        this.secciones.push(seccion);
    }

    update(seccion: Seccion): void {
        const index = this.secciones.findIndex(s => s.codigo === seccion.codigo);
        if (index !== -1) {
            this.secciones[index] = seccion;
        }
    }

    delete(codigo: string): void {
        const index = this.secciones.findIndex(seccion => seccion.codigo === codigo);
        if (index !== -1) {
            this.secciones.splice(index, 1);
        }
    }
} 