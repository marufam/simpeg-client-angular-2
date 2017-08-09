import { Component, OnInit , ViewChild} from '@angular/core';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import { PegawaiGajiBerkalaService } from '../../_service/pegawai-gaji-berkala.service';

import { PegawaiBiodataService } from '../../_service/pegawai-biodata.service';
import { GajiService } from '../../_service/gaji.service';
import { GolruangService } from '../../_service/golruang.service';

import {Popup} from 'ng2-opd-popup';

@Component({
  selector: 'app-gaji-berkala',
  templateUrl: './gaji-berkala.component.html',
  styleUrls: ['./gaji-berkala.component.css']
})
export class GajiBerkalaComponent implements OnInit {

  @ViewChild('popup1') popup1: Popup;

  msg : string;
  img : string;

	credential : any
  listItem : any
  listOne : any
	list_gol : any
	pegawai_one : any

	nip_pegawai:number
	pej_pengangkat_new: string
	no_sk:string
	date:any
	golongan:string
	golongan_id:any
	masaKerja_tahun:string
	masaKerja_bulan:string
	tmt_SK:any
	gaji_pegawai:string

  edit_nip_pegawai:number
  pej_pengangkat_edit: string
  edit_no_sk:string
  edit_date:any
  edit_golongan:string
  edit_golongan_id:any
  edit_masaKerja_tahun:string
  edit_masaKerja_bulan:string
  edit_tmt_SK:any

  idHapus : string

  constructor(
  	private myservice : PegawaiGajiBerkalaService,
  	private biodata_s : PegawaiBiodataService,
  	private gaji_s : GajiService,
  	private golruang_s : GolruangService
  ) { }

  ngOnInit() {
  	this.golongan = "pilih golongan"
  	this.getGolongan()
    this.getAll()
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

  getByOne(param){
    this.myservice.getByOne(param)
    .subscribe(
      (data) => {
          this.listOne = data.data;
          this.edit_nip_pegawai = this.listOne[0].nip
          this.pej_pengangkat_edit= this.listOne[0].pejabatPengangkat
          this.edit_no_sk= this.listOne[0].NomorSK
          this.edit_date= this.listOne[0].tglSK
          this.edit_golongan= this.listOne[0].gol
          this.edit_masaKerja_tahun= this.listOne[0].masaKerja.tahun
          this.edit_masaKerja_bulan= this.listOne[0].masaKerja.tahun
          this.edit_tmt_SK = this.listOne[0].tmtSK
          this.gaji_pegawai = this.listOne[0].gaji
          console.log(this.listOne)
          this.getPegawai(this.listOne[0].nip)

      }
    )
  }

  createNew(){
    this.credential = {
      nip: this.nip_pegawai,
      pejabatPengangkat: this.pej_pengangkat_new,
      noSK: this.no_sk,
      tglSK: this.date.formatted,
      golongan: this.golongan,
      masaKerja_tahun : this.masaKerja_tahun,
      masaKerja_bulan : this.masaKerja_bulan,
      tmtSK: this.tmt_SK.formatted,
      gaji: this.gaji_pegawai
     };
    console.log(this.credential);
    this.myservice.save(this.credential)
    .subscribe(
      (data) => {
          this.ngOnInit()
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

  updateById(param){
    this.credential = {
      nip: this.edit_nip_pegawai,
      pejabatPengangkat: this.pej_pengangkat_edit,
      noSK: this.edit_no_sk,
      tglSK: this.edit_date.formatted,
      golongan: this.edit_golongan,
      masaKerja_tahun : this.edit_masaKerja_tahun,
      masaKerja_bulan : this.edit_masaKerja_bulan,
      tmtSK: this.edit_tmt_SK.formatted,
      gaji: this.gaji_pegawai
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

  // function drop down pilih golongan
  getGolongan(){
  	this.golruang_s.getAll()
    .subscribe(
      (data) => {
          this.list_gol = data.data
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

  getGaji(event){
  	this.gaji_s.getByGolruang(this.golongan_id, event.target.value)
  	.subscribe(
      (data) => {
          this.gaji_pegawai = data.data[0].nominal
      }
    )
  }

  pilihGolongan(param1, param2, param3){
  	this.golongan = param2 + " / "+ param3
  	this.golongan_id = param1
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
