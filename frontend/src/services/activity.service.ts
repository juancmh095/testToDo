import { Injectable } from '@angular/core';
import { ApiService } from 'src/services/api.service';
import { Activity } from 'src/interfaces/activity';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  activity:Activity;

  constructor(private _api:ApiService) { }

  public async addDocument(data: Activity): Promise<any> {
    try {
      let url = `activity/add`;
      let response = await this._api.postHttpRequest(url, data, {});
      return response;
    } catch (error) {
      console.log('error: ', error);
      return 'Error al hacer la peticion';
    }
  }

  public async updateDocument(data: Activity): Promise<any> {
    try {
      let url = `activity/edit`;
      let response = await this._api.putHttpRequest(url, data, {});
      return response;
    } catch (error) {
      console.log('error: ', error);
      return 'Error al hacer la peticion';
    }
  }

  public async getDocuments(filters:any): Promise<any> {
    try {
      let url = `activity/list`;
      let response = await this._api.getHttpRequest(url, filters);
      return response;
    } catch (error) {
      console.log('error: ', error);
      return 'Error al hacer la peticion';
    }
  }

  public async deleteDocuments(id:string): Promise<any> {
    try {
      let url = `activity/delete/`;
      let response = await this._api.deleteHttpRequest(url, id,{});
      return response;
    } catch (error) {
      console.log('error: ', error);
      return 'Error al hacer la peticion';
    }
  }
}
