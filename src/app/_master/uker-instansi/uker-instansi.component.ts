import { Component, OnInit , OnChanges, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UkerInstansiService } from '../../_service/uker-instansi.service';


@Component({
  selector: 'app-uker-instansi',
  templateUrl: './uker-instansi.component.html',
  styleUrls: ['./uker-instansi.component.css']
})
export class UkerInstansiComponent implements OnInit {

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
      private myservice : UkerInstansiService, 
  ) { }

  ngOnInit() {
  	this.getAll()
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
          console.log(data.data.length)
  			}else{
  				this.listItem = "data kosong"
  			}
  	  },
  		(Error) => console.log(Error)
	  )
  }

   createNew(){
    this.credential = {ukerinstansi : this.newItem};
    this.myservice.save(this.credential)
    .subscribe(
      (data) => {
          this.ngOnInit()
      }
    )
  }

  updateById(param){
    this.credential = {
      ukerinstansi : this.editItem , 
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

}
