import 'rxjs/add/operator/switchMap';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AngularmService, FlashMessageService, EntityTypeComponent, TitleCase, EntityType, PropertyType } from 'angularm';

@Component({
  template: `<div *ngIf="entityType && myForm">
  <h1>New {{ entityType.singular | titleCase }}</h1>
  <form [formGroup]="myForm" (ngSubmit)="onSubmit(myForm.value)" [ngClass]="'w3-card-4'">
    <div *ngFor="let propertyType of entityType.propertyTypes"
      [mgPropertyType]="'form_line'" [propertyType]="propertyType"
      [mgForm]="myForm"></div>
    <input type="submit" value="Create {{ entityType.singular | titleCase }}">
  </form>
  <a routerLink="/{{entityType.plural}}">Back</a>
</div>`
})
export class CssCreateFormComponent extends EntityTypeComponent implements OnInit {

  myForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private flash: FlashMessageService,
    private angularm: AngularmService
  ) {
    super();
  }

  ngOnInit() {
    let fbConf: any = {};

    this.entityType.properties.forEach( (propertyType: PropertyType) => {
      fbConf[propertyType.name] = ['']; // TO DO Add validators here according to metadata
    });

    this.myForm = this.fb.group(fbConf);
  }

  onSubmit(form: any): void {
    this.angularm.create(this.entityType.singular, form);
    let entityTypeName = TitleCase.toTitleCase(this.entityType.singular);
    this.flash.changeMessage(`${entityTypeName} was successfully created.`);
    let idPropertyType: string = this.entityType.tags.id;
    this.router.navigate([this.entityType.plural, form[idPropertyType] ]);
  }
}
