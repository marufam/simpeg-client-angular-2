import { Component, OnInit, ViewChild } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'
import { DatePickerOptions, DateModel } from 'ng2-datepicker';

import { PegawaiBiodataService } from '../../_service/pegawai-biodata.service';
//alamat
import { AlamatKotaService } from '../../_service/alamat-kota.service';
import { AlamatKecamatanService } from '../../_service/alamat-kecamatan.service';
import { AlamatProvinsiService } from '../../_service/alamat-provinsi.service';
//agama
import { MasteragamaService } from '../../_service/masteragama.service';
import { UploadFileService } from '../../_service/upload-file.service';
//uker
import { UkerInstansiService } from '../../_service/uker-instansi.service';
import { UkerService } from '../../_service/uker.service';

import {Popup} from 'ng2-opd-popup';

@Component({
  selector: 'app-biodata-form',
  templateUrl: './biodata-form.component.html',
  styleUrls: ['./biodata-form.component.css']
})
export class BiodataFormComponent implements OnInit {

  @ViewChild('popup1') popup1: Popup;

  msg : string;
  img : string;

  date: DateModel;
  options: DatePickerOptions;

  judul : string

  listOne : any

  provlist : any
  kotalist : any
  keclist :any
  agamalist : any
  uker_c : any
  instansi_c : any

  my_nip : string

  credential : any

  nipLama : number
  nipBaru : number
  namaDepan : string
  namaBelakang : string
  tempatLahir :string
  tglLahir : Date
  notelp : number
  agama_new :string
  agama_id :string

  jenis_pegawai_new : string
  instansi_new : string
  instansi_new_id : string
  uker_new : string
  uker_new_id : string

  prov_new :string
  prov_id :string
  kota_new :string
  kota_id :string
  kec_new :string
  kec_id :string
  desa_new : string

  sex_new :string
  sex_id :string

  kawin_new :string
  kawin_id :string
  jml_anak : number

  pns_status_new :string
  pns_status_id :string

  new_date : Date

  uploadData : any


  constructor(
  	private myservice : PegawaiBiodataService,
  	//alamat
  	private kota_s : AlamatKotaService,
  	private kecamatan_s : AlamatKecamatanService,
  	private provinsi_s : AlamatProvinsiService,
  	//agama
  	private agama_s : MasteragamaService,
    //uker
    private uker_s : UkerService,
    private instansi_s : UkerInstansiService,
    //upload
    private upload_s : UploadFileService,
    //router
    private router : Router,
    private active_r : ActivatedRoute,

  ) { }

  ngOnInit() {
  	

  	this.getprovinsi()
    this.getAgama()
    this.instansiDropDown()
    

    this.active_r.params
      .map(params => params['nip'])
      .subscribe((nip) => {
         this.my_nip = nip
    });

    if (this.my_nip == "tambah_baru") {
        this.judul = "tambah baru"

        this.instansi_new = "pilih instansi"
        this.uker_new = "pilih unit kerja"

        this.prov_new = "pilih provinsi"
        this.kota_new = "kota kosong"
        this.kec_new = "kecamatan kosong"
        this.sex_new = "pilih jenis kelamin"
        this.kawin_new = "pilih status kawin"
        this.pns_status_new = "pilih status PNS"
        this.agama_new = "pilih agama"
    }else{
        this.judul = "edit nip "+this.my_nip
        this.getByOne(this.my_nip)

    }
  }

