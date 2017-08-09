import { Component, OnInit,ViewChild } from '@angular/core';
import { GolruangGolonganService } from '../../_service/golruang-golongan.service';
import { GolruangRuangService } from '../../_service/golruang-ruang.service';
import { GolruangService } from '../../_service/golruang.service';

import {MainServiceService} from '../../_service/main-service.service'
import {Popup} from 'ng2-opd-popup';

@Component({
  selector: 'app-golruang',
  templateUrl: './golruang.component.html',
  styleUrls: ['./golruang.component.css']
})
export class GolruangComponent implements OnInit {

  @ViewChild('popup1') popup1: Popup;

  msg : string;
  img : string;

  ismenu : any;
  listItem :any;
  listGolongan : any ;
  listRuang : any;
  listOne : any;
  id:any;

  credential :any;
  idHapus:any;
  //variable edit
  editItem : string;
  editgolonganid : string;
  editgolongan : string;
  editruangid : string;
  editruang : string;

  //variable create new
  newItem : string;
  golonganid : string;
  golongan : string;
  ruangid : string;
  ruang : string;

  constructor(
  	private myservice : GolruangService,
  	private golonganservice : GolruangGolonganService,
  	private ruangservice : GolruangRuangService,
    private main_s :MainServiceService
  ) { }

  ngOnInit() {
  	this.golongan = "pilih golongan"
  	this.ruang = "pilih ruang"

  	this.getAll()
  	this.getGolongan()
  	this.getRuang()
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
         this.editgolongan = "golongan " + this.listOne[0].golongan.keterangan;
         this.editgolonganid = this.listOne[0].golongan._id;
         this.editruang = "ruang " + this.listOne[0].ruang.keterangan;
         this.editruangid = this.listOne[0].ruang._id;
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

  createNew(){
  	this.credential = {golongan : this.golonganid, ruang : this.ruangid};
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
    this.credential = {golongan : this.editgolonganid, ruang : this.editruangid };
    this.myservice.edit(this.credential, param)
    .subscribe(
      (data) => {
          this.ngOnInit()
          this.msg = "data telah berhasil di ubah"
          this.img = "/assets/img/icon/001-round.png"
          this.show_notif("#0077b5");

      }
    )
    console.log(this.credential)
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

  //drop down function
  getGolongan(){
  	this.golonganservice.getAll()
  	.subscribe(
		  (data) => {
  			if (data) {
  				this.listGolongan = data.data
  			}else{
  				this.listGolongan = "data kosong"
  			}
  	  },
  		(Error) => console.log(Error)
	  )
  }

  getRuang(){
  	this.ruangservice.getAll()
  	.subscribe(
		  (data) => {
  			if (data) {
  				this.listRuang = data.data
  			}else{
  				this.listRuang = "data kosong"
  			}
  	  },
  		(Error) => console.log(Error)
	  )
  }

  //set form file drop down
  setGolongan(id, value ){
  	this.golongan = "golongan " + value;
  	this.golonganid = id;
  }

  setRuang(id, value ){
  	this.ruang = "ruang " + value;
  	this.ruangid = id;
  }

  setEditGolongan(id, value ){
  	this.editgolongan = "golongan " + value;
  	this.editgolonganid = id;
  }

  setEditRuang(id, value ){
  	this.editruang = "ruang " + value;
  	this.editruangid = id;
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
