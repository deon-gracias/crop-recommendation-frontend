/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.pexels.com", "img2.exportersindia.com", "i0.wp.com"],
  },
  env: {
    api: "http://localhost:5000",
    // api: "https://crop-recommendation-backend-production.up.railway.app",
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
