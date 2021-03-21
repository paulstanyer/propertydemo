import { action, computed, makeObservable, observable } from "mobx";
import { useState } from "react";
import { IPropertyApiClient } from "../core/client/propertyAPIClient";
import { usePropertyApiClient } from "../core/client/usePropertyApiClient";

export class AddEditPropertyViewModel {
  client: IPropertyApiClient;

  @observable imageFile: File | undefined;
  @observable address: string = "";
  @observable price: string = "";

  constructor(client: IPropertyApiClient) {
    this.client = client;
    makeObservable(this);
  }

  @action.bound
  setPrice(price: string) {
    console.log("Price is called and should be observable....");
    console.log(price);
    this.price = price;
  }

  setFile(file: File) {
    this.imageFile = file;
  }

  @computed get priceValidationError(): string {
    if (!this.price.match(/^\d+$/)) {
      return "Price must be a number, please enter without currency or thousands separators";
    }
    if (parseInt(this.price) < 10_000) {
      return "Price must be higher than £10,000";
    }

    return "";
  }
  @computed get hasErrors() {
    return this.priceValidationError.length > 0;
  }

  @action.bound
  async saveProperty() {
    if (!this.hasErrors) {
      this.client.createProperty(
        {
          address: this.address,
          price: parseInt(this.price),
          createdOn: new Date().toISOString(),
          updatedOn: new Date().toISOString(),
        },
        this.imageFile as File
      );
    }
  }
}

export function usePropertyFormViewModel() {
  const client = usePropertyApiClient();
  const [model] = useState(() => new AddEditPropertyViewModel(client));
  return model;
}
