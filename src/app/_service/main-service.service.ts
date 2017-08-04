import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import * as env from '../global'

@Injectable()
export class MainServiceService {

  token = localStorage.getItem('token');

  constructor(private http : Http) { 
  	this.http = http;
  }

  whois(){
    let headers = new Headers();
    headers.append('x-access-token', this.token );
    let option = { headers : headers};

  	return  this.http.get(env.url + '/u1/whois', option )
  	.map(res=>res.json())
  }

  getmymenu(param){
  	let headers = new Headers();
    headers.append('x-access-token', this.token );
    let option = { headers : headers};

  	return  this.http.get(env.url + '/master/menu/public/'+param, option )
  	.map(res=>res.json())
  }

}
