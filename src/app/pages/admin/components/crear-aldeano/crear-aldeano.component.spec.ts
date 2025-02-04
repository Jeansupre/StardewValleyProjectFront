import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAldeanoComponent } from './crear-aldeano.component';

describe('CrearAldeanoComponent', () => {
  let component: CrearAldeanoComponent;
  let fixture: ComponentFixture<CrearAldeanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearAldeanoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearAldeanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
