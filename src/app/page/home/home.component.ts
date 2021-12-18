import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { ListCreditComponent } from 'src/app/component/list-credit/list-credit.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private _bottomSheet: MatBottomSheet) { }

  ngOnInit(): void {
  }

  request(): void {
    this.router.navigate(["/request"])
  }
  list(): void {
    this._bottomSheet.open(ListCreditComponent, {panelClass: 'custom-width'})
  }
}
