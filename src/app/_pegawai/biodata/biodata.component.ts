import { Component, OnInit, ViewChild } from '@angular/core';
import { PegawaiBiodataService } from '../../_service/pegawai-biodata.service';
import {MainServiceService} from '../../_service/main-service.service'

import {Popup} from 'ng2-opd-popup';

@Component({
  selector: 'app-biodata',
  templateUrl: './biodata.component.html',
  styleUrls: ['./biodata.component.css']
})
export class BiodataComponent implements OnInit {

  @ViewChild('popup1') popup1: Popup;

  msg : string;
  img : string;

  ismenu : any;
  
  listItem :any;
  provinsiList : any;
  listOne : any;
  id:any;

  pilihprovinsi : any;
  credential :any;
  idHapus:any;
  //variable edit
  editItem : string;
  provinsiEdit : string;

  //variable create new
  newItem : string;
  provinsiNew : string;

  constructor(
  	private myservice : PegawaiBiodataService,
    private main_s :MainServiceService

  ) { }

  ngOnInit() {
  	this.getAll()
  }

  getByOne(param){
    this.myservice.getByOne(param)
    .subscribe(
      (data) => {
         this.listOne = data.data;
         console.log(this.listOne)
      }
    )
  }

  getAll(){
  	this.myservice.getAll()
  	.subscribe(
		  (data) => {
  			if (data) {
  				this.listItem = data.data
          console.log(data.data)
  			}else{
  				this.listItem = "data kosong"
  			}
  	  },
  		(Error) => console.log(Error)
	  )
  }

  deteleById(param){
    this.myservice.delete(param)
    .subscribe(
      (data) => {
          this.ngOnInit()
          if (data.success == true) {
            this.msg = "data telah berhasil dihapus"
          }else{
           this.msg = "data yang telah digunakan"
          }
          this.img = "/assets/img/icon/004-danger.png"
          this.show_notif("#c70039");
      }
    )
  }

  hapus(data){
    this.idHapus=data;
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
