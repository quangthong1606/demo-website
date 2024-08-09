"use client";

import { useGetDataHomePage } from "@/rest/home";
import {
  getElementAsign,
  updateElementAsign,
  createDefaultElements,
} from "@/service/ElementService";
import { Element } from "@/types/element";
import React, { useRef, useState } from "react";

//tool
import Draggable from "react-draggable";

//conponent
import { Button, Modal, Input, Form } from "antd";
import type { FormProps } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export default function HomeAdmin() {
  const myElementRef = useRef(null);

  // craete array elements
  const elements = createDefaultElements();

  // function
  let elementAsign: Element[] = getElementAsign();
  const [elementsApply, setElementsApply] = useState([]);
  const [elementUpdate, setElementUpdate] = useState<Element>(null);
  const [indexElementUpdate, setIndexElementUpdate] = useState(null);

  setTimeout(() => {
    setElementsApply(elementAsign);
  }, 100);

  const handleClick = (element) => {
    elementAsign.push(element);
    updateElementApply(elementAsign);
  };

  const handleRemove = (index) => {
    elementAsign.splice(index, 1);
    updateElementApply(elementAsign);
  };

  // drag and drop
  const trackPos = (data, index) => {
    elementAsign[index].x = data.x;
    elementAsign[index].y = data.y;
    updateElementApply(elementAsign);
  };

  const updateElementApply = (elementAsign) => {
    setElementsApply(elementAsign);
    updateElementAsign(elementAsign);
  };

  //Handle modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (index) => {
    setIsModalOpen(true);
    setIndexElementUpdate(index);
    setElementUpdate(elementAsign[index]);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //Handle form
  type FieldType = {
    content?: string;
    alert?: string;
  };

  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    elementAsign[indexElementUpdate].content = values.content;
    elementAsign[indexElementUpdate].alert = values.alert;
    updateElementApply(elementAsign);
    setIsModalOpen(false);
    form.resetFields();
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo,
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div className="m-auto h-screen max-w-6xl" ref={myElementRef}>
        <div className="m-10 flex gap-4">
          <div>
            <Button type="dashed" className="text-white">
              Save
            </Button>
          </div>
          <div>
            <Button type="dashed" className="text-white">
              Update
            </Button>
          </div>
        </div>
        <div className="flex gap-10">
          <div className="h-screen w-1/4">
            <div className="flex-col">
              {elements.length > 0 &&
                elements.map((element, index) => (
                  <div key={index}>
                    <button
                      className="mb-3 bg-sky-500 hover:bg-sky-700"
                      onClick={() => handleClick(element)}
                    >
                      <div className="h-32 w-32 border border-sky-500 text-xs">
                        <div className="pt-14 text-center">{element.name}</div>
                      </div>
                    </button>
                  </div>
                ))}
            </div>
          </div>
          <div className="relative border-4 border-solid border-indigo-500">
            <div style={{ width: "1000px", height: "500px" }}></div>
            {elementsApply &&
              elementsApply.length > 0 &&
              elementsApply.map((element, index) => (
                <Draggable
                  onDrag={(e, data) => trackPos(data, index)}
                  bounds="parent"
                  defaultPosition={{ x: element.x, y: element.y }}
                  key={index}
                >
                  <div className="absolute h-20 w-32 cursor-pointer border border-sky-500 bg-white text-xs text-black">
                    <div>
                      <div className="flex justify-between">
                        <div className="w-6">
                          <button
                            className="h-2 w-2 text-red-500"
                            onClick={() => handleRemove(index)}
                          >
                            <span className="text-lg">
                              <DeleteOutlined />
                            </span>
                          </button>
                        </div>
                        <div className="w-6">
                          <button
                            className="h-2 w-2 text-blue-500"
                            onClick={() => showModal(index)}
                          >
                            <span className="text-lg">
                              <EditOutlined />
                            </span>
                          </button>
                        </div>
                      </div>
                      <div className="pt-3">
                        {element.name === "Paragraph" && (
                          <p className="px-2">{element.content}</p>
                        )}
                        {element.name === "Button" && (
                          <div className="text-center">
                            <Button>{element.content}</Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Draggable>
              ))}
          </div>
          <Modal
            className="text-black"
            title="Update Information"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
          >
            <Form
              form={form}
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item<FieldType>
                label="Content"
                name="content"
                rules={[{ required: true, message: "Please input your text!" }]}
              >
                <Input />
              </Form.Item>

              {elementUpdate && elementUpdate.name === "Button" && (
                <Form.Item<FieldType>
                  label="Alert"
                  name="alert"
                  rules={[
                    { required: true, message: "Please input your alert!" },
                  ]}
                >
                  <Input />
                </Form.Item>
              )}

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="default" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    </>
  );
}
