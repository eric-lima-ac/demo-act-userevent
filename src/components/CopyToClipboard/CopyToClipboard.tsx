import { ComponentPropsWithoutRef, MouseEvent, useState } from "react";

export type CopyToClipboardProps = Omit<
  ComponentPropsWithoutRef<"input">,
  "value"
> & {
  value: string | number | readonly string[];
};

export async function copyTextToClipboard(
  text: string | number | readonly string[]
) {
  return navigator.clipboard.writeText(String(text));
}

export const CopyToClipboard = ({
  onClick,
  value,
  ...props
}: CopyToClipboardProps) => {
  const [copied, setCopied] = useState(false);

  const handleOnInputClick = (e: MouseEvent<HTMLInputElement>) => {
    e.currentTarget.select();
    onClick?.(e);
  };

  const handleOnButtonClick = async () => {
    setCopied(true);
    try {
      await copyTextToClipboard(value);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setCopied(false);
      }, 1500);
    }
  };

  return (
    <div className="flex h-9 items-stretch">
      <input
        className="w-md rounded-l-md border border-gray-400 bg-gray-50 px-3"
        onClick={handleOnInputClick}
        readOnly
        type="text"
        value={value}
        {...props}
      />
      <button
        className="inline-flex items-center gap-1 rounded-r-md border border-l-0 border-gray-400 bg-gray-200 p-2"
        onClick={handleOnButtonClick}
      >
        {copied ? <span>Copiado</span> : <span>Copiar</span>}
      </button>
    </div>
  );
};
