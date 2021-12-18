import { IFormValidationMessages } from "./form.model";

export interface IRequest {
    name: string
    mail: string
    document: string
    valueRequest: number
    datePayable?: string
}

export interface IFormMessages {
    name: IFormValidationMessages[]
    mail: IFormValidationMessages[]
    document: IFormValidationMessages[]
    valueRequest: IFormValidationMessages[]
    datePayable?: IFormValidationMessages[]
}