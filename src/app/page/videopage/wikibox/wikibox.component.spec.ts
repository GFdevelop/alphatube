import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiboxComponent } from './wikibox.component';

describe('WikiboxComponent', () => {
  let component: WikiboxComponent;
  let fixture: ComponentFixture<WikiboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WikiboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WikiboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
