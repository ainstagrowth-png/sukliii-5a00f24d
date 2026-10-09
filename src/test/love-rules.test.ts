import { describe, it, expect } from 'vitest';
import { intersectsHeart, invitationSizes, countdownValues } from '../lib/love-rules';
describe('birthday interaction rules', () => {
  it('enlarges YES with each NO click', () => { expect(invitationSizes(2).yes).toBeGreaterThan(invitationSizes(1).yes); });
  it('shrinks NO but keeps it visible after many clicks', () => { expect(invitationSizes(2).no).toBeLessThan(invitationSizes(1).no); expect(invitationSizes(100).no).toBe(0.38); });
  it('hits only when the real flight segment intersects the target', () => { expect(intersectsHeart({x:0,y:50},{x:100,y:50},{x:80,y:50},12)).toBe(true); expect(intersectsHeart({x:0,y:10},{x:100,y:10},{x:80,y:50},12)).toBe(false); });
  it('counts down in order 3, 2, 1 before blowing', () => { expect([...countdownValues]).toEqual([3,2,1,0]); });
});