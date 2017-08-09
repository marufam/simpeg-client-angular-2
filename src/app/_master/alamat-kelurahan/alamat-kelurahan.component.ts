import { Component, OnInit , OnChanges, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlamatKecamatanService } from '../../_service/alamat-kecamatan.service';
import { AlamatKotaService } from '../../_service/alamat-kota.service';
import { AlamatProvinsiService } from '../../_service/alamat-provinsi.service';

import {MainServiceService} from '../../_service/main-service.service'

import {Popup} from 'ng2-opd-popup';

@Component({
  selector: 'app-alamat-kelurahan',
  templateUrl: './alamat-kelurahan.component.html',
  styleUrls: ['./alamat-kelurahan.component.css']
})
export class AlamatKelurahanComponent implements OnInit {
  
  @ViewChild('popup1') popup1: Popup;

  msg : string;
  img : string;

  //list variable
  ismenu : any;

  listItem :any;
  provinsiList : any;
  kotaList : any;
  listOne : any;

  id:any;
  idHapus:any;

  //credential for post and put data
  credential :any;
  
  //variable edit
  editItem : string;
  kotaEdit : string;
  provinsiEdit : string;

  //variable create new
  newItem : string;
  kotaNew : string;
  provinsiNew : string;

  constructor(
      private myservice : AlamatKecamatanService, 
  		private kotaservice : AlamatKotaService, 
  		private provinsiService : AlamatProvinsiService, 
  		private router : Router,
  		private activeRoute : ActivatedRoute,
      private main_s : MainServiceService

  	) { 
  }

  ngOnInit() {
    this.getprovinsi()

    console.log("loaded")
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
         this.editItem = this.listOne[0].keterangan;
         console.log(this.listOne)
         this.kotaEdit = this.listOne[0].kota

      }
    )
  }

  getAll(param){
  	this.myservice.getAll(param)
  	.subscribe(
		  (data) => {
  			if (data) {
  				this.listItem = data.data
  			}else{
  				this.listItem = "data kosong"
  			}
  	  },
  		(Error) => console.log(Error)
	  )
  }

  createNew(){
    this.credential = {kelurahan : this.newItem, kota : this.kotaNew};
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
    this.credential = {kelurahan : this.newItem, kota : this.kotaNew};
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

  getKota($event){
  	this.kotaservice.getByProvinsi(this.provinsiNew)
    .subscribe(
      (data) => {
        if (data) {
          this.kotaList = data.data
        }else{
          this.kotaList = "data kosong"
        }
        console.log(data.data)
      },
      (Error) => console.log(Error)
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
