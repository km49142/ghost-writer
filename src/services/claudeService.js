import Anthropic from '@anthropic-ai/sdk';
import { SYSTEM_PROMPT } from '../utils/prompts';
import { detectCrisis } from '../utils/crisisDetection';

const anthropic = new Anthropic({
  apiKey: process.env.REACT_APP_ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true, // Only for hackathon demo!
});

export async function getClaudeReflection(entryText, conversationHistory = []) {
  try {
    // Check for crisis keywords before sending to Claude
    const crisisDetected = detectCrisis(entryText);

    const messages = [
      ...conversationHistory,
      { role: 'user', content: entryText }
    ];

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages,
    });

    const content = response.content[0].text;

    // Return with crisis flag if detected
    return {
      content,
      crisis: crisisDetected,
    };
  } catch (error) {
    console.error('Error calling Claude API:', error);
    
    // Graceful fallback
    return {
      content: "I'm having trouble connecting right now. Your words are safe and saved locally. Please try again in a moment.",
      crisis: false,
      error: true,
    };
  }
}

export async function getContinuedReflection(message, fullConversationHistory) {
  try {
    const crisisDetected = detectCrisis(message);

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        ...fullConversationHistory,
        { role: 'user', content: message }
      ],
    });

    return {
      content: response.content[0].text,
      crisis: crisisDetected,
    };
  } catch (error) {
    console.error('Error calling Claude API:', error);
    return {
      content: "I'm having trouble connecting right now. Please try again in a moment.",
      crisis: false,
      error: true,
    };
  }
}