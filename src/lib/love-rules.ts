export type Point = { x: number; y: number };
export function intersectsHeart(a: Point, b: Point, center: Point, radius: number) {
  const dx = b.x - a.x, dy = b.y - a.y;
  const length = dx * dx + dy * dy;
  const t = length === 0 ? 0 : Math.max(0, Math.min(1, ((center.x - a.x) * dx + (center.y - a.y) * dy) / length));
  return Math.hypot(a.x + t * dx - center.x, a.y + t * dy - center.y) <= radius;
}
export function invitationSizes(clicks: number) {
  return { yes: 1 + Math.min(clicks, 12) * 0.045, no: Math.max(0.38, 1 - clicks * 0.09) };
}
export const countdownValues = [3, 2, 1, 0] as const;
export const letterParagraphs = [
  'My dear habibi,',
  'May Allah bless you this day and everyday with happiness... this is a small virtual gift from your lovely wife to make you feel happy... hope you feel happy seeing this...',
  'I love u more than anything in this world alhamdulillah 😇... thanks for coming into my life...',
  'Happy birthday my love 💕',
];