// Crisis keyword detection
const CRISIS_KEYWORDS = [
  // Direct self-harm indicators
  'kill myself',
  'end my life',
  'want to die',
  'suicide',
  'suicidal',
  'better off dead',
  'no reason to live',
  'can\'t go on',
  
  // Self-harm indicators
  'hurt myself',
  'harm myself',
  'cut myself',
  
  // Severe despair
  'no way out',
  'can\'t take it anymore',
  'everyone would be better without me',
  'don\'t want to be here',
  
  // Planning indicators
  'made a plan',
  'have a plan to',
  'going to end',
];

const CONTEXT_PHRASES = [
  // These reduce false positives
  'thought about',
  'used to',
  'in the past',
  'someone else',
  'friend who',
  'read about',
  'movie where',
];

export function detectCrisis(text) {
  if (!text || typeof text !== 'string') {
    return false;
  }

  const lowerText = text.toLowerCase();

  // Check if context suggests this is historical/hypothetical
  const hasContextPhrase = CONTEXT_PHRASES.some(phrase => 
    lowerText.includes(phrase)
  );

  // Check for crisis keywords
  const hasCrisisKeyword = CRISIS_KEYWORDS.some(keyword => 
    lowerText.includes(keyword)
  );

  // Trigger crisis response if keyword found and no context qualifier
  // (or if multiple crisis keywords appear, override context)
  const keywordCount = CRISIS_KEYWORDS.filter(keyword => 
    lowerText.includes(keyword)
  ).length;

  if (keywordCount >= 2) {
    return true; // Multiple crisis keywords = high confidence
  }

  if (hasCrisisKeyword && !hasContextPhrase) {
    return true;
  }

  return false;
}

export function getCrisisResources() {
  return [
    {
      name: 'Crisis Text Line',
      contact: 'Text HOME to 741741',
      description: '24/7 support via text',
      type: 'text',
    },
    {
      name: 'National Suicide Prevention Lifeline',
      contact: 'Call or text 988',
      description: '24/7 crisis counseling',
      type: 'phone',
    },
    {
      name: 'International Association for Suicide Prevention',
      contact: 'https://www.iasp.info/resources/Crisis_Centres/',
      description: 'Find helplines worldwide',
      type: 'web',
    },
  ];
}