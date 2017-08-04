import { Component, OnInit , OnChanges, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UkerInstansiService } from '../../_service/uker-instansi.service';
import { UkerService } from '../../_service/uker.service';

@Component({
  selector: 'app-uker',
  templateUrl: './uker.component.html',
  styleUrls: ['./uker.component.css']
})
export class UkerComponent implements OnInit {
  
  listItem :any;
  listOne : any;
  instansi : string;
  instansi_id : string;

  instansi_c : any;
  id:any;
  jenis_pegawai_dropdown:string
  credential :any;
  idHapus:any;
  //variable edit
  editItem : string;
  editInstansi : string;
  editInstansi_id : string;
  editJenisPegawai : string;

  //variable create new
  newItem : string;
  newInstansi : string;
  newInstansi_id : string;
  newJenisPegawai : string;

  constructor(
  	private myservice : UkerService,
  	private uker_instansi_s : UkerInstansiService
  ) { }

  ngOnInit() {
    this.jenis_pegawai_dropdown = "pilih jenis pegawai"
  	this.newJenisPegawai = "pilih jenis pegawai"
  	this.newInstansi = "pilih instnsi"
  	this.instansi = " pilih instansi"
  	this.showInstansi()
  }

  getByOne(param){
    this.myservice.getByOne(param)
    .subscribe(
      (data) => {
         this.listOne = data.data;
         this.editItem = this.listOne[0].keterangan;
         this.editInstansi = this.listOne[0].instansi.keterangan;
         this.editInstansi_id = this.listOne[0].instansi._id;
         this.editJenisPegawai = this.listOne[0].jenisPegawai;
      }
    )
  }

  getAll(param1, param2){
  	this.instansi_id = param1
  	this.instansi = param2
  	this.myservice.getAll(param1,this.jenis_pegawai_dropdown)
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
    this.credential = {
    	uker : this.newItem, 
    	jenisPegawai : this.newJenisPegawai,
    	instansi : this.newInstansi_id
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
      	uker : this.editItem, 
    	jenisPegawai : this.editJenisPegawai,
    	instansi : this.editInstansi_id 
    };
    this.myservice.edit(this.credential, param)
    .subscribe(
      (data) => {
          this.getAll(this.instansi_id, this.instansi)
      }
    )
  }

  deteleById(param){
    this.myservice.delete(param)
    .subscribe(
      (data) => {
          console.log(data)
          this.getAll(this.instansi_id, this.instansi)
      }
    )
  }

  hapus(data){
    this.idHapus=data;
  }

  //eksternal service
  showInstansi(){
    this.uker_instansi_s.getAll()
    .subscribe(
      (data) => {
        if (data) {
          this.instansi_c = data.data
        }else{
          this.instansi_c = "data kosong"
        }
      },
      (Error) => console.log(Error)
    )
  }

  pilihInstansi(param, param2){
    this.newInstansi = param2
    this.newInstansi_id = param
  }

  pilihJenisPegawai(param){
  	this.newJenisPegawai = param
  }

  pilihInstansiEdit(param, param2){
    this.editInstansi = param2
    this.editInstansi_id = param
  }

  pilihJenisPegawaiEdit(param){
  	this.editJenisPegawai = param
  }

  jenisPegawai(param){
    this.jenis_pegawai_dropdown = param
  }
}
