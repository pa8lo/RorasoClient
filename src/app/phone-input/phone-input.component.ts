import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { PedidoService } from '../pedido.service';

@Component({
  selector: 'app-phone-input',
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.scss'],
})
export class PhoneInputComponent implements OnInit {
  public phone ;

  constructor(
    public loadingController: LoadingController,
    public modalController : ModalController,
    public pedidoservice : PedidoService,) { }

  ngOnInit() {}

  onSubmit(){
    this.pedidoservice.setPedidos(this.phone)
  }

}
