import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Activity } from 'src/interfaces/activity';
import { ActivityService } from 'src/services/activity.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  model:Activity;

  @Input() activity: Activity;

  constructor(public modalController: ModalController, public _activityService: ActivityService) { }

  ngOnInit() {
    this.init();
  }

  init(){
    this.model = {
      _id: this.activity._id?this.activity._id:null,
      title: this.activity.title?this.activity.title:'',
      create_at: this.activity.create_at?this.activity.create_at:new Date(),
      finish: this.activity.finish?this.activity.finish:new Date(),
      note: this.activity.note?this.activity.note:'',
      status: this.activity.status?this.activity.status:false,
      last_update: this.activity.last_update?this.activity.last_update:new Date(),
    };
  }

  
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  save(){
    console.log(this.model);
    if(this.model._id == null){
      this._activityService.addDocument(this.model).then((response:any) => {
        this.modalController.dismiss({
          'dismissed': response.error,
          'msg': response.msg
        });
      });
    }else{
      this._activityService.updateDocument(this.model).then((response:any) => {
        this.modalController.dismiss({
          'dismissed': response.error,
          'msg': response.msg
        });
      });
    }
  }

}
