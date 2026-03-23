// public/sw.js
// Service Worker — cache Appwrite videos on first fetch, serve from cache on repeat visits

const PROJECT_ID = "69bb0914000f7b4c9b38"
const BUCKET_ID  = "69bb097b00104898ce23"
const ENDPOINT   = "https://sgp.cloud.appwrite.io/v1"
const CACHE_NAME = "mc-videos-v1"

const fileUrl = (fileId) =>
  `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${fileId}/view?project=${PROJECT_ID}`

const VIDEO_URLS = [
  fileUrl("69bb0bcf0030c7b7e9a0"),
  fileUrl("69bb121c002ddb878750"),
  fileUrl("69bb131c0025adf8267f"),
  fileUrl("69bb139300188bf3025a"),
  fileUrl("PASTE_5TH_FILE_ID_HERE"), // replace once you upload the 5th video
]

// ── Install: pre-cache all videos ────────────────────────────────────────────
self.addEventListener("install", (event) => {
  console.log("[SW] install — caching videos")
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      await Promise.all(
        VIDEO_URLS.map(async (url) => {
          try {
            const res = await fetch(url, { mode: "cors" })
            if (!res.ok) throw new Error(`HTTP ${res.status}`)
            await cache.put(url, res)
            console.log("[SW] cached:", url)
          } catch (err) {
            console.warn("[SW] cache failed for:", url, err)
          }
        })
      )
      self.skipWaiting()
    })
  )
})

// ── Activate: delete old caches ───────────────────────────────────────────────
self.addEventListener("activate", (event) => {
  console.log("[SW] activate")
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => {
            console.log("[SW] deleting old cache:", key)
            return caches.delete(key)
          })
      )
    ).then(() => self.clients.claim())
  )
})

// ── Fetch: serve videos from cache ────────────────────────────────────────────
self.addEventListener("fetch", (event) => {
  const isVideo = VIDEO_URLS.some((url) => event.request.url === url)
  if (!isVideo) return

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(event.request)
      if (cached) {
        console.log("[SW] serving from cache:", event.request.url)
        return cached
      }
      console.log("[SW] cache miss, fetching:", event.request.url)
      const res = await fetch(event.request, { mode: "cors" })
      if (res.ok) cache.put(event.request, res.clone())
      return res
    })
  )
})