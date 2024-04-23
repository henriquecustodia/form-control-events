import { JsonPipe } from "@angular/common";
import { Component } from "@angular/core";
import {
  ControlEvent,
  FormControl,
  PristineEvent,
  ReactiveFormsModule,
  StatusEvent,
  TouchedEvent,
  Validators,
  ValueChangeEvent,
} from "@angular/forms";
import { filter } from "rxjs";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  template: `
  
    <input type="text" placeholder="Whatever" [formControl]="control" />

    <button (click)="control.disable()">disable</button>
    <button (click)="control.enable()">enable</button>

    <ol>
      @for (event of events; track event) {
        <li>{{ event }}</li>
      }
    </ol>
  `,
  styles: [],
})
export class AppComponent {
  control = new FormControl<string>('', {
    validators: [
      Validators.required,
      Validators.maxLength(3)
    ]
  });

  events: string[] = [];

  constructor() {
    this.control.events
      .subscribe((event) => {
        if(event instanceof PristineEvent) {
          this.events.push(`pristine => ${event.pristine}`);
        }

        if(event instanceof StatusEvent) {
          this.events.push(`status => ${event.status}`);
        }

        if(event instanceof TouchedEvent) {
          this.events.push(`touched => ${event.touched}`);
        }

        if(event instanceof ValueChangeEvent) {
          this.events.push(`value => '${event.value}'`);
        }
      });

  }
}
