import { Component, OnInit } from '@angular/core';
import { GajiService } from '../../_service/gaji.service';
import { GolruangService } from '../../_service/golruang.service';
import { PerpresService } from '../../_service/perpres.service';
import {MainServiceService} from '../../_service/main-service.service'


@Component({
  selector: 'app-gaji',
  templateUrl: './gaji.component.html',
  styleUrls: ['./gaji.component.css']
})
export class GajiComponent implements OnInit {
  ismenu : any;
  listItem :any;
  listgolruang : any;
  listperpres : any;
  listOne : any;
  
  id:any;
  idHapus:any;

  credential :any;

  //variable edit
  editItem : string
  nominal_edit : number
  golruang_edit : string
  golruang_edit_id : string
  perpres_edit : string
  perpres_edit_id : string

  //variable create new
  newItem : string;
  nominal_new : number
  golruang_new : string
  golruang_new_id : string
  perpres_new : string
  perpres_new_id : string

  constructor(
  	private myservice : GajiService,
  	private golruang_service : GolruangService,
  	private perpres_service : PerpresService,
      private main_s : MainServiceService

  ) { }

  ngOnInit() {
  	this.getAll()

  	this.golruang_new = "pilih golruang "
  	this.perpres_new = "pilih perpres"
  	this.getGolruang()
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
         this.listOne = data.data
         this.editItem = this.listOne[0].masakerja
         this.nominal_edit = this.listOne[0].nominal
         this.golruang_edit = this.listOne[0].golruang.golongan.keterangan + "/ " + this.listOne[0].golruang.ruang.keterangan;
         this.golruang_edit_id = this.listOne[0].golruang._id;
         this.perpres_edit = this.listOne[0].perpres.keterangan;
         this.perpres_edit_id = this.listOne[0].perpres.keterangan;
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
    	masakerja : this.newItem, 
    	nominal : this.nominal_new, 
    	golruang : this.golruang_new_id,
    	perpres : this.perpres_new_id
    };
    console.log(this.credential)
    this.myservice.save(this.credential)
    .subscribe(
      (data) => {
          this.ngOnInit()
      }
    )
  }

  updateById(param){
    this.credential = {
    	masakerja : this.editItem, 
    	nominal : this.nominal_edit, 
    	golruang : this.golruang_edit_id,
    	perpres : this.perpres_edit_id
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

  // drop down menu
  getGolruang(){
  	this.golruang_service.getAll()
  	.subscribe(
		  (data) => {
  			if (data) {
  				this.listgolruang = data.data
  			}else{
  				this.listgolruang = "data kosong"
  			}
  	  },
  		(Error) => console.log(Error)
	  )

  }

  getPerpres(){
  	this.perpres_service.getAll()
  	.subscribe(
		  (data) => {
  			if (data) {
  				this.listperpres = data.data
  			}else{
  				this.listperpres = "data kosong"
  			}
  	  },
  		(Error) => console.log(Error)
	  )

  }

  pilihGolruang(param1, param2, param3){
  	this.golruang_new = param2 + " / " + param3
  	this.golruang_new_id = param1
  }
  pilihPerpres(param1, param2, param3){
  	this.perpres_new = param2 + " / " + param3
  	this.perpres_new_id = param1
  }

  pilihGolruangEdit(param1, param2, param3){
  	this.golruang_edit = param2 + " / " + param3
  	this.golruang_edit_id = param1
  }
  pilihPerpresEdit(param1, param2, param3){
  	this.perpres_edit = param2 + " / " + param3
  	this.perpres_edit_id = param1
  }
}
