import {Component, TemplateRef} from '@angular/core';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-toasts',
  template: `
    <ngb-toast
      *ngFor="let toast of toastService.toasts"
      [class]="toast.classname"
      [autohide]="true"
      [delay]="toast.delay || 5000"
    >
      {{ toast.textOrTpl }}
    </ngb-toast>
  `,
  host: {'[class.ngb-toasts]': 'true'}
})
export class ToastsContainer {
  constructor(public toastService: ToastService) {}
}
