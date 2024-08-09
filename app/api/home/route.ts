import { cookies } from "next/headers";

const ELEMENTS_ASIGN = "element_asign";

export async function GET() {
  const cookieStore = cookies();
  const elementAsign = cookieStore.get(ELEMENTS_ASIGN);
  return Response.json(JSON.parse(elementAsign.value));
}
