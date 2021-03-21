import { makeObservable, observable } from "mobx";
import { IPropertyDto } from "./client/propertyAPIClient";

export interface IPropertyBaseViewModel {
  id: string | undefined;
  address: string;
  price: number | undefined;
  lastUpdated: Date | undefined;
}

export class PropertyBaseViewModel implements IPropertyBaseViewModel {
  @observable id: string | undefined;
  @observable address: string = "";
  @observable price: number | undefined;
  @observable lastUpdated: Date | undefined;

  constructor() {
    makeObservable(this);
  }

  loadFromDto({ id, address, price, updatedOn }: IPropertyDto) {
    this.id = id;
    this.address = address;
    this.price = price;
    this.lastUpdated = new Date(updatedOn);
  }
}
