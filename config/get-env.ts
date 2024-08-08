type EnvVariables = {
  readonly NODE_ENV: "development" | "test";
  readonly NEXT_PUBLIC_REST_API_ENDPOINT: string;
  readonly TOKEN_SECRET: string;
};
export function getEnv(
  name: keyof EnvVariables,
): EnvVariables[keyof EnvVariables] {
  const val = process.env[name];
  if (!val) {
    throw new Error(`Cannot find environmental variable: ${name}`);
  }
  return val;
}
