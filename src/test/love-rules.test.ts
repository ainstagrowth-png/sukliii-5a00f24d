import { describe, it, expect } from 'vitest';
import { intersectsHeart, invitationSizes, countdownValues, DEFAULT_MUSIC_VOLUME, clampMusicVolume } from '../lib/love-rules';
describe('birthday interaction rules', () => {
  it('enlarges YES with each NO click', () => { expect(invitationSizes(2).yes).toBeGreaterThan(invitationSizes(1).yes); });
  it('shrinks NO but keeps it visible after many clicks', () => { expect(invitationSizes(2).no).toBeLessThan(invitationSizes(1).no); expect(invitationSizes(100).no).toBe(0.38); });
  it('hits only when the real flight segment intersects the target', () => { expect(intersectsHeart({x:0,y:50},{x:100,y:50},{x:80,y:50},12)).toBe(true); expect(intersectsHeart({x:0,y:10},{x:100,y:10},{x:80,y:50},12)).toBe(false); });
  it('counts down in order 3, 2, 1 before blowing', () => { expect([...countdownValues]).toEqual([3,2,1,0]); });
  it('starts music at 80% and clamps the control to the supported range', () => { expect(DEFAULT_MUSIC_VOLUME).toBe(0.8); expect(clampMusicVolume(1.2)).toBe(1); expect(clampMusicVolume(-0.2)).toBe(0); });
});