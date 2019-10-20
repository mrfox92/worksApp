

interface RootObject {
    ok: boolean;
    trabajo: Trabajo;
    detalle: Detalle[];
}

interface Detalle {
    title: string;
    description: string;
    status: boolean;
    trabajo?: string;
    _id?: string;
}

interface Trabajo {
    title: string;
    description: string;
    annotation: string;
    total: number;
    _id?: string;
    createdAt?: string;
    cliente?: string;
}

interface Cliente {
    nombre: string;
    numContacto: number;
    _id?: string;
}
