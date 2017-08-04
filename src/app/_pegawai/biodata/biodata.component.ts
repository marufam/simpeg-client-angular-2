import { Component, OnInit } from '@angular/core';
import { PegawaiBiodataService } from '../../_service/pegawai-biodata.service';
import {MainServiceService} from '../../_service/main-service.service'

@Component({
  selector: 'app-biodata',
  templateUrl: './biodata.component.html',
  styleUrls: ['./biodata.component.css']
})
export class BiodataComponent implements OnInit {
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
  	private myservice : PegawaiBiodataService,
    private main_s :MainServiceService

  ) { }

  ngOnInit() {
  	this.getAll()
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
          console.log(data.data)
  			}else{
  				this.listItem = "data kosong"
  			}
  	  },
  		(Error) => console.log(Error)
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

}
