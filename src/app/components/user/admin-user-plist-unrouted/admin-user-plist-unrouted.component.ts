import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';


interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-admin-user-plist-unrouted',
  templateUrl: './admin-user-plist-unrouted.component.html',
  styleUrls: ['./admin-user-plist-unrouted.component.css']
})
export class AdminUserPlistUnroutedComponent implements OnInit {

  datos: any = [];
  oPage: any = [];

  first: number = 0;
  rows: number = 10;
  page: number = 0;

  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };

  constructor(
    private oHttpClient: HttpClient
  ) { }

  ngOnInit() {
    this.getPage();
  }

  getPage(): void {
    this.oHttpClient.get("http://localhost:8083/user" + "?size=" + this.rows + "&page=" + this.page + "&sort=" + this.orderField + "," + this.orderDirection).subscribe({
      next: (data: any) => {
        this.datos = data;
      },
      error: (error: any) => {
        this.datos = null;
        console.log(error);
      }

    })
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.page = event.page;
    this.getPage();
  }

  doOrder(fieldOrder: string) {
    this.orderField = fieldOrder;
    if (this.orderDirection == "asc") {
      this.orderDirection = "desc";
    } else {
      this.orderDirection = "asc";
    }
    this.getPage();
  }



}
