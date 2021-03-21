import axios from "axios";

export interface IPropertyDto {
  id: string;
  thumbnail: string;
  image: string;
  address: string;
  price: number;
  createdOn: string;
  updatedOn: string;
}

export interface IPropertyApiClient {
  getPropertyById(id: string): Promise<IPropertyDetailResponse>;
  getAllProperties(): Promise<IPropertyListResponse>;
  createProperty(
    property: Omit<IPropertyDto, "id" | "thumbnail" | "image">,
    image: File
  ): Promise<IPropertyCreateResponse>;
}

export class PropertyApiClient {
  async getPropertyById(id: string) {
    try {
      const result = await axios.get(`http://localhost:4000/property/${id}`);

      return result.data;
    } catch (err) {
      throw new Error(err.message);
    }
  }
  async getAllProperties(): Promise<IPropertyListResponse> {
    try {
      const result = await axios.get("http://localhost:4000/property");

      return result.data;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async createProperty(property: IPropertyDto, image: File) {
    try {
      const fd = new FormData();
      fd.append("image", image);
      fd.append("property", JSON.stringify(property));

      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      };

      const result = await axios.post(
        "http://localhost:4000/property",
        fd,
        config
      );

      return result.data;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export interface GenericApiResponse {
  success: boolean;
  totalResults?: number;
  errors: Error[];
}

export interface IPropertyListResponse extends GenericApiResponse {
  properties: IPropertyDto[];
}

export interface IPropertyDetailResponse extends GenericApiResponse {
  property: IPropertyDto;
}

export interface IPropertyCreateResponse extends GenericApiResponse {}
