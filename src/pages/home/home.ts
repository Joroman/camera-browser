import { Component, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public base64Image: string;
  public chose64Image: string;
  public url: string;
  checked: boolean = false;

  constructor(
    public navCtrl: NavController,
    private camera: Camera,
    private element: ElementRef
  ) {}

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      sourceType: this.camera.PictureSourceType.CAMERA
    };

    this.camera
      .getPicture({
        quality: 100,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        sourceType: this.camera.PictureSourceType.CAMERA
      })
      .then(
        imageData => {
          // imageData is either a base64 encoded string or a file URI
          // If it's base64:
          console.log('Image Base 64' + imageData);
          this.base64Image = 'data:image/jpeg;base64,' + imageData;
        },
        err => {
          // Handle error
        }
      );
  }

  choosePicture() {
    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      //destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG
    };

    this.camera.getPicture(options).then(
      file_uri => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64:

        this.chose64Image = 'data:image/jpeg;base64,' + file_uri;
        console.log('Image URI' + file_uri);
      },
      err => {
        // Handle error
      }
    );
  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.url = event.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
