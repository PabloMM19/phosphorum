import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-unrouted',
  templateUrl: './menu-unrouted.component.html',
  styleUrls: ['./menu-unrouted.component.css']
})
export class MenuUnroutedComponent implements OnInit {
  items: any[];

  constructor() {
    this.items = [
      {label: 'Gestión de Usuarios&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'},
      {
        label: 'Inicio',
        routerLink: '/home'
      },
      {
        label: 'Usuarios',
        items: [
          { label: 'Lista de usuarios', routerLink: '/admin/user/plist' },
        ]
      },
      {
        label: 'Hilos',
        items: [{ label: 'Lista de hilos', routerLink: '/admin/thread/plist' }]
      },
      {
        label: 'Respuestas',
        items: [{ label: 'Lista de respuestas', routerLink: '/admin/reply/plist' }]
      }
    ];
  }

  ngOnInit() {
  }

}
