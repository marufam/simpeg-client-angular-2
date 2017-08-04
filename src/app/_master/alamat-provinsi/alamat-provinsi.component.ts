import { Component, OnInit , OnChanges, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlamatProvinsiService } from '../../_service/alamat-provinsi.service';
import {MainServiceService} from '../../_service/main-service.service'


@Component({
  selector: 'app-alamat-provinsi',
  templateUrl: './alamat-provinsi.component.html',
  styleUrls: ['./alamat-provinsi.component.css']
})
export class AlamatProvinsiComponent implements OnInit {
  ismenu:any;
  listItem :any;
  listOne : any;
  id:any;
  credential :any;
  idHapus:any;
  //variable edit
  editItem : string;

  //variable create new
  newItem : string;

  constructor(
  		private myservice : AlamatProvinsiService, 
  		private router : Router,
  		private activeRoute : ActivatedRoute,
      private main_s : MainServiceService
  	) { 
  }

  ngOnInit() {
  	this.getAll()
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
  			}else{
  				this.listItem = "data kosong"
  			}
  	  },
  		(Error) => console.log(Error)
	  )
  }

  createNew(){
    this.credential = {provinsi : this.newItem};
    this.myservice.save(this.credential)
    .subscribe(
      (data) => {
          this.ngOnInit()
      }
    )
  }

  updateById(param){
    this.credential = {provinsi : this.editItem};
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


}
