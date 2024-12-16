import { TestBed } from '@angular/core/testing';

import { DatadisplayService } from './datadisplay.service';

describe('DatadisplayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatadisplayService = TestBed.get(DatadisplayService);
    expect(service).toBeTruthy();
  });
});
