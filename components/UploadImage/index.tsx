"use-client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import { z } from "zod";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { ImagePlus } from "lucide-react";
import { message } from "antd";
import Image from "next/image";
import { Element } from "@/types/element";
interface ImageProps {
  elementNeedUpdate: Element;
  indexElementUpdate: Number;
  onEmit: (data: ArrayBuffer | string) => void;
}

const UploadImage: React.FC<ImageProps> = ({
  elementNeedUpdate,
  indexElementUpdate,
  onEmit,
}) => {
  const [preview, setPreview] = React.useState<string | ArrayBuffer | null>("");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const elementUpdate = {
    id: elementNeedUpdate.id,
    name: elementNeedUpdate.name,
    content: elementNeedUpdate.content,
    x: elementNeedUpdate.x,
    y: elementNeedUpdate.y,
    height: elementNeedUpdate.height,
    width: elementNeedUpdate.width,
  };

  const index = indexElementUpdate;

  const formSchema = z.object({
    image: z
      //Rest of validations done via react dropzone
      .instanceof(File)
      .refine((file) => file.size !== 0, "Please upload an image"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      image: new File([""], "filename"),
    },
  });

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      const reader = new FileReader();
      try {
        reader.onload = () => setPreview(reader.result);
        reader.readAsDataURL(acceptedFiles[0]);
        form.setValue("image", acceptedFiles[0]);
        form.clearErrors("image");
      } catch (error) {
        setPreview(null);
        form.resetField("image");
      }
    },
    [form],
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      maxSize: 1000000,
      accept: { "image/png": [], "image/jpg": [], "image/jpeg": [] },
    });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // message.success(`Image uploaded successfully 🎉 ${values.image.name}`);

    if (values.image) {
      const blob = new Blob([preview], { type: values.image.type });
      const objectUrl = URL.createObjectURL(blob);
      setSelectedFile(objectUrl);
      //   const reader = new FileReader();
      //   reader.onloadend = () => {
      // onEmit(reader.result as string);
      // setSelectedFile(reader.result as string);
      // const fileName = values.image.name;
      // const blob = new File([reader.result], fileName, {
      //   type: values.image.type,
      // });
      // const imageUrl = URL.createObjectURL(blob);
      // console.log(imageUrl);
      //   };
      //   reader.readAsDataURL(values.image);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="image"
          render={() => (
            <FormItem className="mx-auto md:w-1/2">
              <FormLabel
                className={`${
                  fileRejections.length !== 0 && "text-destructive"
                }`}
              >
                <h2 className="text-xl font-semibold tracking-tight">
                  Upload your image
                  <span
                    className={
                      form.formState.errors.image || fileRejections.length !== 0
                        ? "text-destructive"
                        : "text-muted-foreground"
                    }
                  ></span>
                </h2>
              </FormLabel>
              <FormControl>
                <div
                  {...getRootProps()}
                  className="border-foreground shadow-foreground mx-auto flex cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border p-8 shadow-sm"
                >
                  {preview && (
                    <Image
                      src={preview as string}
                      alt="Uploaded image"
                      className="max-h-[400px] rounded-lg"
                      width={200}
                      height={200}
                    />
                  )}
                  <ImagePlus
                    className={`size-40 ${preview ? "hidden" : "block"}`}
                  />
                  <Input {...getInputProps()} type="file" />
                  {isDragActive ? (
                    <p>Drop the image!</p>
                  ) : (
                    <p>Click here or drag an image to upload it</p>
                  )}
                </div>
              </FormControl>
              <div>{elementUpdate.height}</div>
              <FormMessage>
                {fileRejections.length !== 0 && (
                  <p>
                    Image must be less than 1MB and of type png, jpg, or jpeg
                  </p>
                )}
              </FormMessage>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="mx-auto block h-auto rounded-lg px-8 py-3 text-xl"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default UploadImage;
