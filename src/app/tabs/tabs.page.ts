import { Component } from '@angular/core';
import { PedidoService } from '../pedido.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { DetallesComponent } from '../detalles/detalles.component';
import { PhoneInputComponent } from '../phone-input/phone-input.component';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  public modal;
  public pedidos;
  constructor(public pedidoservice : PedidoService,
    public modalController: ModalController) {}

  ngOnInit() {
    this.pedidoservice.abrirdetalles();
  }
}
