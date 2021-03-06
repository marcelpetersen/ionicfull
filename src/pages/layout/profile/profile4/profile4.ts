import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,ToastController} from 'ionic-angular';
import { AngularFireDatabase ,FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-profile4',
  templateUrl: 'profile4.html'
})
export class Profile4Page {

    profile:  FirebaseObjectObservable<any[]>;
    imgGallery: FirebaseListObservable<any[]>;
    friends:  FirebaseListObservable<any[]>;
    imgGalleryArray : any=[]; 

    segmentView: string = "one";
    following: boolean = false;
    
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,private toastCtrl: ToastController, public database: AngularFireDatabase) {
      let loadingPopup = this.loadingCtrl.create({
        spinner: 'crescent', 
        content: ''
      });
      loadingPopup.present();

      this.profile = database.object('/profile/1');
      this.friends = database.list('/profile/1/friends');
      this.imgGallery = database.list('/gallery');
      this.imgGallery.subscribe(imgGallery => {
          this.imgGalleryArray = imgGallery;
          loadingPopup.dismiss()
      })
  }

  follow() {
    this.following = !this.following;
    this.presentToast('bottom','Follow user clicked');
  }

  presentToast(position: string,message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      position: position,
      duration: 1000
    });
    toast.present();
  }

}
