import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { UploadFileService } from '../../_service/upload-file.service'
import {MainServiceService} from '../../_service/main-service.service'


@Component({
  selector: 'app-perpres',
  templateUrl: './perpres.component.html',
  styleUrls: ['./perpres.component.css']
})
export class PerpresComponent implements OnInit {
	ismenu : any;
  url : any
  constructor(
    private http : Http,
    private myservice : UploadFileService,
    private main_s : MainServiceService
  	) { }

  ngOnInit() {
  }

  upload($event){
    this.myservice.saveFile($event)
    .subscribe(
      (data) => {
         console.log(data)
      }
    )

  }

}
