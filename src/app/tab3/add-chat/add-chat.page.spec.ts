import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddChatPage } from './add-chat.page';

describe('AddChatPage', () => {
  let component: AddChatPage;
  let fixture: ComponentFixture<AddChatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddChatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
