/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SubirArchivoService } from './subir-archivo.service';

describe('Service: SubirArchivo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubirArchivoService]
    });
  });

  it('should ...', inject([SubirArchivoService], (service: SubirArchivoService) => {
    expect(service).toBeTruthy();
  }));
});
