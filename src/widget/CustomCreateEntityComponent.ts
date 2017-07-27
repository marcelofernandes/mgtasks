import 'rxjs/add/operator/switchMap';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { CreateEntityComponent } from "angularm";

@Component({
  template: `<div *ngIf="entityType && myForm">
  <h1>New {{ entityType.singular | titleCase }}</h1>
  <form [formGroup]="myForm" (ngSubmit)="onSubmit(myForm.value)" [ngClass]="'w3-container'">
    <div *ngFor="let propertyType of entityType.propertyTypes"
      [mgPropertyType]="'form_line'" [propertyType]="propertyType"
      [mgForm]="myForm"></div>
    <input type="submit" value="Create {{ entityType.singular | titleCase }}">
  </form>
  <a routerLink="/{{entityType.plural}}">Back</a>
</div>`
})
export class CustomCreateEntityComponent extends CreateEntityComponent { }