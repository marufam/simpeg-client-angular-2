import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'
import { DatePickerOptions, DateModel } from 'ng2-datepicker';

import { GolruangService } from '../../_service/golruang.service';
import { GajiService } from '../../_service/gaji.service';
import { PegawaiPangkatService } from '../../_service/pegawai-pangkat.service';
import { PegawaiBiodataService } from '../../_service/pegawai-biodata.service';


@Component({
  selector: 'app-pangkat',
  templateUrl: './pangkat.component.html',
  styleUrls: ['./pangkat.component.css']
})
export class PangkatComponent implements OnInit {
	//collection
	gaji_c : any
	golruang_c : any

	listItem :any
	listOne : any
	idHapus : string

	credential : any

	pejabatPengangkat:string
	noSK:string
	tglSK:string
	golongan:string
	masaKerjatahun : number
	masaKerjabulan : number
	tmtSK:DateModel
	angkaKredit:number
	gaji:number
	jenisPangkat:string
	nip:string

	edit_pejabatPengangkat:string
	edit_noSK:string
	edit_tglSK:string
	edit_golongan:string
	edit_masaKerjatahun : number
	edit_masaKerjabulan : number
	edit_tmtSK:DateModel
	edit_angkaKredit:number
	edit_gaji:number
	edit_jenisPangkat:string
	edit_nip:string

  constructor(
  	private myservice : PegawaiPangkatService,
  	private gaji_s : GajiService,
  	private golruang_s : GolruangService
  ) { }

  ngOnInit() {
  }

  getByOne(param){
    this.myservice.getByOne(param)
    .subscribe(
      (data) => {
         this.listOne = data.data;
         console.log(data.data.nip)
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
    	pejabatPengangkat : this.pejabatPengangkat,
		noSK : this.noSK,
		tglSK : this.tglSK,
		golongan : this.golongan,
		masaKerjatahun : this.masaKerjatahun,
		masaKerjabulan : this.masaKerjabulan,
		tmtSK : this.tmtSK,
		angkaKredit : this.angkaKredit,
		gaji : this.gaji,
		jenisPangkat : this.jenisPangkat,
		nip : this.nip
    };
    this.myservice.save(this.credential)
    .subscribe(
      (data) => {
          this.ngOnInit()
      }
    )
  }

  updateById(param){
    this.credential = {
    	pejabatPengangkat : this.edit_pejabatPengangkat,
		noSK : this.edit_noSK,
		tglSK : this.edit_tglSK,
		golongan : this.edit_golongan,
		masaKerjatahun : this.edit_masaKerjatahun,
		masaKerjabulan : this.edit_masaKerjabulan,
		tmtSK : this.edit_tmtSK,
		angkaKredit : this.edit_angkaKredit,
		gaji : this.edit_gaji,
		jenisPangkat : this.edit_jenisPangkat,
		nip : this.edit_nip
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
          console.log(data)
          this.ngOnInit()
      }
    )
  }

  hapus(data){
    this.idHapus=data;
  }


// add ons
  gaji_on_change(p1,p2){
  	this.gaji_s.getByGolruang(p1, p2)
  	.subscribe(
      (data) => {
          this.gaji = data.data
          console.log(data.data)
      }
    )
  }

  dropdown_golruang(){
 	this.golruang_s.getAll()
 	.subscribe(
 		(data)=>{
 			this.golruang_c = data.data
 		}
 	)
 }
}
