import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { IBalance } from 'src/app/models/balance.model';
import { AppState } from 'src/app/store/app.state';
import { selectBalance } from 'src/app/store/selectors/balance.selector';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  balance: number = environment.balance

  constructor(
    private store: Store<AppState>,
    private _bottomSheetRef: MatBottomSheetRef<OptionComponent>
    ) {
      this.balance$.pipe(takeUntil(this.destroy$)).subscribe(value=>{
        this.balance = value.value
      })
  }

  ngOnInit(): void {
  }

  closeBalance(): void {
    this._bottomSheetRef.dismiss();
  }

  get balance$(): Observable<IBalance>{
    return this.store.pipe(select(selectBalance))
  }
}
