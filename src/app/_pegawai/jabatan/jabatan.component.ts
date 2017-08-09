import { Component, OnInit ,ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
//uker
import { GolruangService } from '../../_service/golruang.service';
import { UkerInstansiService } from '../../_service/uker-instansi.service';
import { UkerService } from '../../_service/uker.service';
import { PegawaiJabatanService } from '../../_service/pegawai-jabatan.service';
import { PegawaiBiodataService } from '../../_service/pegawai-biodata.service';

import {Popup} from 'ng2-opd-popup';

@Component({
  selector: 'app-jabatan',
  templateUrl: './jabatan.component.html',
  styleUrls: ['./jabatan.component.css']
})
export class JabatanComponent implements OnInit {
  @ViewChild('popup1') popup1: Popup;

  msg : string;
  img : string;

	//collection
	instansi_c : any
	uker_c : any
	gol_c : any
  pegawai_one : any

	listItem :any
	provinsiList : any
	listOne : any
	idHapus : string

	credential : any;

   	nip: string
	SO: string
	jenisJabatan: string
	tmtjabatan: DateModel
	pejabatPengangkat: string
	noSK: string
  unitInduk: string
	unitInduk_id: string
  unitKerja: string
	unitKerja_id: string
	posisi: string
  golongan: string
	golongan_id: string

	edit_nip: string
	edit_SO: string
	edit_jenisJabatan: string
	edit_tmtjabatan: DateModel
	edit_pejabatPengangkat: string
	edit_noSK: string
  edit_unitInduk: string
	edit_unitInduk_id: string
  edit_unitKerja: string
	edit_unitKerja_id: string
	edit_posisi: string
  edit_golongan: string
	edit_golongan_id: string

  constructor(
  	private myservice : PegawaiJabatanService,
  	private instansi_S : UkerInstansiService,
  	private uker_s : UkerService,
  	private golruang_s : GolruangService,
    private biodata_s : PegawaiBiodataService
  ) { }

  ngOnInit() {
    this.dropdown_golruang()
    this.dropdown_instansi()
    this.golongan = "pilih golongan"
    this.unitInduk = "pilih Instansi"
    this.unitKerja = "pilih Jabatan"
  }

  getByOne(param){
    this.myservice.getByOne(param)
    .subscribe(
      (data) => {
          this.listOne = data.data;
          console.log(this.listOne)
          this.edit_nip= this.listOne[0].nip
          this.edit_SO= this.listOne[0].SO
          this.edit_jenisJabatan= this.listOne[0].jenisJabatan
          // this.edit_tmtjabatan= this.listOne[0]
          this.edit_pejabatPengangkat= this.listOne[0].pejabatPengangkat
          this.edit_noSK= this.listOne[0].noSK
          this.edit_unitInduk= this.listOne[0].unitInduk.keterangan
          this.edit_unitInduk_id= this.listOne[0].unitInduk._id
          this.edit_unitKerja= this.listOne[0].unitKerja.keterangan
          this.edit_unitKerja_id= this.listOne[0].unitKerja._id
          this.edit_posisi= this.listOne[0].posisi
          this.edit_golongan= this.listOne[0].golongan.golongan.keterangan + "/" + this.listOne[0].golongan.ruang.keterangan
          this.edit_golongan_id= this.listOne[0].golongan._id
         this.biodata_s.getByOne(this.listOne[0].nip)
         .subscribe(
           (data)=>{
             this.pegawai_one = data.data
             console.log(this.pegawai_one)
           }
          )
      }
    )
  }

  getByNip(nip){
  	this.myservice.getAll(nip)
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
    this.credential = {
    	nip: this.nip,
  		so: this.SO,
  		jenisJabatan: this.jenisJabatan,
  		tmtjabatan: this.tmtjabatan,
  		pejabatPengangkat: this.pejabatPengangkat,
  		noSK: this.noSK,
  		unitInduk: this.unitInduk_id,
  		unitKerja: this.unitKerja_id,
  		posisi: this.posisi,
  		golongan: this.golongan_id
    };
    console.log(this.credential)
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
    this.credential = [{
      	nip: this.edit_nip,
    		SO: this.edit_SO,
    		jenisJabatan: this.edit_jenisJabatan,
    		tmtjabatan: this.edit_tmtjabatan,
    		pejabatPengangkat: this.edit_pejabatPengangkat,
    		noSK: this.edit_noSK,
    		unitInduk: this.edit_unitInduk,
    		unitKerja: this.edit_unitKerja,
    		posisi: this.edit_posisi,
    		golongan: this.edit_golongan_id
        }];
        console.log(this.credential)
    this.myservice.edit(this.credential, param)
    .subscribe(
      (data) => {
           this.getByNip(this.edit_nip)
           this.msg = "data telah berhasil di ubah"
           this.img = "/assets/img/icon/001-round.png"
           this.show_notif("#0077b5");

      }
    )
  }

  deteleById(param){
    this.myservice.delete(this.idHapus)
    .subscribe(
      (data) => {
          console.log(data)
          this.getByNip(param)
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

 //drop down menu
 dropdown_instansi(){
 	this.instansi_S.getAll()
 	.subscribe(
 		(data)=> {
 			this.instansi_c = data.data
       console.log(this.instansi_c)
 		}
 	)
 }


 dropdown_uker(p1,p2 ){
    this.uker_s.getAll(p1, p2)
    .subscribe(
      (data) => {
        if (data) {
          this.uker_c = data.data
       console.log(this.uker_c)

        }else{
          this.uker_c = "data kosong"
        }
      },
      (Error) => console.log(Error)
    )
  }

 dropdown_golruang(){
 	this.golruang_s.getAll()
 	.subscribe(
 		(data)=>{
 			this.gol_c = data.data
 		}
 	)
 }

 getPegawai(param){
    this.biodata_s.getByOne(param)
    .subscribe((data)=>{
      this.pegawai_one = data.data
      console.log(this.pegawai_one)
    })
  }

 pilihUnitInduk(p0,p1,p2){
   if (p0== "new") {
     // code...
     this.unitInduk_id = p1
     this.unitInduk = p2
   }else{
     this.edit_unitInduk_id = p1
     this.edit_unitInduk = p2
   }
   this.dropdown_uker(p1, this.jenisJabatan)
 }

 pilihUnitKerja(p0,p1,p2){
   if (p0=="new") {
     // code...
     this.unitKerja_id = p1
     this.unitKerja = p2
   }else{
     this.edit_unitKerja_id = p1
     this.edit_unitKerja = p2
   }
 }

 pilihGolongan(p0, p1, p2, p3){
   if (p0== "new") {
     // code...
     this.golongan = p2 + "/"+p3
     this.golongan_id = p1
   }else{
     this.edit_golongan = p2 + "/"+p3
     this.edit_golongan_id = p1
   }
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
