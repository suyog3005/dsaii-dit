// lib/scrollVelocity.ts
// Plain mutable object shared between CameraRig (writer) and Cylinder (reader).
// No React state — zero re-renders, zero latency.

export const scrollVelocity = {
  value:  0,      // radians to add to rotation this frame
  locked: false,  // true once drag is unlocked — stops scroll-driven rotation
}