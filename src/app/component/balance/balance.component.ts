import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ICredit } from 'src/app/models/credit.model';
import { IRequest } from 'src/app/models/request.model';
import { setBalance } from 'src/app/store/actions/balance.action';
import { setCreditList } from 'src/app/store/actions/credit.action';
import { AppState } from 'src/app/store/app.state';
import { selectCreditList } from 'src/app/store/selectors/credit.selector';
import { selectRequest } from 'src/app/store/selectors/resquest.selector';
import { environment } from 'src/environments/environment';
import { OptionComponent } from './option/option.component';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private db: AngularFirestore,
    private store: Store<AppState>,
    private _bottomSheet: MatBottomSheet
  ) {
    this.loaderListDB();
    this.data$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      if (value.document === '') {
        this.store.dispatch(setBalance({ balance: { value: 0 } }));
      } else {
        this.calculateBalance(value.document)
      }
    });
  }

  ngOnInit(): void {}

  calculateBalance(document: string): void {
    this.List$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      let balance: number = 0;
      value.forEach((element) => {
        if (element.document === document && !element.paidOut && element.okay) {
          balance += element.valueRequest;
        }
      });
      this.store.dispatch(setBalance({ balance: { value: environment.balance - balance } }));
    });
  }

  openBottomSheet(): void {
    this._bottomSheet.open(OptionComponent);
  }

  loaderListDB(): void {
    this.getCreditList().subscribe((value) => {
      const creditList: ICredit[] = [];
      value.forEach((element: any) => {
        if (
          element.payload.doc.data().okay &&
          !element.payload.doc.data().paidOut
        ) {
          creditList.push({
            id: element.payload.doc.id,
            name: element.payload.doc.data().name,
            mail: element.payload.doc.data().mail,
            document: element.payload.doc.data().document,
            valueRequest: element.payload.doc.data().valueRequest,
            okay: element.payload.doc.data().okay,
            paidOut: element.payload.doc.data().paidOut,
            datePayable: element.payload.doc.data().datePayable,
          });
        }
      });
      this.store.dispatch(setCreditList({ creditList }));
    });
  }

  getCreditList(): Observable<any> {
    return this.db.collection('zinode').snapshotChanges();
  }

  get data$(): Observable<IRequest> {
    return this.store.pipe(select(selectRequest));
  }
  get List$(): Observable<ICredit[]> {
    return this.store.pipe(select(selectCreditList));
  }
}
