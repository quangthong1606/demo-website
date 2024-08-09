"use client";

import homeModule from "@/models/HomeModule";
import { useQuery } from "@tanstack/react-query";

export function useGetDataHomePage() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["homeData"],
    queryFn: ({}) => homeModule.home.getDataHomePage(),
  });

  return { data, isPending, isError };
}
