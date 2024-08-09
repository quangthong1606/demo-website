"use client";
import ScrollUp from "@/components/Common/ScrollUp";
import Hero from "@/components/Hero";

import { useGetDataHomePage } from "@/rest/home";

export default function Home() {
  const {
    data: data,
    isPending: isPendingOrders,
    isError: isErrorOrders,
  } = useGetDataHomePage();

  console.log(data);

  return <>dasds</>;
}
