"use client";
import ScrollUp from "@/components/Common/ScrollUp";
import Hero from "@/components/Hero";

import { useGetDataHomePage } from "@/rest/home";

//conponent
import { Button, Flex } from "antd";

export default function Home() {
  const {
    data: data,
    isPending: isPendingOrders,
    isError: isErrorOrders,
  } = useGetDataHomePage();

  console.log(data);

  // craete array elements
  const elements = [
    {
      id: 1,
      name: "ElementParagraph",
      text: "",
    },
    {
      id: 2,
      name: "ElementButton",
      text: "",
      warning: "",
    },
  ];

  return (
    <>
      <ScrollUp />
      <div className="m-auto h-screen max-w-6xl">
        <div className="m-10 flex">
          <div>
            <Button type="dashed" className="text-white">
              Save
            </Button>
          </div>
        </div>
        <div className="flex  gap-10">
          <div className="h-screen w-1/4 border-r-4 border-indigo-500">
            <div className="flex-col">
              {elements.length > 0 &&
                elements.map((element) => (
                  <div
                    className="mb-3 h-32 w-32 border border-sky-500 text-xs"
                    key={element.id}
                  >
                    <div className="pt-14 text-center">{element.name}</div>
                  </div>
                ))}
            </div>
          </div>
          <div className="w-3/4">dsadsa</div>
        </div>
      </div>
    </>
  );
}
