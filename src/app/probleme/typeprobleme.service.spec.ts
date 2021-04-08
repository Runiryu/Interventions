import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { TypeproblemeService } from './typeprobleme.service';

describe('TypeproblemeService', () => {
  let service: TypeproblemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(TypeproblemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
