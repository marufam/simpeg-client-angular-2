import { Component, OnInit , OnChanges, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MasteragamaService } from '../../_service/masteragama.service';

import {MainServiceService} from '../../_service/main-service.service'

  @Component({

    selector: 'app-agama',
    templateUrl: './agama.component.html',
    styleUrls: ['./agama.component.css']
  })
export class AgamaComponent implements OnInit {
  ismenu : any;
  listAgama :any;
  agamaOne : any;
  id:any;
  credential :any;
  idHapus:any;
  //variable edit
  editKeteranganAgama : string;

  //variable create new
  agamaBaru : string;

  constructor(
  		private agamaService : MasteragamaService, 
  		private router : Router,
  		private activeRoute : ActivatedRoute,
      private main_s : MainServiceService

  	) { 
  }

  ngOnInit() {
  	this.cekIdUri()
  	this.getAll()
    // this.getByOne()
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

  cekIdUri(){
    return this.activeRoute.params.subscribe(params =>{this.id = params['id'];})
  }

  getByOne(param){
    this.agamaService.getByOne(param)
    .subscribe(
      (data) => {
         this.agamaOne = data.data;
         console.log(this.agamaOne)
      }
    )
  }

  getAll(){
  	this.agamaService.getAll()
  	.subscribe(
		  (data) => {
  			if (data) {
  				this.listAgama = data.data
  			}else{
  				this.listAgama = "data kosong"
  			}
  	  },
  		(Error) => console.log(Error)
	  )
  }

  createNew(){
    this.credential = {agama : this.agamaBaru};
    this.agamaService.save(this.credential)
    .subscribe(
      (data) => {
         console.log(data)
          this.ngOnInit()
      }
    )
  }

  updateById(param){
    this.credential = {agama : this.editKeteranganAgama};
    this.agamaService.edit(this.credential, param)
    .subscribe(
      (data) => {
          this.ngOnInit()

      }
    )
  }

  deteleById(param){
    this.agamaService.delete(param)
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
