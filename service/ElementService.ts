const ELEMENTS_ASIGN = "element_asign";
import { Element } from "@/types/element";

import Cookies from "js-cookie";

export const createDefaultElements = () => {
  const elements = [
    {
      id: 1,
      name: "Paragraph",
      content: "Text",
      x: 0,
      y: 0,
    },
    {
      id: 2,
      name: "Button",
      content: "Label",
      alert: "",
      x: 0,
      y: 0,
    },
  ];

  return elements;
};

export const getElementAsign = (): [] => {
  if (typeof window !== "undefined") {
    const item = Cookies.get(ELEMENTS_ASIGN);
    const elementAsign = item ? JSON.parse(item) : [];
    return elementAsign;
  }
  return [];
};

export const updateElementAsign = (data: Element[]) => {
  if (typeof window !== "undefined") {
    const jsonValue = JSON.stringify(data);
    Cookies.set(ELEMENTS_ASIGN, jsonValue, {
      expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    });
  }
};
