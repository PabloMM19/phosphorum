import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-admin-reply-plist-unrouted',
  templateUrl: './admin-reply-plist-unrouted.component.html',
  styleUrls: ['./admin-reply-plist-unrouted.component.css']
})
export class AdminReplyPlistUnroutedComponent implements OnInit {

  datos: any = [];


  first: number = 0;
  rows: number = 10;
  page: number = 0;

  orderField: string = "id";
  orderDirection: string = "asc";

  constructor(
    private oHttpClient: HttpClient
  ) { }

  ngOnInit() {
    this.getPage();
  }

  getPage(): void {
    this.oHttpClient.get("http://localhost:8083/reply" + "?size=" + this.rows + "&page=" + this.page + "&sort=" + this.orderField + "," + this.orderDirection).subscribe({
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
