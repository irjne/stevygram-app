import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  @ViewChild('slides', { static: true }) slider: IonSlides;
  segment = 0;
  sliderOptions = { pager: true, autoHeight: true };
  constructor(private router: Router, private toastController: ToastController) { }

  ngOnInit() { }

  async segmentChanged() {
    await this.slider.slideTo(this.segment);
  }
  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }

  logOut() {
    localStorage.clear();
    this.ngOnInit();
  }

  async presentToast(type: String) {
    let toast;
    toast = await this.toastController.create(
      {
        message: 'Logout successfully.',
        duration: 2000
      }
    )
    toast.present();
  }
}
