import { SeccionBloqueDia } from '../entities/SeccionBloqueDia';
import seccionBloqueDia from '../data/seccionBloqueDia.json';

export class SeccionBloqueDiaRepository {
    private seccionesBloqueDia: SeccionBloqueDia[] = seccionBloqueDia;

    getAll(): SeccionBloqueDia[] {
        return this.seccionesBloqueDia;
    }

    getByCodigos(codigoSeccion: string, codigoCurso: string): SeccionBloqueDia[] {
        return this.seccionesBloqueDia.filter(
            sbd => sbd.codigoSeccion === codigoSeccion && sbd.codigoCurso === codigoCurso
        );
    }

    create(seccionBloqueDia: SeccionBloqueDia): void {
        this.seccionesBloqueDia.push(seccionBloqueDia);
    }

    update(seccionBloqueDia: SeccionBloqueDia): void {
        const index = this.seccionesBloqueDia.findIndex(
            sbd => sbd.codigoSeccion === seccionBloqueDia.codigoSeccion && 
                  sbd.codigoCurso === seccionBloqueDia.codigoCurso &&
                  sbd.codigoBloque === seccionBloqueDia.codigoBloque &&
                  sbd.codigoDia === seccionBloqueDia.codigoDia
        );
        if (index !== -1) {
            this.seccionesBloqueDia[index] = seccionBloqueDia;
        }
    }

    delete(codigoSeccion: string, codigoCurso: string): void {
        this.seccionesBloqueDia = this.seccionesBloqueDia.filter(
            sbd => !(sbd.codigoSeccion === codigoSeccion && sbd.codigoCurso === codigoCurso)
        );
    }
} 