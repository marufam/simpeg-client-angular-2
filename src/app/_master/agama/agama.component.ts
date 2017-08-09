import { Component, OnInit , OnChanges, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MasteragamaService } from '../../_service/masteragama.service';

import {MainServiceService} from '../../_service/main-service.service'

import {Popup} from 'ng2-opd-popup';
  @Component({

    selector: 'app-agama',
    templateUrl: './agama.component.html',
    styleUrls: ['./agama.component.css']
  })
export class AgamaComponent implements OnInit {

  @ViewChild('popup1') popup1: Popup;

  msg : string;
  img : string;

  ismenu : any;
  listAgama :any;
  agamaOne : any;
  id:any;
  credential :any;
  idHapus:any;
  //variable edit
  editKeteranganAgama : string;

  //variable create new
  agamaBaru : string;

  constructor(
  		private agamaService : MasteragamaService, 
  		private router : Router,
  		private activeRoute : ActivatedRoute,
      private main_s : MainServiceService

  	) { 
  }

  ngOnInit() {
  	this.cekIdUri()
  	this.getAll()
    // this.getByOne()
    console.log("loaded")
  }

  logout(){
    localStorage.removeItem('token')
    location.reload();

  }

  cekIdUri(){
    return this.activeRoute.params.subscribe(params =>{this.id = params['id'];})
  }

  getByOne(param){
    this.agamaService.getByOne(param)
    .subscribe(
      (data) => {
         this.agamaOne = data.data;
         console.log(this.agamaOne)
      }
    )
  }

  getAll(){
  	this.agamaService.getAll()
  	.subscribe(
		  (data) => {
  			if (data) {
  				this.listAgama = data.data
  			}else{
  				this.listAgama = "data kosong"
  			}
  	  },
  		(Error) => console.log(Error)
	  )
  }

  createNew(){
    this.credential = {agama : this.agamaBaru};
    this.agamaService.save(this.credential)
    .subscribe(
      (data) => {
         console.log(data.success)
          this.ngOnInit()
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

  updateById(param){
    this.credential = {agama : this.editKeteranganAgama};
    this.agamaService.edit(this.credential, param)
    .subscribe(
      (data) => {
          this.ngOnInit()
          this.msg = "data telah berhasil di ubah"
          this.img = "/assets/img/icon/001-round.png"
          this.show_notif("#0077b5");

      }
    )
  }

  deteleById(param){
    this.agamaService.delete(param)
    .subscribe(
      (data) => {
          console.log(data)
          this.ngOnInit()
          this.msg = "data telah berhasil dihapus"
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
