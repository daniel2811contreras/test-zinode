import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ICredit } from 'src/app/models/credit.model';
import { setCreditList } from 'src/app/store/actions/credit.action';
import { setRequest } from 'src/app/store/actions/request.action';
import { AppState } from 'src/app/store/app.state';
import { selectCreditList } from 'src/app/store/selectors/credit.selector';
import { OptionComponent } from '../balance/option/option.component';

@Component({
  selector: 'app-list-credit',
  templateUrl: './list-credit.component.html',
  styleUrls: ['./list-credit.component.scss'],
})
export class ListCreditComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  creditList: ICredit[] = [];
  displayedColumns: string[] = ['valueRequest', 'name', 'action', 'action2'];

  constructor(
    private db: AngularFirestore,
    private store: Store<AppState>,
    private _bottomSheetRef: MatBottomSheetRef<ListCreditComponent>,
    private _bottomSheet: MatBottomSheet,
    private _snackBar: MatSnackBar,
  ) {
    this.List$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      this.creditList = value;
    });
  }

  ngOnInit(): void {}

  payBalance(credit: ICredit): void {
    this.editCredit(credit.id,{
      name: credit.name,
      document: credit.document,
      mail: credit.mail,
      valueRequest: credit.valueRequest,
      datePayable: credit.datePayable,
      okay: credit.okay,
      paidOut: true,
    }).then(() =>{
        this._snackBar.open(`elcredito de ${credit.name} por ${credit.valueRequest} fue pagado`)
    })
  }

  viewBalance(credit:ICredit): void {
    this.store.dispatch(setRequest({request: {
      name: credit.name,
      document: credit.document,
      mail: credit.mail,
      valueRequest: 0
    }}))
    this._bottomSheetRef.dismiss()
    this._bottomSheet.open(OptionComponent);
  }

  editCredit(id:string, data: any): Promise<any>{
    return this.db.collection('zinode').doc(id).update(data)
  }

  get List$(): Observable<ICredit[]> {
    return this.store.pipe(select(selectCreditList));
  }
}
