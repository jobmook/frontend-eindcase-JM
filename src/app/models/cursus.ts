export interface Cursus {
    Titel: string,
    Startdatum: Date,
    Duur: number,
    Cursuscode:string
}

export function createCursus(overrides?: Partial<Cursus>): Cursus {
    return {
        Titel: '',
        Startdatum: new Date(),
        Duur: 0,
        Cursuscode: '',
        ...overrides
    }
}