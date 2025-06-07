import * as z from "zod";

export const emailSchema = z
  .string({
    required_error: "Please enter your email address.",
    invalid_type_error: "Email must be text (e.g. example@mail.com).",
  })
  .email("The email you entered is not valid. Please try again.");
export const nameSchema = z
  .string()
  .min(2, "Name must be at least 2 characters.")
  .max(100, "Name cannot exceed 100 characters.");
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .max(100, "Password cannot exceed 100 characters.");
export const signupSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

// Login Schema
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const categorySchema = z.object({
  name: z
    .string()
    .min(2, "Category name must be at least 2 characters.")
    .max(100, "Category name cannot exceed 100 characters."),
});

export const productSchema = z.object({
  name: z
    .string({
      required_error: "Product name is required.",
      invalid_type_error: "Product name must be a text string.",
    })
    .min(2, "Product name must be at least 2 characters.")
    .max(100, "Product name cannot exceed 100 characters."),

  color: z
    .string({
      required_error: "Color is required.",
      invalid_type_error:
        "Color must be a text value (e.g., 'red', '#FF5733').",
    })
    .min(2, "Color name or code must be at least 2 characters.")
    .max(7, "Color code cannot be longer than 7 characters (e.g., #FF5733)."),
  price: z
    .number({
      required_error: "Price is required.",
      invalid_type_error: "Price must be a valid number.",
    })
    .min(0, "Price cannot be negative.")
    .positive("Price must be greater than zero."),
  categoryId: z
    .number({
      required_error: "Category is required.",
      invalid_type_error: "Category must be a valid ID (number).",
    })
    .int({ message: "Category ID must be an integer." })
    .positive({ message: "Please select a valid category." }),

  images: z.nullable(
    z
      .array(z.string().url("Image URL must be a valid image link."), {
        // required_error: "At least one image is required.",
        invalid_type_error: "Images must be a list of URLs.",
      })
      .default([]),
  ),
  // .nonempty({ message: "At least one image URL is required." }),
});
// .refine(
//   async (data) => {
//     const category = await prisma.category.findUnique({
//       where: { id: data.categoryId },
//     });
//     return Boolean(category);
//   },
//   {
//     message: "The selected category does not exist in the database.",
//     path: ["categoryId"],
//   },
// );
