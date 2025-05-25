import { isSchemaError } from "~/types/app";

export default function (error: unknown) {
  let message = `${error}`;
  if (isSchemaError(error)) {
    message = error
      .reduce(
        (prev, current) =>
          `${prev}${prev == "" ? "" : "-"}${current.path}:${current.errors[0]}`,
        "",
      )
      .trim();
  }
  showErrorToaster({
    title: "Validation Error",
    description: message,
  });
  pr(error, "Api Error");
}
