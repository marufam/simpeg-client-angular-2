import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { PegawaiBiodataService } from '../../_service/pegawai-biodata.service';
import { PegawaiGajiBerkalaService } from '../../_service/pegawai-gaji-berkala.service';
import { PegawaiPendidikanService } from '../../_service/pegawai-pendidikan.service';
import { PegawaiPangkatService } from '../../_service/pegawai-pangkat.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  me_c : any
  gaji_c :any
  pangkat_c :any
  pendidikan_c :any

  my_nip : string

  status_gaji : boolean
  status_pangkat : boolean
  status_pendidikan : boolean

  patchAvatar : string
  constructor(
  		private activeR : ActivatedRoute,
  		private biodata : PegawaiBiodataService,
  		private gaji : PegawaiGajiBerkalaService,
  		private pendidikan : PegawaiPendidikanService,
  		private pangkat : PegawaiPangkatService
  	) { }

  ngOnInit() {
  	this.activeR
        .params
        .subscribe(params => {
            // Récupération des valeurs de l'URL
            this.my_nip = params['id']; // --> Name must match wanted paramter
    });

    this.getBiodata()
  }

  getBiodata(){
  	this.biodata.getByOne(this.my_nip)
  	.subscribe(
  		(data) => {
  			this.me_c = data.data
  			this.patchAvatar = "http://localhost:81/uploads/images/"+data.data[0].avatar
  			console.log(this.me_c)
  		}
  	)
  }

  getGaji(){
  	this.gaji.getByNip(this.my_nip)
  	.subscribe(
  		(data)=> {
  			if (data.data != null|| data.data != undefined) {
	  			this.gaji_c = data.data
	  			console.log(this.gaji_c)
	  			this.status_gaji = true
  			}else{
	  			this.status_gaji = false

  			}
  		}
  	)
  }

  getPendidikan(){
  	this.pendidikan.getByNip(this.my_nip)
  	.subscribe(
  		(data)=> {
  			if (data.data != null|| data.data != undefined) {
	  			this.gaji_c = data.data
	  			console.log(this.gaji_c)
	  			this.status_gaji = true
  			}else{
	  			this.status_gaji = false

  			}
  		}
  	)
  }

  getPangkat(){
  	this.pangkat.getByNip(this.my_nip)
  	.subscribe(
  		(data)=> {
  			if (data.data != null|| data.data != undefined) {
	  			this.gaji_c = data.data
	  			console.log(this.gaji_c)
	  			this.status_gaji = true
  			}else{
	  			this.status_gaji = false

  			}
  		}
  	)
  }

}
