import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../_service/role.service';
import {MainServiceService} from '../../_service/main-service.service'


@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  constructor(
    private myservice : RoleService,
    private main_s :MainServiceService
    
  ) { }
  ismenu : any;
  listItem :any;
  listOne : any;
  id:any;

  credential :any;
  idHapus:any;
  createOpt : string;
  getOpt : string;
  putOpt : string;
  deleteOpt : string;
  //variable edit
  editItem : string;
  editcreateOpt : string;
  editgetOpt : string;
  editputOpt : string;
  editdeleteOpt : string;
  //variable create new
  newItem : string;

  ngOnInit() {
  	this.getAll()
  	this.createOpt = "pilih create"
  	this.getOpt = "polih get"
  	this.putOpt = "pilih update"
  	this.deleteOpt = "pilih delete"
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
         this.editItem = this.listOne[0].namarole;
         this.editcreateOpt = this.listOne[0].POST;
         this.editgetOpt = this.listOne[0].GET;
         this.editputOpt = this.listOne[0].PUT;
         this.editdeleteOpt = this.listOne[0].DELETE;
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
          console.log(data.data.length)
  			}else{
  				this.listItem = "data kosong"
  			}
  	  },
  		(Error) => console.log(Error)
	  )
  }

  createNew(){
    this.credential = {
    	nama : this.newItem, 
    	post : this.createOpt,
    	get : this.getOpt,
    	put : this.putOpt,
    	delete : this.deleteOpt
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
    	nama : this.editItem, 
    	post : this.editcreateOpt,
    	get : this.editgetOpt,
    	put : this.editputOpt,
    	delete : this.editdeleteOpt
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

  //drop down event
  pilihCreate(param){
  	this.createOpt = param;
  }

  pilihGet(param){
  	this.getOpt = param;
  }
  pilihPut(param){
  	this.putOpt = param;
  }
  pilihDelete(param){
  	this.deleteOpt = param;
  }

  //drop down event
  editpilihCreate(param){
  	this.editcreateOpt = param;
  }
  editpilihGet(param){
  	this.editgetOpt = param;
  }
  editpilihPut(param){
  	this.editputOpt = param;
  }
  editpilihDelete(param){
  	this.editdeleteOpt = param;
  }

}
