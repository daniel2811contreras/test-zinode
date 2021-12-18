import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { IAnswer } from 'src/app/models/answer.model';
import { AppState } from 'src/app/store/app.state';
import { selectAnswer } from 'src/app/store/selectors/answer.selector';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss'],
})
export class AnswerComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  okay: boolean = false;

  constructor(private store: Store<AppState>) {
    this.data$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      console.log(value);
      this.okay = value.okay;
    });
  }

  ngOnInit(): void {}

  get data$(): Observable<IAnswer> {
    return this.store.pipe(select(selectAnswer));
  }
}
