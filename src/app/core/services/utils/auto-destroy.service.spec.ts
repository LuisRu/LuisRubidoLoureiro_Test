import { AutoDestroyService } from './auto-destroy.service';

describe('AutoDestroyService', () => {
  it('debería emitir y completar en ngOnDestroy', () => {
    const service = new AutoDestroyService();

    const nextSpy = jasmine.createSpy('next');
    const completeSpy = jasmine.createSpy('complete');

    service.subscribe({
      next: nextSpy,
      complete: completeSpy
    });

    service.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalledWith(true);
    expect(completeSpy).toHaveBeenCalled();
  });
});
