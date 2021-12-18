export interface ICredit {
  id: string;
  valueRequest: number;
  name: string;
  mail: string;
  document: string;
  datePayable?: string;
  okay: boolean;
  paidOut: boolean;
}
