import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-state-error',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
      <div class="w-full rounded-lg border border-red-200 bg-red-50 p-4" role="alert">
        <p class="text-red-800 text-sm">{{ text() || 'Ocurrió un error' }}</p>
      </div>
  `
})
export class StateErrorComponent {
  text = input<string>('Ocurrió un error');

}
