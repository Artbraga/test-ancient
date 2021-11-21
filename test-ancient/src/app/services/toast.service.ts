import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: any[] = [];

  show(textOrTpl: string, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }
}
