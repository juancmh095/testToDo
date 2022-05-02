import { Component } from '@angular/core';

import { MenuController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

import { AddPage } from '../modals/add/add.page';
import { DetailsPage } from '../modals/details/details.page';
import { Activity } from 'src/interfaces/activity';

import { ActivityService } from 'src/services/activity.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  model:Activity;
  activities:Activity[];

  constructor(
    private menu: MenuController,
    public modalController: ModalController,
    public toastController: ToastController,
    public _activityService: ActivityService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.init();
    this.getData();
  }

  openFirst() {
    console.log('Abrir menu');
    this.menu.open('first');
  }

  init(){
    this.model = {
      _id: '',
      title: '',
      create_at: new Date(),
      finish: new Date(),
      note: '',
      status: false,
      last_update: new Date(),
    };
  }

  getData(){
    this._activityService.getDocuments({}).then((response:any) => {
      this.activities = response.data;
    });
  };

  async showModalAdd(){
    const modal = await this.modalController.create({
      component: AddPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'activity': this.model
      }
    });
    
    await modal.present();
    const { data } = await modal.onWillDismiss();
    console.log(data);
    if(data.dismissed){
      console.log('aqui traigo la data');
      this.presentToast(data.msg, 'danger');
    }else{
      this.presentToast(data.msg, 'success');
      this.getData();
    }

  }

  async showModalInfo(item:Activity){
    const modal = await this.modalController.create({
      component: DetailsPage,
      cssClass: 'my-custom-class',
      componentProps: item
    });
    
    await modal.present();
    const { data } = await modal.onWillDismiss();
    console.log(data);
    if(data.dismissed){
      console.log('aqui traigo la data');
    }
  }

  deleteItem(id:string){
    console.log('eleminar datos');
    this._activityService.deleteDocuments(id).then((response) => {
      if(response.error){
        this.presentToast(response.msg,'danger');
      }else{
        this.getData();
      }
    });
  }

  checkItem(item:Activity){
    item.status = !item.status;
    item.last_update = new Date();

    this._activityService.updateDocument(item).then((response) => {
      if(response.error){
        this.presentToast(response.msg,'danger');
      }else{
        this.getData();
        if(item.status){
          this.presentToast('Actividad Completada','success');
        }else{
          this.presentToast('Actividad Abierta','success');
        }
      }
    });
  }

  async presentToast(title:string, color:string) {
    const toast = await this.toastController.create({
      message: title,
      duration: 2000,
      color: color
    });
    toast.present();
  } 

}
