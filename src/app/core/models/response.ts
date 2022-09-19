
export interface Response {
    status: number;
    message: string;
}

export interface ResponseObj<T> {
    response: Response;
    results: T;
}
