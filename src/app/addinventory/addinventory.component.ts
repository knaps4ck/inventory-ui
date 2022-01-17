import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Location} from '@angular/common';
import { Inventory } from '../models/inventory';

@Component({
  selector: 'app-addinventory',
  templateUrl: './addinventory.component.html',
  styleUrls: ['./addinventory.component.css']
})
export class AddinventoryComponent implements OnInit {

  addInventoryForm: FormGroup;  

  constructor(
    public dialogRef: MatDialogRef<AddinventoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Inventory,    
    private _loc: Location) { 
      this.addInventoryForm = new FormGroup({             
        name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('^[A-Za-z][0-9a-zA-Z\'.:,  -]{0,}$')]),
        quantity: new FormControl(0, [Validators.required, Validators.min(1), Validators.max(9999)])
      });
  }

  cancel() {
    let closeFlag = confirm('Inventory item will not be added! Continue?');
    if (closeFlag) 
      this.dialogRef.close();
  }

  checkSubmitButtonEnabled() {
    let result = true;
    if (this.addInventoryForm.get('name')?.valid && this.addInventoryForm.get('quantity')?.valid) {
      result = false;
    }    
    return result;
  }

  onSubmit() {
    this.dialogRef.close({data: this.addInventoryForm.value});    
  }

  ngOnInit() {    
    if (this.data) {
      this.addInventoryForm = new FormGroup({ 
        id: new FormControl(this.data._id),    
        name: new FormControl(this.data.name, [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('^[A-Za-z][a-zA-Z\'.:,  -]{0,}$')]),
        quantity: new FormControl(this.data.quantity, [Validators.required, Validators.min(1), Validators.max(9999)])
      });
    }
  }

 


}
