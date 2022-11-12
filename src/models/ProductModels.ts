export interface IProduct {
  id: number;
  title: string;
  description: string;
  location: string;
  price: string;
  category: string[];
  image: {
    id: string;
  };
  user_created: {
    first_name: string;
    email: string;
  };
}

export interface IProductResponse {
  product_by_id: IProduct;
}

export interface IProductsResponse {
  product: IProduct[];
}

export interface INewProduct {
  title: string;
  description: string;
  price: string;
  location: string;
  category: string[];
  image: string;
}
