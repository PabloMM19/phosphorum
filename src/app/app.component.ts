import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";

interface IIndividuo { nombre: string; edad: number; sexo: string };

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title: string = 'phosphorum';
  datos: any="";
  // obtain the id of a user from the input of html and save it in the variable id
  id: number = 0;

  constructor(
    private http: HttpClient
  ) { }

  // function to filter by id like the function cargar() with the name filtrarID(). the id is a number and is a variable number
  filtrarID(id: number): void {
    console.log("Filtrando AJAX...");

    this.http.get("http://localhost:8083/user/" + id).subscribe(
      (data: any) => {
        console.log(data);
        this.datos = data;
      }
    )
  }

}
