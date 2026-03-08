import { OpportunityBrief } from '@/shared/types';

/**
 * Encodes an OpportunityBrief into a URL-safe Base64 string.
 */
export function encodeBrief(brief: OpportunityBrief): string {
  const jsonString = JSON.stringify(brief);
  // Encode as UTF-8 then to Base64
  const base64 = btoa(encodeURIComponent(jsonString).replace(/%([0-9A-F]{2})/g, (_, p1) => {
    return String.fromCharCode(parseInt(p1, 16));
  }));
  return base64;
}

/**
 * Decodes a Base64 string back into an OpportunityBrief.
 * Returns null if decoding or parsing fails.
 */
export function decodeBrief(encoded: string): OpportunityBrief | null {
  try {
    // Decode from Base64 then from UTF-8
    const jsonString = decodeURIComponent(Array.prototype.map.call(atob(encoded), (c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonString) as OpportunityBrief;
  } catch (err) {
    console.error('Failed to decode brief:', err);
    return null;
  }
}
