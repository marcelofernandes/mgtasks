import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AngularmService, FlashMessageService, EntityComponent, TitleCase, Entity, EntityType } from 'angularm';

@Component({
  selector: 'div [mgEditEntityForm]',
  template: `<div *ngIf="entity">
  <h1>Editing {{ entity.entityType.singular | titleCase }}</h1>
  <form [formGroup]="myForm" (ngSubmit)="onSubmit(myForm.value)" [ngClass]="'w3-card-4'">
    <div
      [mgForeachProperty]="'edit_form_line'"
      [entity]="entity"
      [mgForm]="myForm"></div>
    <input type="submit" value="Update {{ entity.entityType.singular | titleCase }}">
  </form>

  <a href="#" (click)="show()">Show</a>
  <a href="#" (click)="back()">Back</a>
</div>`
})
export class CssEditFormComponent extends EntityComponent implements OnInit {

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
    if (this.entity) {
      let fbConf: any = {};

      this.entity.entityType.properties.forEach(propertyType => {
        fbConf[propertyType.name] = this.entity.properties[propertyType.name]; // TO DO Add validators here according to metadata
      });

      this.myForm = this.fb.group(fbConf);
    }
  }

  onSubmit(form: any): void {
    this.angularm.edit(this.entity.entityType.singular, this.entity.key, form);
    let entityTypeName = TitleCase.toTitleCase(this.entity.entityType.singular);
    this.flash.changeMessage(`${entityTypeName} was successfully updated.`);
    this.router.navigate([this.entity.entityType.plural, form[this.entity.entityType.tags.id]]);
  }

  show() {
    this.flash.clearMessage();
    this.router.navigate([this.entity.entityType.plural, this.entity.key]);
    return false;
  }

  back() {
    this.flash.clearMessage();
    this.router.navigate([this.entity.entityType.plural]);
    return false;
  }

}
