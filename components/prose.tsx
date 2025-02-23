import clsx from "clsx";
import { FunctionComponent } from "react";

interface TextProps {
  html: string;
  className?: string;
}

const Prose: FunctionComponent<TextProps> = ({ html, className }) => {
  return (
    <div
      className={clsx(
        "text-muted-foreground text-base leading-loose",
        className
      )}
      dangerouslySetInnerHTML={{ __html: html as string }}
    />
  );
};

export default Prose;
