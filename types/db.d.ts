import {
  AuthAccount as AuthAccountType,
  Category as CategoryType,
  Image as ImageType,
  Payment as PaymentType,
  ProductReview as ProductReviewType,
  ProductStarPercent as ProductStarPercentType,
  ProductStar as ProductStarType,
  Product as ProductType,
  User as UserType,
} from "@prisma/client";
export type User = UserType & {
  authAccounts?: AuthAccount[];
  reviews?: ProductReview[];
  payments?: Payment[];
};

export type AuthAccount = AuthAccountType & {
  user?: User;
};
export type Category = CategoryType & {
  products?: Product[];
};
export type Product = Omit<ProductType, "price"> & { price: number } & {
  category?: Category;
  productReviews?: ProductReview[];
  starts?: ProductStar[];
  productStars?: ProductStarPercent[];
  payments?: Payment[];
  images?: Image[];
};
export type Payment = PaymentType & {
  user?: User;
  product?: Product;
};
export type ProductStarPercent = ProductStarPercentType & {
  product?: Product;
};
export type ProductStar = ProductStarType & {
  product?: Product;
};
export type ProductReview = ProductReviewType & {
  user?: User;
  product?: Product;
};
export type Image = ImageType & {
  product?: Product;
};
