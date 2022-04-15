import { Component } from '@angular/core';
import { Mascota } from './models/mascota';
import { MascotaService } from './services/mascota.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mascota:Mascota = new Mascota();
  datatable:any = [];

  constructor(private mascotaService:MascotaService){

  }

  ngOnInit(): void {
    this.onDataTable();
  }

  onDataTable(){
    this.mascotaService.getMascota().subscribe(res => {
      this.datatable = res;
      console.log(res);
    });
  }

  onAddMascota(mascota:Mascota):void{
    this.mascotaService.addMascota(mascota).subscribe(res => {
      if(res){
        alert(`La mascota ${mascota.nombre} se ha registrado con exito!`);
        this.clear();
        this.onDataTable();
      } else {
        alert('Error! :(')
      }
    });
  }

  onUpdateMascota(mascota:Mascota):void{
    this.mascotaService.updateMascota(mascota.id, mascota).subscribe(res => {
      if(res){
        alert(`La mascota número ${mascota.id} se ha modificado con exito!`);
        this.clear();
        this.onDataTable();
      } else {
        alert('Error! :(')
      }
    });
  }

  onDeleteMascota(id:number):void{
    this.mascotaService.deleteMascota(id).subscribe(res => {
      if(res){
        alert(`La mascota número ${id} se ha eliminado con exito!`);
        this.clear();
        this.onDataTable();
      } else {
        alert('Error! :(')
      }
    });
  }

  onSetData(select:any){
    this.mascota.id = select.idMascota;
    this.mascota.nombre = select.nombre;
    this.mascota.edad = select.edad;
    this.mascota.descripcion = select.descripcion;
  }

  clear(){
    this.mascota.id =0;
    this.mascota.nombre = "";
    this.mascota.edad = 0;
    this.mascota.descripcion = "";
  }
}
