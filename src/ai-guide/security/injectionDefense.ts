/**
 * Prompt Injection & Untrusted Input Defense
 * Guards system boundaries against instruction overrides, secret extraction, and malicious payloads.
 */

export interface InjectionCheckResult {
  isSafe: boolean;
  refusalMessage?: string;
  flaggedReason?: string;
}

const INJECTION_PATTERNS: RegExp[] = [
  /ignore (all )?(previous|prior|above) (instructions|prompts|rules)/i,
  /disregard (all )?(previous|prior|system) instructions/i,
  /(show|give|reveal|display|output|print|leak) (me )?(your |the )?(system |hidden |internal )?(prompt|instructions|directive)/i,
  /what (is|are) your (system |hidden |internal )?(instructions|prompt|rules)/i,
  /pretend (you are|to be) (in )?(developer mode|dan|root|admin)/i,
  /act as an unfiltered (ai|model|assistant)/i,
  /override (system|safety|security) (rules|filters)/i,
  /(api[ _-]?key|secret[ _-]?key|credentials|env variable|gemini_api_key)/i,
  /jailbreak/i,
];

const MAX_MESSAGE_LENGTH = 600;

export function evaluateInputSafety(userInput: string): InjectionCheckResult {
  if (!userInput || typeof userInput !== 'string') {
    return {
      isSafe: false,
      refusalMessage: 'Please enter a message to begin.',
      flaggedReason: 'EMPTY_INPUT',
    };
  }

  const trimmed = userInput.trim();

  if (trimmed.length > MAX_MESSAGE_LENGTH) {
    return {
      isSafe: false,
      refusalMessage:
        'Your question is a bit long. Please shorten your inquiry so I can give you the most accurate answer.',
      flaggedReason: 'EXCEEDED_MAX_LENGTH',
    };
  }

  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(trimmed)) {
      return {
        isSafe: false,
        refusalMessage:
          "I can explain how I help visitors navigate EpicForce.ai, our products, and roadmap, but I cannot provide internal system instructions or private architecture specifications.",
        flaggedReason: 'PROMPT_INJECTION_DETECTED',
      };
    }
  }

  return { isSafe: true };
}
