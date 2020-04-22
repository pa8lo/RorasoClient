import { Component, OnInit, Input } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss'],
})
export class DetallesComponent implements OnInit {

  @Input() pedido: any;
  public detallePedido: any;
  
  constructor(navParams: NavParams) {
    this.detallePedido = navParams.get('pedido');
    console.log(this.detallePedido)
  }

  ngOnInit() {}

}