  createNew(){
    this.upload_s.saveImagePegawai(this.uploadData, this.nipBaru)
    .subscribe((data) =>{
      if (data.success == true) {
        
        this.credential = {
          avatar : data.data,
        	nipBaru: this.nipBaru,
      		nipLama: this.nipLama,
      		namaDepan: this.namaDepan,
      		namaBelakang: this.namaBelakang,
      		tempatLahir: this.tempatLahir,
      		tglLahir: this.tglLahir,
      		agama: this.agama_id,
      		// alamatJalan: 
      		alamatDesa:this.desa_new,
      		alamatKecamatan: this.kec_id,
      		alamatKab: this.kota_id,
      		alamatProv: this.prov_id,
      		statusKawin: this.kawin_id,
      		sex: this.sex_id,
      		// KPE:
      		noTelp: this.notelp,
      		jmlAnak: this.jml_anak,
      		statusPNS: this.pns_status_id,
      		jenisPegawai:this.jenis_pegawai_new,
      		// jabatan:Umum
          instansi : this.instansi_new_id,
      		uker:this.uker_new_id
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
            this.router.navigateByUrl("/pegawai/biodata")

          }
        )

      }
    })
  }

  getByOne(param){
    this.myservice.getByOne(param)
    .subscribe(
      (data) => {
         this.listOne = data.data;
         console.log(this.listOne)
         this.nipLama = this.listOne[0].nip.nipLama
         this.nipBaru = this.listOne[0].nip.nipBaru
         this.namaDepan = this.listOne[0].nama.namaDepan
         this.namaBelakang = this.listOne[0].nama.namaBelakang
         this.tempatLahir = this.listOne[0].datapersonal.lahir.tempat
         this.date = this.listOne[0].datapersonal.lahir.tanggal
         this.notelp = this.listOne[0].datapersonal.notelp
         this.agama_new = this.listOne[0].datapersonal.agama.keterangan
         this.agama_id = this.listOne[0].datapersonal.agama._id

         this.prov_new = this.listOne[0].datapersonal.alamat.provinsi.keterangan
         this.prov_id = this.listOne[0].datapersonal.alamat.provinsi._id
         this.kota_new = this.listOne[0].datapersonal.alamat.kabupaten.keterangan
         this.kota_id = this.listOne[0].datapersonal.alamat.kabupaten._id
         this.kec_new = this.listOne[0].datapersonal.alamat.kecamatan.keterangan
         this.kec_id = this.listOne[0].datapersonal.alamat.kecamatan._id
         this.desa_new = this.listOne[0].datapersonal.alamat.desa

         this.sex_id = this.listOne[0].datapersonal.jeniselamin
         if (this.listOne[0].datapersonal.jeniselamin== true) {
           this.sex_new == "laki - laki"
         }else{
           this.sex_new == "Perempuan"
         }

         this.kawin_id = this.listOne[0].datapersonal.satatusKawin
         if (this.listOne[0].datapersonal.satatusKawin== true) {
           this.kawin_new == "Kawin"
         }else{
           this.kawin_new == "Belum Kawin"
         }

         this.jml_anak = this.listOne[0].datapersonal.jumlahAnak

         this.pns_status_id = this.listOne[0].dataPNS.statusPNS
         if (this.listOne[0].dataPNS.statusPNS== true) {
           this.pns_status_new == "PNS"
         }else{
           this.pns_status_new == "Belum PNS"

         }
      }
    )
  }

  updateById(){
    this.credential = {
      nipBaru: this.nipBaru,
      nipLama: this.nipLama,
      namaDepan: this.namaDepan,
      namaBelakang: this.namaBelakang,
      tempatLahir: this.tempatLahir,
      tglLahir: this.tglLahir,
      agama: this.agama_id,
      // alamatJalan: 
      alamatDesa:this.desa_new,
      alamatKecamatan: this.kec_id,
      alamatKab: this.kota_id,
      alamatProv: this.prov_id,
      statusKawin: this.kawin_id,
      sex: this.sex_id,
      // KPE:
      noTelp: this.notelp,
      jmlAnak: this.jml_anak,
      statusPNS: this.pns_status_id,
      // jenisPegawai:Daerah
      // jabatan:Umum
      // uker:Kepegawaian Daerah
     };
    console.log(this.credential)
    this.myservice.edit(this.credential, this.my_nip)
    .subscribe(
      (data) => {
          this.ngOnInit()
          this.msg = "data telah berhasil di ubah"
          this.img = "/assets/img/icon/001-round.png"
          this.show_notif("#0077b5");
          this.router.navigateByUrl("/pegawai/biodata")
      }
    )
  }


  // service dropdown form

  getprovinsi(){
    this.provinsi_s.getAll()
    .subscribe(
      (data) => {
        if (data) {
          this.provlist = data.data
        }else{
          this.provlist = "data kosong"
        }
      },
      (Error) => console.log(Error)
    )
  }

  getKota(provid, prov){
  	this.kota_new = "pilih kota "
  	this.kota_s.getAll(provid)
  	.subscribe(
		  (data) => {
  			if (data) {
  				this.kotalist = data.data
  			}else{
  				this.kotalist = "data kosong"
  			}
  	  },
  		(Error) => console.log(Error)
	  )
  }

 
  getKec(kotaid, kota){
  	this.kec_new = "pilih kecamatan "
  	this.kecamatan_s.getAll(kotaid)
  	.subscribe(
		  (data) => {
  			if (data) {
  				this.keclist = data.data
          console.log(data.data)
  			}else{
  				this.keclist = "data kosong"
  			}
  	  },
  		(Error) => console.log(Error)
	  )
  }

  getAgama(){
    this.kota_new = "pilih kota "
    this.agama_s.getAll()
    .subscribe(
      (data) => {
        if (data) {
          this.agamalist = data.data
        }else{
          this.agamalist = "data kosong"
        }
      },
      (Error) => console.log(Error)
    )
  }

  pilihagama(param, param2){
    this.agama_new = param2
    this.agama_id = param
  }

  pilihprov(param, param2){
    this.prov_new = param2
    this.prov_id = param
    this.getKota(param, param2)
  }

  pilihkota(param, param2){
    this.kota_new = param2
    this.kota_id = param
    this.getKec(param, param2)
  }

  pilihkec(param, param2){
    this.kec_new = param2
    this.kec_id = param
  }

  pilihsex(param){
  	this.sex_id = param
  	if (param == true){
  		this.sex_new = "laki - laki"
  	}else{
  		this.sex_new = "perempuan"
  	}
  }

  pilihkawin(param){
  	this.kawin_id = param
  	if (param == true){
  		this.kawin_new = "Kawin"
  	}else{
  		this.kawin_new = "belum kawin"
  	}
  }

  pilih_pns_status(param){
  	this.pns_status_id = param
  	if (param == true){
  		this.pns_status_new = "PNS"
  	}else{
  		this.pns_status_new = "Belum PNS"
  	}
  }

  setData($event){
    this.uploadData = $event
  }

  instansiDropDown(){
    this.instansi_s.getAll()
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

  pilihInstansi(param1, param2){
    this.instansi_new = param2
    this.instansi_new_id = param1
    this.ukerDropDown(param1, this.jenis_pegawai_new)
  }

  ukerDropDown(p1,p2 ){
    this.uker_s.getAll(p1, p2)
    .subscribe(
      (data) => {
        if (data) {
          this.uker_c = data.data
        }else{
          this.uker_c = "data kosong"
        }
      },
      (Error) => console.log(Error)
    )
  }

  pilihuker(param1, param2){
    this.uker_new = param2
    this.uker_new_id = param1
  }

  pilihjenis_pegawai(e){
    this.jenis_pegawai_new = e
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
