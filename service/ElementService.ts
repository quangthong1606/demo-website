const ELEMENTS_ASIGN = "element_asign";
const ELEMENTS_ASIGN_UNDO = "element_asign_undo";
const ELEMENTS_ASIGN_REDO = "element_asign_redo";
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
    // {
    //   id: 3,
    //   name: "Upload Image",
    //   content: "",
    //   x: 0,
    //   y: 0,
    //   height: 250,
    //   width: 250,
    // },
    // {
    //   id: 4,
    //   name: "Text Editor",
    //   content: "",
    //   x: 0,
    //   y: 0,
    // },
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

export const getElementAsignUndo = (): [] => {
  if (typeof window !== "undefined") {
    const item = Cookies.get(ELEMENTS_ASIGN_UNDO);
    const elementAsign = item ? JSON.parse(item) : [];
    return elementAsign;
  }
  return [];
};

export const updateElementAsignUndo = (data: Element[]) => {
  if (typeof window !== "undefined") {
    const jsonValue = JSON.stringify(data);
    Cookies.set(ELEMENTS_ASIGN_UNDO, jsonValue, {
      expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    });
  }
};

export const getElementAsignRedo = (): [] => {
  if (typeof window !== "undefined") {
    const item = Cookies.get(ELEMENTS_ASIGN_REDO);
    const elementAsign = item ? JSON.parse(item) : [];
    return elementAsign;
  }
  return [];
};

export const updateElementAsignRedo = (data: Element[]) => {
  if (typeof window !== "undefined") {
    const jsonValue = JSON.stringify(data);
    Cookies.set(ELEMENTS_ASIGN_REDO, jsonValue, {
      expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    });
  }
};

export const updateElementAsign = (data: Element[]) => {
  if (typeof window !== "undefined") {
    const jsonValue = JSON.stringify(data);
    Cookies.set(ELEMENTS_ASIGN, jsonValue, {
      expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
    });
  }
};
