import { Component, OnInit,ViewChild } from '@angular/core';
import { RoleService } from '../../_service/role.service';
import {MainServiceService} from '../../_service/main-service.service'

import {Popup} from 'ng2-opd-popup';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  @ViewChild('popup1') popup1: Popup;

  msg : string;
  img : string;

  constructor(
    private myservice : RoleService,
    private main_s :MainServiceService
    
  ) { }
  ismenu : any;
  listItem :any;
  listOne : any;
  id:any;

  credential :any;
  idHapus:any;
  createOpt : string;
  getOpt : string;
  putOpt : string;
  deleteOpt : string;
  //variable edit
  editItem : string;
  editcreateOpt : string;
  editgetOpt : string;
  editputOpt : string;
  editdeleteOpt : string;
  //variable create new
  newItem : string;

  ngOnInit() {
  	this.getAll()
  	this.createOpt = "pilih create"
  	this.getOpt = "polih get"
  	this.putOpt = "pilih update"
  	this.deleteOpt = "pilih delete"
    this.whois()
  }

    whois(){
      this.main_s.whois()
      .subscribe(
        (data) => {
           this.mymenu(data)
        }
      )
  }

  mymenu(param){
    this.main_s.getmymenu(param)
      .subscribe(
        (data) => {
           console.log(data.data)
           this.ismenu = data.data
        }
      )
  }

  getByOne(param){
    this.myservice.getByOne(param)
    .subscribe(
      (data) => {
         this.listOne = data.data;
         this.editItem = this.listOne[0].namarole;
         this.editcreateOpt = this.listOne[0].POST;
         this.editgetOpt = this.listOne[0].GET;
         this.editputOpt = this.listOne[0].PUT;
         this.editdeleteOpt = this.listOne[0].DELETE;
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
          console.log(data.data.length)
  			}else{
  				this.listItem = "data kosong"
  			}
  	  },
  		(Error) => console.log(Error)
	  )
  }

  createNew(){
    this.credential = {
    	nama : this.newItem, 
    	post : this.createOpt,
    	get : this.getOpt,
    	put : this.putOpt,
    	delete : this.deleteOpt
    };
    this.myservice.save(this.credential)
    .subscribe(
      (data) => {
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
     this.credential = {
    	nama : this.editItem, 
    	post : this.editcreateOpt,
    	get : this.editgetOpt,
    	put : this.editputOpt,
    	delete : this.editdeleteOpt
    };
    this.myservice.edit(this.credential, param)
    .subscribe(
      (data) => {
          this.ngOnInit()
          this.msg = "data telah berhasil di ubah"
          this.img = "/assets/img/icon/001-round.png"
          this.show_notif("#0077b5");

      }
    )
    console.log(this.editItem)
  }

  deteleById(param){
    this.myservice.delete(param)
    .subscribe(
      (data) => {
          console.log(data)
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

  //drop down event
  pilihCreate(param){
  	this.createOpt = param;
  }

  pilihGet(param){
  	this.getOpt = param;
  }
  pilihPut(param){
  	this.putOpt = param;
  }
  pilihDelete(param){
  	this.deleteOpt = param;
  }

  //drop down event
  editpilihCreate(param){
  	this.editcreateOpt = param;
  }
  editpilihGet(param){
  	this.editgetOpt = param;
  }
  editpilihPut(param){
  	this.editputOpt = param;
  }
  editpilihDelete(param){
  	this.editdeleteOpt = param;
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
