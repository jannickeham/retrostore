export interface IProduct {
  id: number;
  title: string;
  description: string;
  location: string;
  price: number;
  category: string[];
  image: {
    id: string;
  };
  user_created: {
    first_name: string;
  };
}

export interface IProductResponse {
  product_by_id: IProduct;
}

export interface IProductsResponse {
  product: IProduct[];
}

export interface INewPRoduct {
  title: string;
  description: string;
  price: number;
  location: string;
  category: string[];
  image: string;
}
