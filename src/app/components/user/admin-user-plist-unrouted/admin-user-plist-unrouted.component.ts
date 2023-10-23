import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, Optional } from '@angular/core';
import { DynamicDialogConfig} from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { IUser } from 'src/app/model/model.interface';
import { AdminUserDetailUnroutedComponent } from '../admin-user-detail-unrouted/admin-user-detail-unrouted.component';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';


interface PageEvent {
  first: number;
  rows: number;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-admin-user-plist-unrouted',
  templateUrl: './admin-user-plist-unrouted.component.html',
  styleUrls: ['./admin-user-plist-unrouted.component.css'],
  providers: [DialogService, MessageService]
})
export class AdminUserPlistUnroutedComponent implements OnInit {

@Input() id: number = 1;

  datos: any = [];
  oPage: any = [];

  first: number = 0;
  rows: number = 10;
  page: number = 0;

  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  dialogService: any;

  constructor(
    private oHttpClient: HttpClient, @Optional() public ref: DynamicDialogRef, @Optional() public config: DynamicDialogConfig,
    public messageService: MessageService
  ) { 

    if (config) {
      if(config.data) {
        this.id = config.data.id;
      }
    }
  }

  

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

  goToView(u:IUser) {
    console.log(u);
    this.ref = this.dialogService.open(AdminUserDetailUnroutedComponent, {
      data: {
        id: u.id
      },
      header: 'Detalle de usuario',
      width: '70%',
      contentStyle: { "max-height": "500px", "overflow": "auto" }
    });
  }

  goToEdit(u:IUser) {
    console.log(u);
  }

  goToDelete(u:IUser) {
    console.log(u);
  }

}
