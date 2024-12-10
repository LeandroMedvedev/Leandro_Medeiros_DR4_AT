interface IData {
  [key: string]: any;
}

type ValidationFunction = (data: IData) => string[];

interface IValidateFields {
  (data: IData, actionType?: string): string[];
}

export type { IValidateFields, ValidationFunction };
