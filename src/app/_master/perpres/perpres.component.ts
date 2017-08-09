import { Component, OnInit, ViewChild } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UploadFileService } from '../../_service/upload-file.service'
import {MainServiceService} from '../../_service/main-service.service'

import {Popup} from 'ng2-opd-popup';


@Component({
  selector: 'app-perpres',
  templateUrl: './perpres.component.html',
  styleUrls: ['./perpres.component.css']
})
export class PerpresComponent implements OnInit {

  @ViewChild('popup1') popup1: Popup;

  msg : string;
  img : string;

	ismenu : any;
  url : any
  constructor(
    private http : Http,
    private myservice : UploadFileService,
    private main_s : MainServiceService
  	) { }

  ngOnInit() {
  }

  upload($event){
    this.myservice.saveFile($event)
    .subscribe(
      (data) => {
         console.log(data)
         if (data.success == true) {
           this.msg = "data baru telah ditambahkan"
          }else{
           this.msg = "data telah ada"

          }
          this.img = "/assets/img/icon/006-mountain.png"
          this.show_notif("#7cb82f");
      }
    )

  }



  show_notif(warna){
    this.popup1.options = {
      header: "master agama",
      color: warna, // red, blue.... 
      widthProsentage: 40, // The with of the popou measured by browser width 
      animationDuration: 1, // in seconds, 0 = no animation 
      showButtons: true, // You can hide this in case you want to use custom buttons 
      cancleBtnContent: "OK", // the text on your cancel button 
      // confirmBtnClass: "btn btn-default", // your class for styling the confirm button 
      cancleBtnClass: "btn btn-default", // you class for styling the cancel button 
      animation: "bounceIn" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
    };
   
    this.popup1.show(this.popup1.options);
    
  }

}
