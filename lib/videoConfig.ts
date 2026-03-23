// lib/videoConfig.ts

const PROJECT_ID = "69bb0914000f7b4c9b38"
const BUCKET_ID  = "69bb097b00104898ce23"
const ENDPOINT   = "https://sgp.cloud.appwrite.io/v1"

const fileUrl = (fileId: string) =>
  `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${fileId}/view?project=${PROJECT_ID}`

export const VIDEO_SOURCES = [
   fileUrl("69bbe9d90025ca2eeb43"),
  fileUrl("69bbe9eb002dddc9dbbf"),
  fileUrl("69bbe9fc002266b50c32"),
  fileUrl("69bbea0b001fcda9997e"),
  fileUrl("69bbb3a80007bcd4260b")  // v5 when ready 
]

/** Placeholder images shown on the cylinder while each video loads */
export const VIDEO_FALLBACKS: Record<number, string> = {
  0: "/images/v1-img.jpg",
  1: "/images/v2-img.jpeg",
  2: "/images/v3-img.webp",
  3: "/images/v4-img.webp",
  4: "/images/v5-img.webp",
}

export const CACHE_NAME = "mc-videos-v1"