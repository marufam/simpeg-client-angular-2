import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as env from '../global'

@Injectable()
export class UkerInstansiService {
token = localStorage.getItem('token');
  myUri = '/master/ukerinstansi/';

  constructor(private http : Http) { 
  	this.http = http;
  }

  getAll(){
    let headers = new Headers();
    headers.append('x-access-token', this.token );
    let option = { headers : headers};

  	return  this.http.get(env.url + this.myUri, option )
  	.map(res=>res.json())
  }
  
  getByOne(param){
    let headers = new Headers();
    headers.append('x-access-token', this.token);
    let option = {headers : headers};

    return  this.http.get(env.url + this.myUri + param, option )
    .map(res=>res.json())
  }

  edit(credential,param){
    let headers = new Headers();
    headers.append('x-access-token', this.token);
    headers.append('Content-type', 'Application/json');
    let option = {headers : headers};

     return  this.http.put(env.url + this.myUri + param,JSON.stringify(credential), option )
    .map(res=>res.json())

  }

  save(credential){
    let headers = new Headers();
    headers.append('x-access-token', this.token);
    headers.append('Content-type', 'Application/json');
    let option = {headers : headers};

     return  this.http.post(env.url + this.myUri,JSON.stringify(credential), option )
    .map(res=>res.json())

  }

  delete(param){
    let headers = new Headers();
    headers.append('x-access-token', this.token);
    let option = {headers : headers};

     return  this.http.delete(env.url + this.myUri + param, option )
    .map(res=>res.json())
  }

}
