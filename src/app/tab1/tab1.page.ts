import {  Component,  OnInit,  ViewChild,  ElementRef} from '@angular/core';
import { PedidoService } from '../pedido.service';
import { DetallesComponent } from '../detalles/detalles.component';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public pedidos: Array<any> = [];
  constructor(public pedidoservice : PedidoService,public modalController: ModalController) {
  }
  ngOnInit() {
    
    }
  async abrirdetalles(pedido:any){
    const modal = await this.modalController.create({
      component: DetallesComponent,
      componentProps: {
        'pedido': pedido
      }
    });
    return await modal.present();
  }
  formatDate(date:string){
    console.log(date)
    return moment(date).add(3, 'h').format('YYYY-MM-DD HH:mm:ss');
  }
  
  
}
