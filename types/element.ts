export type Element = {
  id: number;
  name: string;
  content: ArrayBuffer | string;
  alert?: string;
  x: number;
  y: number;
  height?: number;
  width?: number;
};
