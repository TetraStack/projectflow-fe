import * as React from "react";
import {cn} from "@/lib/utils";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

export function FloatingLabelInput({
  label,
  id,
  type = "text",
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {label: string}) {
  const [isFocused, setIsFocused] = React.useState(false);
  const [hasValue, setHasValue] = React.useState(false);

  return (
    <div className="relative w-full">
      <Input
        id={id}
        type={type}
        className={cn(
          "peer h-12 rounded-md border border-input bg-transparent px-3 pt-4 text-sm placeholder-transparent focus:border-primary focus:ring-0",
          className
        )}
        // placeholder={label}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(!!e.target.value);
        }}
        {...props}
      />
      <Label
        htmlFor={id}
        className={cn(
          "absolute left-3 top-3 text-muted-foreground text-sm transition-all duration-200",
          isFocused || hasValue
            ? "text-primary text-xs -translate-y-2"
            : "text-muted-foreground text-sm translate-y-0"
        )}
      >
        {label}
      </Label>
    </div>
  );
}
