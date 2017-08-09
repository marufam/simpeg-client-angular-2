import { Component, OnInit ,ViewChild} from '@angular/core';
import { MenuHasRoleService } from '../../_service/menu-has-role.service';
import { RoleService } from '../../_service/role.service';

import {MainServiceService} from '../../_service/main-service.service'
import {Popup} from 'ng2-opd-popup';


@Component({
  selector: 'app-menu-has-role',
  templateUrl: './menu-has-role.component.html',
  styleUrls: ['./menu-has-role.component.css']
})
export class MenuHasRoleComponent implements OnInit {

  @ViewChild('popup1') popup1: Popup;

  msg : string;
  img : string;
  

  ismenu:any;

  listItem :any;
  rolelist : any;
  listOne : any;
  id:any;

  rolenew : any;
  rolenewid : any;
  credential :any;
  idHapus:any;
  //variable edit
  func_edit : string;
  menu_edit : string;
  grup_edit : string;
  provinsiEdit : string;
  editrolenew : any;
  editrolenewid : any;
  //variable create new
  func_new : string;
  menu_new : string;
  grup_new : string;
  provinsiNew : string;

  constructor(
    private myservice : MenuHasRoleService,
  	private roleservice : RoleService,
    private main_s : MainServiceService

  ) { }

  ngOnInit() {
    this.getAll()
    this.getRole()
    this.rolenew = " pilih role"
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

  getByOne(param){
    this.myservice.getByOne(param)
    .subscribe(
      (data) => {
         this.listOne = data.data;
         this.func_edit = this.listOne[0].function;
         this.menu_edit = this.listOne[0].menu;
         this.grup_edit = this.listOne[0].grup;
         this.editrolenew = this.listOne[0].role.namarole;
         this.editrolenewid = this.listOne[0].role._id;
         console.log(this.listOne)
      }
    )
  }

  createNew(){
    this.credential = {
      func : this.func_new, 
      menu : this.menu_new, 
      grup : this.grup_new, 
      role : this.rolenewid
    };
    this.myservice.save(this.credential)
    .subscribe(
      (data) => {
          this.ngOnInit()
          if (data.success == true) {
           this.msg = "data baru telah ditambahkan"
          }else{
           this.msg = "data telah ada"

          }
          this.img = "/assets/img/icon/006-mountain.png"
          this.show_notif("#7cb82f");
      }
    )
  }

  updateById(param){
     this.credential = {
      func : this.func_edit, 
      menu : this.menu_edit, 
      grup : this.grup_edit, 
      role : this.editrolenewid
    };
    this.myservice.edit(this.credential, param)
    .subscribe(
      (data) => {
          this.ngOnInit()
          this.msg = "data telah berhasil di ubah"
          this.img = "/assets/img/icon/001-round.png"
          this.show_notif("#0077b5");

      }
    )
  }

  deteleById(param){
    this.myservice.delete(param)
    .subscribe(
      (data) => {
          console.log(data)
          this.ngOnInit()
          if (data.success == true) {
            this.msg = "data telah berhasil dihapus"
          }else{
           this.msg = "data yang telah digunakan"
          }
          this.img = "/assets/img/icon/004-danger.png"
          this.show_notif("#c70039");
      }
    )
  }

  hapus(data){
    this.idHapus=data;
  }

  //drop down menu
  getRole(){
    this.roleservice.getAll()
    .subscribe(
      (data) => {
        if (data) {
          this.rolelist = data.data
          console.log(data.data)
        }else{
          this.listItem = "data kosong"
        }
      },
      (Error) => console.log(Error)
    )
  }

  pilihrole(param, param2){
    this.rolenewid = param
    this.rolenew = param2
    console.log(param, param2)
  }

  editpilihrole(param, param2){
    this.editrolenewid = param
    this.editrolenew = param2
  }
  

  show_notif(warna){
    this.popup1.options = {
      header: "master agama",
      color: warna, // red, blue.... 
      widthProsentage: 40, // The with of the popou measured by browser width 
      animationDuration: 1, // in seconds, 0 = no animation 
      showButtons: true, // You can hide this in case you want to use custom buttons 
      cancleBtnContent: "OK", // the text on your cancel button 
      // confirmBtnClass: "btn btn-default", // your class for styling the confirm button 
      cancleBtnClass: "btn btn-default", // you class for styling the cancel button 
      animation: "bounceIn" // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown' 
    };
   
    this.popup1.show(this.popup1.options);
    
  }

}
