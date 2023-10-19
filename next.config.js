/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  },
  reactStrictMode: true,
  images: {
    domains: ["images.pexels.com", "img2.exportersindia.com", "i0.wp.com"],
  },
  env: {
    iot_api_url: "https://agri-iot-sensor-api.onrender.com",
    // api: "http://localhost:5000",
    // api: "https://crop-recommendation-backend.onrender.com",
    api: "https://f7f3-103-177-129-222.ngrok.io",
    thingSpeakApiKey: "XGLNVX6GKROUI3B1",
    fireaseApiKey: "AIzaSyAmzOw7_1wuFfBSd54zzM_78NacCVdKT48",
    fireaseAuthDomain: "agi-iot-beae7.firebaseapp.com",
    fireaseProjectId: "agi-iot-beae7",
    fireaseStorageBucket: "agi-iot-beae7.appspot.com",
    fireaseMessagingSenderId: "990013555154",
    fireaseAppId: "1:990013555154:web:5b0a8ed58d13f3ff43880b",
  },
};

module.exports = nextConfig;
