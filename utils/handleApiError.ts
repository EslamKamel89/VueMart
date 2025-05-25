import { isApiError, isSchemaError } from "~/types/app";

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
  if (isApiError(error)) {
    message = error.statusMessage;
  }
  if (typeof (error as any).message === "string") {
    message = (error as any).message as string;
  }
  showErrorToaster({
    title: "Error",
    description: message,
  });
  pr(error, "Api Error");
}
