import { Injectable } from '@angular/core';
import { ServicesService } from '../../service/services.service'
import CryptoJS from 'crypto-js';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  short_label?: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  main: MainMenuItems[];
}

const MENUITEMS = [
  {
    main: [
      {
        state: '/dashboard',
        short_label: 'D',
        name: 'dashboard',
        type: 'link',
        icon: 'ti-home'
      },
      {
        state: '/user/',
        short_label: 'B',
        name: 'Gestión de usuarios',
        type: 'sub',
        icon: 'ti-user',
        children: [
          {
            state: 'list-user',
            name: 'Mantenimiento de Usuarios'
          },
          {
            state: 'maintance-profile',
            name: 'Mantenimiento de Perfiles'
          }
        ]
      },
      {
        state: '/user/',
        short_label: 'B',
        name: 'Recepción',
        type: 'sub',
        icon: 'ti-receipt',
        children: [
          {
            state: 'list-user',
            name: 'Registro de personas'
          },
          {
            state: 'maintance-profile',
            name: 'Registro de salida'
          },
          {
            state: 'maintance-profile',
            name: 'Monitor de espera'
          }
        ]
      }
    ]
  },

];

@Injectable()
export class MenuItems {
}
