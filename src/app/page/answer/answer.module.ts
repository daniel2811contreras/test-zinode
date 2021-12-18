import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnswerRoutingModule } from './answer-routing.module';
import { AnswerComponent } from './answer.component';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AnswerComponent
  ],
  imports: [
    CommonModule,
    AnswerRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class AnswerModule { }
