import { Component } from '@angular/core';
import { DetallesComponent } from '../detalles/detalles.component';
import { PedidoService } from '../pedido.service';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment'

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public pedidos: Array<any> = [];
  constructor(public pedidoservice : PedidoService,public modalController: ModalController) {
    setInterval(() => {
      this.pedidos = this.pedidoservice.pedidos
    }, 2000);
    
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
    return moment(date).add(3, 'h').format('YYYY-MM-DD HH:mm:ss');
  }
}
