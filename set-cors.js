const { Storage } = require("@google-cloud/storage");

// Initialize the storage client
const storage = new Storage({
  projectId: "highfield-89515",
});

const bucketName = "highfield-89515.firebasestorage.app";

// CORS configuration
const corsConfiguration = [
  {
    origin: ["http://localhost:3000", "http://localhost:3001"],
    method: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    maxAgeSeconds: 3600,
    responseHeader: ["Content-Type", "Authorization", "x-goog-meta-*"],
  },
];

async function setCorsConfiguration() {
  try {
    const bucket = storage.bucket(bucketName);
    await bucket.setCorsConfiguration(corsConfiguration);
    console.log(`CORS configuration set for bucket: ${bucketName}`);
  } catch (error) {
    console.error("Error setting CORS configuration:", error);
  }
}

setCorsConfiguration();
