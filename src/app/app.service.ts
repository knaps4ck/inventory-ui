import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inventory } from './models/inventory';
import { InventoryObject } from './models/inventoryObject';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpclient: HttpClient) { }
  
  AddInventory(inventory: Inventory){
    return this.httpclient.post('http://localhost:8080/api/create/inventory', inventory);
  }

  GetAllInventory(): Observable<any>{
    return this.httpclient.get<Inventory[]>('http://localhost:8080/api/get/inventory');
  }

  GetInventory(seachText:any){
    return this.httpclient.get<InventoryObject>('http://localhost:8080/api/get/inventory/' + seachText);
  }

  DeleteInventory(itemId: any) {
    return this.httpclient.delete('http://localhost:8080/api/delete/inventory/' + itemId)
  }

  UpdateInventory(itemId: any, item: Inventory){
    return this.httpclient.put('http://localhost:8080/api/update/inventory/' + itemId, item)
  }

}
