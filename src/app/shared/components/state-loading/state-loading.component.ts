import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-state-loading',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
      <div class="w-full flex items-center justify-center py-10" role="status" aria-busy="true">
        <div class="animate-spin rounded-full h-8 w-8 border-2 border-slate-300 border-t-transparent"></div>
        <span class="ml-3 text-slate-600 text-sm">{{ text() || 'Cargando…' }}</span>
      </div>
  `
})
export class StateLoadingComponent {
  text = input<string>('Cargando…');
}
