import { toast } from "vue-sonner";
type SuccessToasterProps = { title: string; description: string };
export const showSuccessToaster = ({
  title,
  description,
}: SuccessToasterProps) => {
  toast(title, {
    description: description,
    position: "bottom-right",
    richColors: true,
    class: "bg-primary p-2 rounded shadow text-black text-sm",
    // action: {
    //   label: "Undo",
    //   onClick: () => console.log("Undo"),
    // },
  });
};
export const showErrorToaster = ({
  title,
  description,
}: SuccessToasterProps) => {
  toast(title, {
    description: description,
    position: "bottom-right",
    richColors: true,
    class: "bg-red-500 p-2 rounded shadow text-white text-sm",
    // action: {
    //   label: "Undo",
    //   onClick: () => console.log("Undo"),
    // },
  });
};

export const showGenericErrorMessage = () => {
  showErrorToaster({
    title: "Error",
    description: "Something went wrong, please try againg later",
  });
};
