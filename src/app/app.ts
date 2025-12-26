import {
  ApplicationRef,
  Component,
  ComponentRef,
  createComponent,
  EnvironmentInjector,
  inject,
} from '@angular/core';
import { Dynamic } from './dynamic';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="toggle()">Click</button>
<!--    Replace (click) with (mouseleave) or (mouseenter) and remove setTimeout in the toggle()-->
  `,
  styles: `
    :host {
      display: flex;
      gap: 4em;
      padding: 4em;
    }

    button {
      border-radius: .2em;
      border: thin solid black;
      background: #1b4a95;
      color: white;
      font-size: 2em;
      padding: .5em;
      cursor: pointer;
      box-sizing: border-box;
      width: 130px;
    }
  `
})
export class App {
  private environmentInjector = inject(EnvironmentInjector);
  private appRef = inject(ApplicationRef);

  protected componentRef: ComponentRef<Dynamic> | null = null;

  protected toggle(): void {
    // queueMicrotask(() => {
    setTimeout(() => {
      if (this.componentRef) {
        const tooltipRef: ComponentRef<Dynamic> = this.componentRef!;
        this.componentRef = null;

        const element: HTMLElement = tooltipRef.location.nativeElement;
        const animations: Animation[] = element.getAnimations();

        animations.map((animation: Animation) => animation.cancel());

        tooltipRef.destroy();
        this.appRef.detachView(tooltipRef.hostView);

        // void element.offsetHeight;
      } else {
        this.componentRef = createComponent(Dynamic, {
          environmentInjector: this.environmentInjector,
        });

        document.body.appendChild(this.componentRef.location.nativeElement);
        this.appRef.attachView(this.componentRef.hostView);
        this.componentRef.changeDetectorRef.detectChanges();
      }
    });
  }
}
