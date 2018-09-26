/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ModalUploadService } from './modal-upload.service';

describe('Service: ModalUpload', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalUploadService]
    });
  });

  it('should ...', inject([ModalUploadService], (service: ModalUploadService) => {
    expect(service).toBeTruthy();
  }));
});
