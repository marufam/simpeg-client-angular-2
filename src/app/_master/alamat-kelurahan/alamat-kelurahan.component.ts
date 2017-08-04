import { Component, OnInit , OnChanges, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlamatKecamatanService } from '../../_service/alamat-kecamatan.service';
import { AlamatKotaService } from '../../_service/alamat-kota.service';
import { AlamatProvinsiService } from '../../_service/alamat-provinsi.service';

import {MainServiceService} from '../../_service/main-service.service'


@Component({
  selector: 'app-alamat-kelurahan',
  templateUrl: './alamat-kelurahan.component.html',
  styleUrls: ['./alamat-kelurahan.component.css']
})
export class AlamatKelurahanComponent implements OnInit {
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
      }
    )
  }

  updateById(param){
    this.credential = {kelurahan : this.newItem, kota : this.kotaNew};
    this.myservice.edit(this.credential, param)
    .subscribe(
      (data) => {
          this.ngOnInit()
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

}
