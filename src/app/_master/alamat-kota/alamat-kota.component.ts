import { Component, OnInit , OnChanges, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlamatKotaService } from '../../_service/alamat-kota.service';
import { AlamatProvinsiService } from '../../_service/alamat-provinsi.service';

import {MainServiceService} from '../../_service/main-service.service'

@Component({
  selector: 'app-alamat-kota',
  templateUrl: './alamat-kota.component.html',
  styleUrls: ['./alamat-kota.component.css']
})
export class AlamatKotaComponent implements OnInit {
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

  pilihProvinsi(param, param2){
    this.provinsiNew = param2
    console.log(param, param2)
  }

}
