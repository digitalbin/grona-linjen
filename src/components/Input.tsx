import { JSX } from "solid-js";

const styles = {
  label: "group mb-8 flex flex-col",
  span: "shadow-glb-hard bg-glb-green group-focus-within:shadow-glb-green w-max border-2 border-b-0 px-4 py-1 font-bold transition-shadow",
  input:
    "shadow-glb-hard focus:shadow-glb-hard-lg group-focus-within:shadow-glb-green bg-glb-white border-2 px-4 py-2 transition-shadow outline-none",
};

interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, ...props }: InputProps) {
  return (
    <label class={styles.label}>
      <span class={styles.span}>{label}</span>
      <input
        class={styles.input}
        type="text"
        autocomplete={props.name}
        {...props}
      />
    </label>
  );
}

interface TextAreaProps
  extends JSX.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}
export function TextArea({ label, ...props }: TextAreaProps) {
  return (
    <label class="group mb-8 flex flex-col">
      <span class="shadow-glb-hard bg-glb-green group-focus-within:shadow-glb-green w-max border-2 border-b-0 px-4 py-1 font-bold transition-shadow">
        {label}
      </span>
      <textarea rows={5} class={styles.input} {...props} />
    </label>
  );
}
