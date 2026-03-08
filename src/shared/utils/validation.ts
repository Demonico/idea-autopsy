import { z } from 'zod';

/**
 * Zod schema to validate a startup idea string.
 * Ensures it contains enough meaningful content and is not a "stupid" or low-quality entry.
 */
export const IdeaSchema = z.string()
        .trim()
        .min(20, 'Idea is too short (min 20 characters)')
        .max(1000, 'Idea is too long (max 1000 characters)')
        // Check for word count (minimum 3 words)
        .refine(
                (val) => val.split(/\s+/).filter(w => w.length > 0).length >= 3,
                'Please provide more than just a few words'
        )
        // Check for repetitive characters (e.g., "aaaaaaaaaaa")
        .refine(
                (val) => !/(.)\1{9,}/.test(val),
                'Entry seems too repetitive'
        )
        // Check for character diversity (prevents strings like "asdfasdfasdf")
        .refine(
                (val) => new Set(val.toLowerCase().replace(/[^a-z]/g, '')).size >= 4,
                'Entry lacks enough meaningful language'
        )
        // Check for common nonsense keyboard patterns
        .refine(
                (val) => {
                  const simplified = val.replace(/\s/g, '');
                  const gibberishPatterns = [ /^[asdfghjkl]+$/i, /^[qwertyuiop]+$/i, /^[zxcvbnm]+$/i ];
                  return !gibberishPatterns.some(p => p.test(simplified));
                },
                'Entry seems to be random keyboard characters'
        );

/**
 * Validates a startup idea using the Zod schema.
 */
export function validateIdea(idea: string): { isValid: boolean; error?: string } {
  const result = IdeaSchema.safeParse(idea);

  if (!result.success) {
    return {
      isValid: false,
      error: result.error.issues[0].message
    };
  }

  return {
    isValid: true
  };
}
