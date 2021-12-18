import { IBalance } from "src/app/models/balance.model";
import { environment } from "src/environments/environment";

export const balanceState: IBalance = {
    value: environment.balance
}