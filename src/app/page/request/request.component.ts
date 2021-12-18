import { formatCurrency } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { IFormMessages, IRequest } from 'src/app/models/request.model';
import { setAnswer } from 'src/app/store/actions/anwer.action';
import { setRequest } from 'src/app/store/actions/request.action';
import { AppState } from 'src/app/store/app.state';
import { selectRequest } from 'src/app/store/selectors/resquest.selector';
import { environment } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { selectBalance } from 'src/app/store/selectors/balance.selector';
import { IBalance } from 'src/app/models/balance.model';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss'],
})
export class RequestComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  formRequestOne!: FormGroup;
  formRequestTwo!: FormGroup;
  formRequestMessages!: IFormMessages;
  name: string = '';
  mail: string = '';
  document: string = '';
  valueRequest: number = 0;
  datePayable: string = '';
  balance: number = environment.balance;

  constructor(
    private store: Store<AppState>,
    private formBuilder: FormBuilder,
    private router: Router,
    private db: AngularFirestore,
    @Inject(LOCALE_ID) public locale: string
  ) {
    this.data$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      this.name = value.name;
      this.mail = value.mail;
      this.document = value.document;
      this.valueRequest = value.valueRequest;
      this.datePayable = value.datePayable || '';
    });
    this.balance$.pipe(takeUntil(this.destroy$)).subscribe(value=>{
      this.balance = value.value
    })
    this.initForm();
  }
  ngOnInit(): void {}

  initForm() {
    this.formRequestOne = this.formBuilder.group({
      name: [
        this.name,
        [
          Validators.required,
          Validators.pattern('^[A-Za-zÁÉÍÓÚáéíóúñÑ ]{2,50}$'),
        ],
      ],
      mail: [this.mail, [Validators.required, Validators.email]],
      document: [
        this.document,
        [Validators.required, Validators.pattern('^[0-9]{5,10}$')],
      ],
    });
    this.formRequestTwo = this.formBuilder.group({
      valueRequest: [
        this.valueRequest,
        [
          Validators.required,
          Validators.min(10000),
          Validators.max(environment.balance * 0.1),
        ],
      ],
      datePayable: [this.datePayable, []],
    });

    this.formRequestMessages = {
      name: [{ type: 'required', message: 'El campo Nombre es requerido' }],
      mail: [
        { type: 'required', message: 'El campo Correo es requerido' },
        { type: 'email', message: 'El Correo no es valido' },
      ],
      document: [{ type: 'required', message: 'El campo Cédula es requerido' }],
      valueRequest: [
        { type: 'required', message: 'El campo Valor Solicitado es requerido' },
        {
          type: 'min',
          message: `El Valor minimo del credito es ${formatCurrency(
            10000,
            this.locale,
            '$ '
          )}`,
        },
        {
          type: 'max',
          message: `El Valor maximo del credito es ${formatCurrency(
            environment.balance * 0.1,
            this.locale,
            '$ '
          )}`,
        },
      ],
      datePayable: [],
    };
  }

  createRequestDB(request: IRequest, okay: boolean) {
    console.log('ok');
    
    this.db
      .collection('zinode')
      .doc()
      .set({ ...request, okay, paidOut: false})
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  }

  onNext(event: Event): void {
    event.preventDefault();
    if (this.formRequestOne.valid) {
      console.log({ ...this.formRequestOne.value });
      this.store.dispatch(
        setRequest({ request: { ...this.formRequestOne.value } })
      );
    } else {
      this.formRequestOne.markAllAsTouched();
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.formRequestTwo.valid) {
      this.store.dispatch(
        setRequest({
          request: {
            ...this.formRequestOne.value,
            ...this.formRequestTwo.value,
          },
        })
      );
      const okay = Math.random() * (10 - 1) + 1;
      this.store.dispatch(
        setAnswer({ answer: { okay: okay !== 4 && okay !== 7 } })
      );
      this.createRequestDB(
        {
          name: this.nameField?.value,
          mail: this.mailField?.value,
          document: this.documentField?.value,
          valueRequest: parseInt(this.valueRequestField?.value),
          datePayable: this.datePayableField?.value,
        },
        okay !== 4 && okay !== 7
      );
      this.router.navigate(['/answer']);
    } else {
      this.formRequestTwo.markAllAsTouched();
    }
  }

  get data$(): Observable<IRequest> {
    return this.store.pipe(select(selectRequest));
  }
  get balance$(): Observable<IBalance>{
    return this.store.pipe(select(selectBalance))
  }
  get nameField() {
    return this.formRequestOne.get('name');
  }
  get mailField() {
    return this.formRequestOne.get('mail');
  }
  get documentField() {
    return this.formRequestOne.get('document');
  }
  get valueRequestField() {
    return this.formRequestTwo.get('valueRequest');
  }
  get datePayableField() {
    return this.formRequestTwo.get('datePayable');
  }

}
