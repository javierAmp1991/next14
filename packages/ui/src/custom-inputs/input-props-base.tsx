import { ChangeEvent, useRef, useState, useId } from "react";

export interface InputPropsBase {
  TitleInput?: string;
  Name: string;
  IsObligatory?: boolean;
  IsDisable?: boolean;
  Value: string;
  Placeholder?: string;
  Style?: string;
  StyleInput?: EnumStyleCustomInput;
  Prefix?: string;
  IsEmptyValueInvalid?: boolean;
  OnChange: (e: InputTextChangeEvent) => void;
  OnLoadFocus?: boolean;
  ErrorMessage?: string;
}

export interface InputTextChangeEvent {
  Event: ChangeEvent<HTMLInputElement>;
  Error: EnumCustomInputErrors | undefined;
}

export enum EnumCustomInputErrors {
  EmptyValue, OutOfRange
}

export enum EnumStyleCustomInput {
  Default,
  Line,
}
