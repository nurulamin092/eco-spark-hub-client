// "use client";

// import { ReactNode } from "react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Switch } from "@/components/ui/switch";
// import { Category } from "../../shared/types/idea.types";

// interface EditIdeaFormFieldsProps {
//   name: string;
//   label: string;
//   value: unknown;
//   error?: string;
//   onChange: (value: unknown) => void;
//   onBlur: () => void;
//   type?: "text" | "textarea" | "select" | "number" | "switch";
//   placeholder?: string;
//   rows?: number;
//   options?: Category[];
//   disabled?: boolean;
// }

// export function EditIdeaFormFields({
//   name,
//   label,
//   value,
//   error,
//   onChange,
//   onBlur,
//   type = "text",
//   placeholder,
//   rows = 4,
//   options = [],
//   disabled = false,
// }: EditIdeaFormFieldsProps) {
//   const renderField = (): ReactNode => {
//     switch (type) {
//       case "textarea":
//         return (
//           <Textarea
//             id={name}
//             name={name}
//             placeholder={placeholder}
//             value={typeof value === "string" ? value : ""}
//             onBlur={onBlur}
//             onChange={(e) => onChange(e.target.value)}
//             disabled={disabled}
//             rows={rows}
//             className="resize-y"
//           />
//         );

//       case "select":
//         return (
//           <Select
//             value={typeof value === "string" ? value : ""}
//             onValueChange={(val) => onChange(val)}
//             disabled={disabled}
//           >
//             <SelectTrigger>
//               <SelectValue placeholder="Select a category" />
//             </SelectTrigger>
//             <SelectContent>
//               {options.map((option) => (
//                 <SelectItem key={option.id} value={option.id}>
//                   {option.name}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         );

//       case "number":
//         return (
//           <Input
//             id={name}
//             name={name}
//             type="number"
//             step="0.01"
//             min="0"
//             placeholder={placeholder}
//             value={typeof value === "number" ? value : ""}
//             onBlur={onBlur}
//             onChange={(e) =>
//               onChange(e.target.value ? parseFloat(e.target.value) : undefined)
//             }
//             disabled={disabled}
//           />
//         );

//       case "switch":
//         return (
//           <div className="flex items-center justify-between">
//             <span className="text-sm font-medium">{label}</span>
//             <Switch
//               id={name}
//               checked={typeof value === "boolean" ? value : false}
//               onCheckedChange={(checked) => onChange(checked)}
//               disabled={disabled}
//             />
//           </div>
//         );

//       default:
//         return (
//           <Input
//             id={name}
//             name={name}
//             type="text"
//             placeholder={placeholder}
//             value={typeof value === "string" ? value : ""}
//             onBlur={onBlur}
//             onChange={(e) => onChange(e.target.value)}
//             disabled={disabled}
//           />
//         );
//     }
//   };

//   return (
//     <div className="space-y-2">
//       {type !== "switch" && (
//         <Label htmlFor={name} className="text-sm font-medium">
//           {label}
//         </Label>
//       )}
//       {renderField()}
//       {error && <p className="text-sm text-destructive">{error}</p>}
//     </div>
//   );
// }



// ============ src/features/idea/edit/components/EditIdeaFormFields.tsx ============
"use client";

import { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import type { Category } from "../../shared/types/idea.types";

interface EditIdeaFormFieldsProps {
  name: string;
  label: string;
  value: string | number | boolean | undefined;
  error?: string;
  onChange: (value: string | number | boolean | undefined) => void;
  onBlur: () => void;
  type?: "text" | "textarea" | "select" | "number" | "switch";
  placeholder?: string;
  rows?: number;
  options?: Category[];
  disabled?: boolean;
}

export function EditIdeaFormFields({
  name,
  label,
  value,
  error,
  onChange,
  onBlur,
  type = "text",
  placeholder,
  rows = 4,
  options = [],
  disabled = false,
}: EditIdeaFormFieldsProps) {
  const renderField = (): ReactNode => {
    switch (type) {
      case "textarea":
        return (
          <Textarea
            id={name}
            name={name}
            placeholder={placeholder}
            value={typeof value === "string" ? value : ""}
            onBlur={onBlur}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            rows={rows}
            className="resize-y"
          />
        );

      case "select":
        return (
          <Select
            value={typeof value === "string" ? value : ""}
            onValueChange={(val) => onChange(val)}
            disabled={disabled}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "number":
        return (
          <Input
            id={name}
            name={name}
            type="number"
            step="0.01"
            min="0"
            placeholder={placeholder}
            value={typeof value === "number" ? value : ""}
            onBlur={onBlur}
            onChange={(e) =>
              onChange(e.target.value ? parseFloat(e.target.value) : undefined)
            }
            disabled={disabled}
          />
        );

      case "switch":
        return (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{label}</span>
            <Switch
              id={name}
              checked={typeof value === "boolean" ? value : false}
              onCheckedChange={(checked) => onChange(checked)}
              disabled={disabled}
            />
          </div>
        );

      default:
        return (
          <Input
            id={name}
            name={name}
            type="text"
            placeholder={placeholder}
            value={typeof value === "string" ? value : ""}
            onBlur={onBlur}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
          />
        );
    }
  };

  return (
    <div className="space-y-2">
      {type !== "switch" && (
        <Label htmlFor={name} className="text-sm font-medium">
          {label}
        </Label>
      )}
      {renderField()}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
