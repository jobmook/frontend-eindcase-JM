export interface Cursus {
    Titel: string,
    Startdatum: string,
    Duur: number,
    Cursuscode:string
}

export function createCursus(overrides?: Partial<Cursus>): Cursus {
    return {
        Titel: '',
        Startdatum: '',
        Duur: 0,
        Cursuscode: '',
        ...overrides
    }
}