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
  Product?: Product[];
};
export type Product = ProductType & {
  category?: Category;
  productReviews?: ProductReview[];
  starts?: ProductStar[];
  productStars?: ProductStarPercent[];
  payment?: Payment[];
  images?: Image[];
};
export type Payment = PaymentType & {
  user?: User;
  Product?: Product;
};
export type ProductStarPercent = ProductStarPercentType & {
  Product?: Product;
};
export type ProductStar = ProductStarType & {
  Product?: Product;
};
export type ProductReview = ProductReviewType & {
  user?: User;
  Product?: Product;
};
export type Image = ImageType & {
  Product?: Product;
};
