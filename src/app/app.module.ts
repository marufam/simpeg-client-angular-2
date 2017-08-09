import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import 'rxjs/add/operator/map';

import { DatePickerModule } from 'ng2-datepicker';

import { MainServiceService } from './_service/main-service.service'
import { UploadFileService } from './_service/upload-file.service'

import { AuthService } from './_service/auth.service'
import { MasteragamaService } from './_service/masteragama.service'
import { AlamatProvinsiService } from './_service/alamat-provinsi.service'
import { AlamatKotaService } from './_service/alamat-kota.service'
import { AlamatKecamatanService } from './_service/alamat-kecamatan.service'
import { AlamatKelurahanService } from './_service/alamat-kelurahan.service'
import { GajiService } from './_service/gaji.service'
import { GolruangService } from './_service/golruang.service'
import { GolruangGolonganService } from './_service/golruang-golongan.service'
import { GolruangRuangService } from './_service/golruang-ruang.service'
import { MenuHasRoleService } from './_service/menu-has-role.service'
import { PerpresService } from './_service/perpres.service'
import { RoleService } from './_service/role.service'
import { UkerInstansiService } from './_service/uker-instansi.service'
import { UkerService } from './_service/uker.service'


//pegawai
import { PegawaiBiodataService } from './_service/pegawai-biodata.service'
import { PegawaiGajiBerkalaService } from './_service/pegawai-gaji-berkala.service'
import { PegawaiJabatanService } from './_service/pegawai-jabatan.service'
import { PegawaiPangkatService } from './_service/pegawai-pangkat.service'
import { PegawaiPendidikanService } from './_service/pegawai-pendidikan.service'

import { routing } from './app.router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AgamaComponent } from './_master/agama/agama.component';
import { AlamatKelurahanComponent } from './_master/alamat-kelurahan/alamat-kelurahan.component';
import { AlamatKotaComponent } from './_master/alamat-kota/alamat-kota.component';
import { AlamatProvinsiComponent } from './_master/alamat-provinsi/alamat-provinsi.component';
import { GolruangComponent } from './_master/golruang/golruang.component';
import { GolruangGolonganComponent } from './_master/golruang-golongan/golruang-golongan.component';
import { GolruangRuangComponent } from './_master/golruang-ruang/golruang-ruang.component';
import { GajiComponent } from './_master/gaji/gaji.component';
import { PerpresComponent } from './_master/perpres/perpres.component';
import { RoleComponent } from './_master/role/role.component';
import { MenuHasRoleComponent } from './_master/menu-has-role/menu-has-role.component';
import { BiodataComponent } from './_pegawai/biodata/biodata.component';
import { BiodataFormComponent } from './_pegawai/biodata-form/biodata-form.component';
import { GajiBerkalaComponent } from './_pegawai/gaji-berkala/gaji-berkala.component';
import { JabatanComponent } from './_pegawai/jabatan/jabatan.component';
import { PangkatComponent } from './_pegawai/pangkat/pangkat.component';
import { UkerComponent } from './_master/uker/uker.component';
import { UkerInstansiComponent } from './_master/uker-instansi/uker-instansi.component';
import { UserComponent } from './_user/user/user.component';

import {PopupModule} from 'ng2-opd-popup';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AgamaComponent,
    AlamatKelurahanComponent,
    AlamatKotaComponent,
    AlamatProvinsiComponent,
    GolruangComponent,
    GolruangGolonganComponent,
    GolruangRuangComponent,
    GajiComponent,
    PerpresComponent,
    RoleComponent,
    MenuHasRoleComponent,
    BiodataComponent,
    BiodataFormComponent,
    GajiBerkalaComponent,
    JabatanComponent,
    PangkatComponent,
    UkerComponent,
    UkerInstansiComponent,
    UserComponent,
   ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    DatePickerModule,
    PopupModule.forRoot()
  ],
  providers: [
    MainServiceService,
    AuthService,
    MasteragamaService,
    AlamatProvinsiService,
    AlamatKotaService,
    AlamatKecamatanService,
    AlamatKelurahanService,
    GajiService,
    GolruangService,
    GolruangGolonganService,
    GolruangRuangService,
    MenuHasRoleService,
    PerpresService,
    RoleService,
    UkerService,
    UkerInstansiService,
    UploadFileService,
    //pegawai
    PegawaiBiodataService,
    PegawaiGajiBerkalaService,
    PegawaiJabatanService,
    PegawaiPendidikanService,
    PegawaiPangkatService
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
