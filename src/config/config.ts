const config: configInt = {
  port: 7000,
  googleAuthCallbackUrl: "http://localhost:7000/auth/google/callback",
  merchant_id: "6cded376-3063-11e9-a98e-005056a205be",
  gateway_callback: "http://localhost:7000/payment/paycallback",
};
interface configInt {
  port: number;
  googleAuthCallbackUrl: string;
  merchant_id: string;
  gateway_callback: string;
}

export default config;
