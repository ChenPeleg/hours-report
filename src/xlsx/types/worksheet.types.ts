

export type CellBorder = 'top' | 'bottom' | 'right' | 'left' | 'all' | {
  position: 'top' | 'bottom' | 'right' | 'left' | 'all';
  width?:  "thin" | "medium" | "thick" | "dotted" | "hair" | "double";
  color? : string
}
export interface CellStyle {
    background?: string; 
    font? : {
      size?: number;
      bold?: boolean;
      color? : string;  
    } 
    border?: CellBorder[];
    styleId?: string;
} 
export interface Cell {
    dataType?: "number" | "string" | "empty";
    value: number | string;
    style?: CellStyle;
}
export interface Row {
  cells: Cell[];
  height? : number
}

export interface Sheet {
  rows: Row[];
  name: string;
  columnWidth?: number[] 
}
export interface Workbook {
    name : string;
    sheets : Sheet [];
}
