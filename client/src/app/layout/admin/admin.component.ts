import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { animate, AUTO_STYLE, state, style, transition, trigger } from '@angular/animations';
import { Menu } from '../../shared/menu-items/menu-items';
import { Router } from '@angular/router';
import { ServicesService } from '../../service/services.service'
import CryptoJS from 'crypto-es';
import * as $ from 'jquery';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [
    trigger('mobileMenuTop', [
      state('no-block, void',
        style({
          overflow: 'hidden',
          height: '0px',
        })
      ),
      state('yes-block',
        style({
          height: AUTO_STYLE,
        })
      ),
      transition('no-block <=> yes-block', [
        animate('400ms ease-in-out')
      ])
    ]),
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
    trigger('slideOnOff', [
      state('on', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('off', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('on => off', animate('400ms ease-in-out')),
      transition('off => on', animate('400ms ease-in-out'))
    ]),
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translate(0)' }),
        animate('400ms ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class AdminComponent implements OnInit {
  navType: string; /* st1, st2(default), st3, st4 */
  themeLayout: string; /* vertical(default) */
  layoutType: string; /* dark, light */
  verticalPlacement: string; /* left(default), right */
  verticalLayout: string; /* wide(default), box */
  deviceType: string; /* desktop(default), tablet, mobile */
  verticalNavType: string; /* expanded(default), offcanvas */
  verticalEffect: string; /* shrink(default), push, overlay */
  vNavigationView: string; /* view1(default) */
  pcodedHeaderPosition: string; /* fixed(default), relative*/
  pcodedSidebarPosition: string; /* fixed(default), absolute*/
  headerTheme: string; /* theme1(default), theme2, theme3, theme4, theme5, theme6 */
  logoTheme: string; /* theme1(default), theme2, theme3, theme4, theme5, theme6 */

  innerHeight: string;
  windowWidth: number;

  toggleOn: boolean;

  headerFixedMargin: string;
  navBarTheme: string; /* theme1, themelight1(default)*/
  activeItemTheme: string; /* theme1, theme2, theme3, theme4(default), ..., theme11, theme12 */

  isCollapsedMobile: string;
  isCollapsedSideBar: string;

  chatToggle: string;
  chatToggleInverse: string;
  chatInnerToggle: string;
  chatInnerToggleInverse: string;

  menuTitleTheme: string; /* theme1, theme2, theme3, theme4, theme5(default), theme6 */
  itemBorder: boolean;
  itemBorderStyle: string; /* none(default), solid, dotted, dashed */
  subItemBorder: boolean;
  subItemIcon: string; /* style1, style2, style3, style4, style5, style6(default) */
  dropDownIcon: string; /* style1(default), style2, style3 */
  configOpenRightBar: string;
  isSidebarChecked: boolean;
  isHeaderChecked: boolean;

  @ViewChild('searchFriends') search_friends: ElementRef;
  public config: any;
  public menuContents = [
    {
      title: 'example',
      subMenu: [
        {
          title: 'buttoms',
          items: [
            {
              title: 'buttons',
              path: '/basic/button',
            },
            {
              title: 'typography',
              path: '/basic/typography',
            }
          ]
        },
      ]
    },
    {
      title: 'Herramienta 2',
      subMenu: [
        {
          title: 'buttoms',
          items: [
            {
              title: 'buttons',
              path: '/basic/button',
            },
            {
              title: 'typography',
              path: '/basic/typography',
            }
          ]
        },
      ]
    }
  ]

  public menuItems: Array<Menu>;
  public username = JSON.parse(sessionStorage.getItem('validate')).username;

  constructor(private service: ServicesService, private router: Router) {
    this.navType = 'st5';
    this.themeLayout = 'vertical';
    this.vNavigationView = 'view1';
    this.verticalPlacement = 'left';
    this.verticalLayout = 'wide';
    this.deviceType = 'desktop';
    this.verticalNavType = 'expanded';
    this.verticalEffect = 'shrink';
    this.pcodedHeaderPosition = 'fixed';
    this.pcodedSidebarPosition = 'fixed';
    this.headerTheme = 'theme1';
    this.logoTheme = 'theme1';

    this.toggleOn = true;

    this.headerFixedMargin = '80px';
    this.navBarTheme = 'themelight1';
    this.activeItemTheme = 'theme4';

    this.isCollapsedMobile = 'no-block';
    this.isCollapsedSideBar = 'no-block';

    this.chatToggle = 'out';
    this.chatToggleInverse = 'in';
    this.chatInnerToggle = 'off';
    this.chatInnerToggleInverse = 'on';

    this.menuTitleTheme = 'theme5';
    this.itemBorder = true;
    this.itemBorderStyle = 'none';
    this.subItemBorder = true;
    this.subItemIcon = 'style6';
    this.dropDownIcon = 'style1';
    this.isSidebarChecked = true;
    this.isHeaderChecked = true;

    const scrollHeight = window.screen.height - 150;
    this.innerHeight = scrollHeight + 'px';
    this.windowWidth = window.innerWidth;
    this.setMenuAttributes(this.windowWidth);
  }

  ngOnInit() {
    this.setBackgroundPattern('pattern2');
    this.getAllMenu();
  }

  onResize(event) {
    this.innerHeight = event.target.innerHeight + 'px';
    /* menu responsive */
    this.windowWidth = event.target.innerWidth;
    let reSizeFlag = true;
    if (this.deviceType === 'tablet' && this.windowWidth >= 768 && this.windowWidth <= 1024) {
      reSizeFlag = false;
    } else if (this.deviceType === 'mobile' && this.windowWidth < 768) {
      reSizeFlag = false;
    }
    /* for check device */
    if (reSizeFlag) {
      this.setMenuAttributes(this.windowWidth);
    }
  }

  setMenuAttributes(windowWidth) {
    // if (windowWidth >= 768 && windowWidth <= 1024) {
    this.deviceType = 'tablet';
    this.verticalNavType = 'offcanvas';
    this.verticalEffect = 'push';
    // }
    // else if (windowWidth < 768) {
    //   this.deviceType = 'mobile';
    //   this.verticalNavType = 'offcanvas';
    //   this.verticalEffect = 'overlay';
    // }
    // else {
    //   this.deviceType = 'desktop';
    //   this.verticalNavType = 'expanded';
    //   this.verticalEffect = 'shrink';
    // }
  }

  toggleOpened() {
    if (this.windowWidth < 1200) {
      this.toggleOn = this.verticalNavType === 'offcanvas' ? true : this.toggleOn;
    }
    this.verticalNavType = this.verticalNavType === 'expanded' ? 'offcanvas' : 'expanded';
  }

  onClickedOutside(e: Event) {
    if (this.windowWidth < 1200 && this.toggleOn && this.verticalNavType !== 'offcanvas') {
      this.toggleOn = true;
      this.verticalNavType = 'offcanvas';
    }
  }

  onMobileMenu() {
    this.isCollapsedMobile = this.isCollapsedMobile === 'yes-block' ? 'no-block' : 'yes-block';
  }

  toggleChat() {
    this.chatToggle = this.chatToggle === 'out' ? 'in' : 'out';
    this.chatToggleInverse = this.chatToggleInverse === 'out' ? 'in' : 'out';
    this.chatInnerToggle = 'off';
    this.chatInnerToggleInverse = 'off';
  }

  toggleChatInner() {
    this.chatInnerToggle = this.chatInnerToggle === 'off' ? 'on' : 'off';
    this.chatInnerToggleInverse = this.chatInnerToggleInverse === 'off' ? 'on' : 'off';
  }

  searchFriendList(e: Event) {
    const search = (this.search_friends.nativeElement.value).toLowerCase();
    let search_input: string;
    let search_parent: any;
    const friendList = document.querySelectorAll('.userlist-box .media-body .chat-header');
    Array.prototype.forEach.call(friendList, function (elements, index) {
      search_input = (elements.innerHTML).toLowerCase();
      search_parent = (elements.parentNode).parentNode;
      if (search_input.indexOf(search) !== -1) {
        search_parent.classList.add('show');
        search_parent.classList.remove('hide');
      } else {
        search_parent.classList.add('hide');
        search_parent.classList.remove('show');
      }
    });
  }

  toggleOpenedSidebar() {
    this.isCollapsedSideBar = this.isCollapsedSideBar === 'yes-block' ? 'no-block' : 'yes-block';
  }

  toggleRightbar() {
    this.configOpenRightBar = this.configOpenRightBar === 'open' ? '' : 'open';
  }

  setSidebarPosition() {
    this.isSidebarChecked = !this.isSidebarChecked;
    this.pcodedSidebarPosition = this.isSidebarChecked === true ? 'fixed' : 'absolute';
  }

  setHeaderPosition() {
    this.isHeaderChecked = !this.isHeaderChecked;
    this.pcodedHeaderPosition = this.isHeaderChecked === true ? 'fixed' : 'relative';
    this.headerFixedMargin = this.isHeaderChecked === true ? '80px' : '';
  }

  setBackgroundPattern(pattern) {
    document.querySelector('body').setAttribute('themebg-pattern', pattern);
  }

  setLayoutType(type: string) {
    this.layoutType = type;
    if (type === 'dark') {
      this.headerTheme = 'theme6';
      this.navBarTheme = 'theme1';
      this.logoTheme = 'theme6';
      document.querySelector('body').classList.add('dark');
    } else {
      this.headerTheme = 'theme1';
      this.navBarTheme = 'themelight1';
      this.logoTheme = 'theme1';
      document.querySelector('body').classList.remove('dark');
    }
  }

  setNavBarTheme(theme: string) {
    if (theme === 'themelight1') {
      this.navBarTheme = 'themelight1';
    } else {
      this.navBarTheme = 'theme1';
    }
  }

  logout() {
    this.service.logout().subscribe(res => {
      let response: any = res;
      let message = response.message;
      sessionStorage.clear();
      this.router.navigate(['/login'])

    }, err => {
      let error: any = err;
      let message = error.error.message;
      console.log(err)
    })
  }


  cambiarClave() {
      this.router.navigate(['/user/changepwd'])

  }


  getAllMenu() {
    return new Promise((resolve, reject) => {


      let codes = JSON.parse(sessionStorage.getItem('validate')).codes;
      //var bytes = CryptoJS.AES.decrypt(codes, 'secret key 123');
      //let original = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      let menuLeft = [];
      let menu = this.service.getMenu(codes).then(res => {
        let repsonse: any = res;
        let firstGroup = {
          state: "",
          short_label: '',
          name: "",
          type: "",
          icon: "",
          children: []
        };
        for (let res of repsonse.result) {
          /* Inicia el recorrido si es menu lateral */
          if (res.target === "left") {
            /* Se recorre todos los elemntos del menu lateral */
            for (let i = 0; i < res.children.length; i++) {
              /* Se valida si es de menu lateral */
              if (res.children[i].target === "left") {
                let children = [];/* Para guardar hijos de un subruta */
                /* inicia verificacion si tiene hijos la ruta */
                if (res.children[i].children.length > 0) {
                  /* Si tiene hijos se inicia el recorrido */
                  for (let j = 0; j < res.children[i].children.length; j++) {
                    /* Se verifica si es menu de tipo lateral */
                    if (res.children[i].children[j].target === 'left') {
                      children.push({
                        state: res.children[i].children[j].accion,
                        name: res.children[i].children[j].nombre,
                        params: res.children[i].children[j].url
                      })
                    }/* fin de menu lateral */
                  }
                  /* fin de recorrid */
                  menuLeft.push({
                    state: res.children[i].accion,
                    short_label: res.children[i].slug,
                    name: res.children[i].nombre,
                    type: res.children[i].tipo,
                    icon: (res.children[i].icono) ? res.children[i].icono : 'ti-user',
                    children: children
                  })
                }/* Fin de validacion si tiene hijos */
                /* En caso de que no tiene hijos se le asigna de tipo link */
                else {
                  menuLeft.push(
                    {
                      state: res.children[i].accion,
                      short_label: res.children[i].slug,
                      name: res.children[i].nombre,
                      type: res.children[i].tipo,
                      icon: (res.children[i].icono) ? res.children[i].icono : 'ti-user',
                      children: children,
                    }
                  )
                }
              }
              // finaliza validacion si es de menu lateral izquierdo
            }
            /* Finaliza recorreido de items del lado izquierdo */
          }
          /* Finaliza recorrido si es menu lateral */
        }
        let exit = {
          children: [],
          icon: "ti-user",
          name: "Salir",
          short_label: "S",
          state: "/",
          type: "link",
        }

        menuLeft.push(exit)
        this.menuItems = [{
          main: menuLeft
        }]
      }).catch(err => {
        console.log(err)
      })

    })
  }




}
