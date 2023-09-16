const config: configInt = {
  port: 7000,
  googleAuthCallbackUrl: "http://localhost:7000/auth/google/callback",
};
interface configInt {
  port: number;
  googleAuthCallbackUrl: string;
}

export default config;
