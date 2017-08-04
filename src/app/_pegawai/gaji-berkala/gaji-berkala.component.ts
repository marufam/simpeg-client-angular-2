import { Component, OnInit } from '@angular/core';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import { PegawaiGajiBerkalaService } from '../../_service/pegawai-gaji-berkala.service';

import { PegawaiBiodataService } from '../../_service/pegawai-biodata.service';
import { GajiService } from '../../_service/gaji.service';
import { GolruangService } from '../../_service/golruang.service';


@Component({
  selector: 'app-gaji-berkala',
  templateUrl: './gaji-berkala.component.html',
  styleUrls: ['./gaji-berkala.component.css']
})
export class GajiBerkalaComponent implements OnInit {
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
      }
    )
  }

   deteleById(param){
    this.myservice.delete(param)
    .subscribe(
      (data) => {
          this.ngOnInit()
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

}
