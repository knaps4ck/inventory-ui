export class Inventory {
    public _id: any;
    public name: string;
    public quantity: number 
  
    constructor(
      _id: string,
      name: string,
      quantity: number     
    ) {
      this._id = _id;
      this.name = name;      
      this.quantity= quantity 
    }
  }
  