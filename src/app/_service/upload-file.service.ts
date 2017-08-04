import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as env from '../global'

@Injectable()
export class UploadFileService {
  
  token = localStorage.getItem('token');

  constructor(
  	private http : Http
  ) { }

  saveImagePegawai($event, nip){
   const files = $event.target.files || $event.srcElement.files;
    const file = files[0];
    const formData = new FormData();
    formData.append('nipBaru', nip);
    formData.append('avatar', file);

    const headers = new Headers({});
    headers.append('x-access-token', localStorage.getItem('token'));

    let option = {headers : headers};

     return  this.http.post(env.url + "/pegawai/upload",formData, option )
    .map(res=>res.json())

  }

  saveFile($event){
   const files = $event.target.files || $event.srcElement.files;
    const file = files[0];
    const formData = new FormData();
    formData.append('avatar', file);

    const headers = new Headers({});
    headers.append('x-access-token', localStorage.getItem('token'));

    let option = {headers : headers};

     return  this.http.post(env.url + "/pegawai/upload",formData, option )
    .map(res=>res.json())

  }

}
