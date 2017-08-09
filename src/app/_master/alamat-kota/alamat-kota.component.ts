import { Component, OnInit , OnChanges, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlamatKotaService } from '../../_service/alamat-kota.service';
import { AlamatProvinsiService } from '../../_service/alamat-provinsi.service';

import {MainServiceService} from '../../_service/main-service.service'
import {Popup} from 'ng2-opd-popup';

@Component({
  selector: 'app-alamat-kota',
  templateUrl: './alamat-kota.component.html',
  styleUrls: ['./alamat-kota.component.css']
})
export class AlamatKotaComponent implements OnInit {
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
      private myservice : AlamatKotaService, 
  		private provinsiService : AlamatProvinsiService, 
  	) { 
  }

  ngOnInit() {
    this.getprovinsi()
    this.provinsiNew = "Pilih provinsi"
    this.pilihprovinsi = "Pilih provinsi"
    console.log("loaded")
  }

 

  getByOne(param){
    this.pilihprovinsi = param
    this.myservice.getByOne(param)
    .subscribe(
      (data) => {
         this.listOne = data.data;
         this.editItem = this.listOne[0].keterangan;
         this.provinsiEdit = this.listOne[0].provinsi.keterangan;
         console.log(this.listOne)
      }
    )
  }

  getAll(provid, prov){
    this.pilihprovinsi = prov
  	this.myservice.getAll(provid)
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
    this.credential = {kota : this.newItem, provinsi : this.provinsiNew};
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
      kota : this.editItem , 
      provinsi : this.provinsiEdit
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
          this.msg = "data telah berhasil dihapus"
          this.img = "/assets/img/icon/004-danger.png"
          this.show_notif("#c70039");
      }
    )
  }

  hapus(data){
    this.idHapus=data;
  }


//external service
  getprovinsi(){
    this.provinsiService.getAll()
    .subscribe(
      (data) => {
        if (data) {
          this.provinsiList = data.data
        }else{
          this.provinsiList = "data kosong"
        }
      },
      (Error) => console.log(Error)
    )
  }

  pilihProvinsi(param, param2){
    this.provinsiNew = param2
    console.log(param, param2)
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
