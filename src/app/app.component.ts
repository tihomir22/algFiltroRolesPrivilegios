import { Component } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public static PUEDE_EDITAR: accionModel = { id: 1, nombre: "edicion", descripcion: "Full edicion" }
  public static PUEDE_VER: accionModel = { id: 2, nombre: "ver", descripcion: "Solo ver" }
  public static RESTRINGIDO: accionModel = { id: 3, nombre: "restringido", descripcion: "Restringido" }


  private listadoRolesComponente: Array<rolModel> = [
    { id: 1, nombre: "Administrador geinfor", descripcion: "Administracion de geinfor", acciones: "edicion" },
    { id: 34, nombre: "El topo del back", descripcion: "Bajo tierra se trabaja mejor", acciones: "ver" },
    { id: 2, nombre: "Geinfor designer", descripcion: "Diseñador geinfor", acciones: "ver" },
  ]

  private listadoRolesUsuario: Array<rolModel> = [
    { id: 1, nombre: "Administrador geinfor", descripcion: "Administracion de geinfor", acciones: "edicion" },
    { id: 2, nombre: "Geinfor designer", descripcion: "Diseñador geinfor", acciones: "ver" },
  ]

  constructor() {
    //Lo primero a hacer es comprobar que roles tiene el componte y cuales el usuario y sacar los comunes
    let resultado = this.listadoRolesComponente.filter(o => this.listadoRolesUsuario.some(({ id, nombre }) => o.id === id && o.nombre === nombre));
    console.log(resultado)
    //Recibir el privilegio más elevado de los roles comunes
    of(resultado).pipe(map(roles => roles.map(roles => roles.acciones))).subscribe((data: Array<string>) => {
      if (data.includes(AppComponent.PUEDE_EDITAR.nombre)) {
        console.log("TIENE PERMISOS TOTALES PUEDE EDITAR")
      } else if (data.includes(AppComponent.PUEDE_VER.nombre)) {
        console.log("TIENE PERMISOS VER")
      }else{
        console.log("ESTA RESTRINGIDO")
      }
    })
  }
}


export interface rolModel {
  id: number;
  nombre: string;
  descripcion: string;
  acciones: string;
}

export interface accionModel {
  id: number;
  nombre: string;
  descripcion: string;
}