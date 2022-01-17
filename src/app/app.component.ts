import { Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddinventoryComponent } from './addinventory/addinventory.component';
import { AppService } from './app.service';
import { Inventory } from './models/inventory';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shopify-ui';
  search: String = '';
  inventory:Inventory[] = [];
  inventoryObject: any = {}  
  dataSource: any;
  displayedColumns = ['SNo.', 'name', 'quantity', 'operations']
  @ViewChild(MatPaginator, { static: true }) paginator: any;
  hiddenColumns = [0,3];

  constructor(
    private appService: AppService,
    public dialog: MatDialog    
  ) {}

  ngOnInit(){    
    this.dataSource = []
    this.appService.GetAllInventory()
      .subscribe(result => {this.dataSource = new MatTableDataSource<Inventory>(result.inventory); this.dataSource.paginator = this.paginator;})
  }

  public display(search:any){
    this.appService.GetInventory(search)
      .subscribe(result => {this.dataSource = new MatTableDataSource<Inventory>(result.inventory); this.dataSource.paginator = this.paginator;})
  }

  public edit(item: Inventory){
    const dialogRef = this.dialog.open(AddinventoryComponent, {
      width: '50%',      
      disableClose: true,
      data: { name: item.name, quantity: item.quantity, _id: item._id }
    });
    dialogRef.afterClosed().subscribe((itemInfo) => {
      if (itemInfo != undefined)        
        this.appService.UpdateInventory(itemInfo.data.id, itemInfo.data).subscribe((result) => {alert((JSON.stringify(result).split(':')[1]).split('}')[0]); this.ngOnInit();})
    });
  }

  public delete(item: Inventory){
    this.appService.DeleteInventory(item._id).subscribe((result) => {alert((JSON.stringify(result).split(':')[1]).split('}')[0]); this.ngOnInit();})
  }

  public addInventory() {
    const dialogRef = this.dialog.open(AddinventoryComponent, {
      width: '50%',
      height: '50%',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe((itemInfo) => {
      if (itemInfo != undefined)      
        this.appService.AddInventory(itemInfo.data).subscribe((result) => {alert((JSON.stringify(result).split(':')[1]).split('}')[0]); this.ngOnInit();})
    });
  }
}  
