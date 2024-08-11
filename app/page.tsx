"use client";
import { useGetDataHomePage } from "@/rest/home";

//components
import { Button, message, Popconfirm } from "antd";

//tool
import Draggable from "react-draggable";

export default function Home() {
  const {
    data: data,
    isPending: isPendingOrders,
    isError: isErrorOrders,
  } = useGetDataHomePage();

  const alert = (alert) => {
    message.success(alert);
  };

  return (
    <>
      <div className="relative m-auto h-screen max-w-6xl border-4 border-solid border-indigo-500 bg-white">
        <div style={{ width: "1000px", height: "500px" }}></div>
        {data &&
          data.length > 0 &&
          data.map((element, index) => (
            <Draggable
              bounds="parent"
              defaultPosition={{ x: element.x, y: element.y }}
              key={index}
              disabled={true}
            >
              <div className="absolute h-20 w-32 cursor-pointer  bg-white text-xs text-black">
                <div>
                  <div className="pt-3">
                    {element.name === "Paragraph" && (
                      <div
                        dangerouslySetInnerHTML={{ __html: element.content }}
                      />
                    )}
                    {element.name === "Button" && (
                      <div className="text-center">
                        <Button danger onClick={() => alert(element.alert)}>
                          {element.content}
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Draggable>
          ))}
      </div>
    </>
  );
}
