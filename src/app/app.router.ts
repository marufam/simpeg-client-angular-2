// Imports
// Deprecated import
// import { provideRouter, RouterConfig } from '@angular/router';
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent }    from './login/login.component';
import { HomeComponent }    from './home/home.component';
//pegawai page
import { BiodataComponent }    from './_pegawai/biodata/biodata.component';
import { BiodataFormComponent }    from './_pegawai/biodata-form/biodata-form.component';
import { GajiBerkalaComponent }    from './_pegawai/gaji-berkala/gaji-berkala.component';
import { JabatanComponent }    from './_pegawai/jabatan/jabatan.component';
import { PangkatComponent }    from './_pegawai/pangkat/pangkat.component';

//master
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
import { UkerComponent } from './_master/uker/uker.component';
import { UkerInstansiComponent } from './_master/uker-instansi/uker-instansi.component';

import { UserComponent } from './_user/user/user.component';

// Route Configuration
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
  	path : 'login',
  	component : LoginComponent
  },
  {
    path : 'user/:id',
    component : UserComponent
  },
  {
  	path : 'pegawai',
  	children  :[
      {
        path : '',
        component : HomeComponent
      },
      {
        path : 'biodata',
        children : [
          {
            path : '',
            component : BiodataComponent
          },
          {
            path : ':nip',
            component : BiodataFormComponent
          },
          {
            path : 'tambah_baru',
            component : BiodataFormComponent
          }
        ]
      },
      {
        path : 'gaji-berkala',
        children : [
          {
            path : '',
            component : GajiBerkalaComponent
          }
        ]
      },
      {
        path : 'jabatan',
        children : [
          {
            path : '',
            component : JabatanComponent
          }
        ]
      },
      {
        path : 'pangkat',
        children : [
          {
            path : '',
            component : PangkatComponent
          }
        ]
      }
    ]
  },
  {
    path : 'user',
    children  :[
      {
        path : '',
        component : HomeComponent
      },
      {
        path : 'biodata',
        children : [
          {
            path : '',
            component : BiodataComponent
          }
        ]
      },
      {
        path : 'gaji-berkala',
        children : [
          {
            path : '',
            component : GajiBerkalaComponent
          }
        ]
      }
    ]
  },
  {
    path : 'master',
    children : [
      {
        path : 'agama',
        children : [
          {
            path : '',
            component : AgamaComponent
          }
        ]
      },
      {
        path : 'uker',
        children : [
          {
            path : '',
            component : UkerComponent
          }
        ]
      },
      {
        path : 'uker-instansi',
        children : [
          {
            path : '',
            component : UkerInstansiComponent
          }
        ]
      },
      {
        path : 'kelurahan',
        children : [
          {
            path : '',
            component : AlamatKelurahanComponent
          }
        ]
      },
      {
        path : 'kota',
        children : [
          {
            path : '',
            component : AlamatKotaComponent
          }
        ]
      },
      {
        path : 'provinsi',
        children : [
          {
            path : '',
            component : AlamatProvinsiComponent
          }
        ]
      },
      {
        path : 'gaji',
        children : [
          {
            path : '',
            component : GajiComponent
          }
        ]
      },
      {
        path : 'golruang',
        children : [
          {
            path : '',
            component : GolruangComponent
          }
        ]
      },
      {
        path : 'ruang',
        children : [
          {
            path : '',
            component : GolruangRuangComponent
          }
        ]
      },
      {
        path : 'golongan',
        children : [
          {
            path : '',
            component : GolruangGolonganComponent
          }
        ]
      },
      {
        path : 'menu',
        children : [
          {
            path : '',
            component : MenuHasRoleComponent
          }
        ]
      },
      {
        path : 'perpres',
        children : [
          {
            path : '',
            component : PerpresComponent
          }
        ]
      },
      {
        path : 'role',
        children : [
          {
            path : '',
            component : RoleComponent
          }
        ]
      }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);