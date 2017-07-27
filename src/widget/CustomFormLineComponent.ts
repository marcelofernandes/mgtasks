import { Component } from '@angular/core';

import { FormLineComponent } from "angularm";

@Component({
    selector: 'div [mgFormLine]',
    template:
        ` <input
          type="{{configuration.inputType}}"
          id="{{propertyType.entityType.singular}}_{{propertyType.name}}"
          placeholder="{{propertyType.name | titleCase}}"
          [formControl]="mgFormControl" [ngClass]="'w3-input'">
        <br>
        <p></p>
        <label for="{{propertyType.entityType.singular}}_{{propertyType.name}}"
            >{{propertyType.name | titleCase}}</label>
`,
})
export class CustomFormLineComponent extends FormLineComponent { }