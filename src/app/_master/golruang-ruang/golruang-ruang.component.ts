import { Component, OnInit } from '@angular/core';
import { GolruangRuangService } from '../../_service/golruang-ruang.service';
import {MainServiceService} from '../../_service/main-service.service'

@Component({
  selector: 'app-golruang-ruang',
  templateUrl: './golruang-ruang.component.html',
  styleUrls: ['./golruang-ruang.component.css']
})
export class GolruangRuangComponent implements OnInit {
  ismenu : any;
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
  	private myservice : GolruangRuangService,
    private main_s :MainServiceService

  ) { }

  ngOnInit() {
  	this.getAll()
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

  createNew(){
    this.credential = {ruang : this.newItem};
    this.myservice.save(this.credential)
    .subscribe(
      (data) => {
          this.ngOnInit()
      }
    )
  }

  updateById(param){
    this.credential = {ruang : this.editItem };
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

}
