import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ModalController, NavController, LoadingController, ToastController } from '@ionic/angular';
import { PhoneInputComponent } from './phone-input/phone-input.component';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  public modalInput;
  public pedidos;
  public recibidos = 0
  public entregados = 0
  public rechazados = 0
  constructor(private http: HttpClient,public pedidoservice : PedidoService,
    public modalController: ModalController,public navCtrl: NavController,
    public loadingController: LoadingController,public toastController: ToastController) { }

  getPedidos(phone:number): Observable<any>{
    return this.http.get<any>("https://rorasobackend.herokuapp.com/Pedido/Cliente?Phone="+phone)
      .pipe();
  }
  async setPedidos(phone:number) {
    const loading = await this.loadingController.create({
      message: 'Cargando Pedidos...',
    });
    await loading.present();
    let exec = this.http.get<any>("https://rorasobackend.herokuapp.com/Pedido/Cliente?Phone="+phone)
    .subscribe(
      
      data => {
        this.pedidos = data,
        this.setBadge(data)
        ,loading.dismiss()
        ,this.modalController.dismiss()
      },
      (error)=>  {
      if(error.status == 404){
        loading.dismiss()
        this.errorToast("Teléfono invalido. Volver a Ingresarlo")
        return
      }else{
        loading.dismiss()
        this.errorToast("Error de conexión. Reintentar luego")
        return
      }
    })
    
  }
  async reloadPedidos(phone:number) {
    const loading = await this.loadingController.create({
      message: 'Cargando Pedidos...',
    });
    await loading.present();
    let exec = this.http.get<any>("https://rorasobackend.herokuapp.com/Pedido/Cliente?Phone="+phone)
    .subscribe(
      
      data => {
        this.pedidos = data,
        this.setBadge(data)
        ,loading.dismiss()
      },
      (error)=>  {
      if(error.status == 404){
        loading.dismiss()
        this.errorToast("Teléfono invalido. Volver a Ingresarlo")
        return
      }else{
        loading.dismiss()
        this.errorToast("Error de conexión. Reintentar luego")
        return
      }
    })
    
  }
  async abrirdetalles(){
    this.modalInput = await this.modalController.create({
      component: PhoneInputComponent,
      backdropDismiss:false
    });
    return await this.modalInput.present();
  }
  setBadge(data : any){
    let recibidos = data.pedidos.filter(pedido =>  pedido.State.Description !='Rechazado' && pedido.State.Description !='Entregado')
    this.recibidos = recibidos.length
    let entregados = data.pedidos.filter(pedido =>  pedido.State.Description =='Entregado')
    this.entregados = entregados.length
    let rechazados = data.pedidos.filter(pedido => pedido.State.Description =='Rechazado' )
    this.rechazados = rechazados.length
  }
  async errorToast(message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}
