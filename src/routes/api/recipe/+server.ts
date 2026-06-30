import { env } from '$env/dynamic/private';
import { error, json } from '@sveltejs/kit';
import type { RecipeRequest, RecipeResponse } from '$lib/recipe';
import type { RequestHandler } from './$types';

const PLACEHOLDER_KEY = 'gsk_your_groq_api_key_here';

const MOCK_RECIPE: RecipeResponse = {
  title: 'Demo Vegetable Stir-Fry',
  ingredients: ['2 cups mixed vegetables', '2 tbsp soy sauce', '1 tbsp oil', '1 tsp garlic'],
  instructions: [
    'Heat oil in a pan over medium heat.',
    'Add garlic and cook for 30 seconds.',
    'Add vegetables and stir-fry for 5–7 minutes.',
    'Pour in soy sauce, toss, and serve.',
  ],
  raw: '# Demo Vegetable Stir-Fry\n\n## Ingredients\n- 2 cups mixed vegetables\n- 2 tbsp soy sauce\n- 1 tbsp oil\n- 1 tsp garlic\n\n## Instructions\n1. Heat oil in a pan over medium heat.\n2. Add garlic and cook for 30 seconds.\n3. Add vegetables and stir-fry for 5–7 minutes.\n4. Pour in soy sauce, toss, and serve.',
  mock: true,
};

function buildPrompt(request: RecipeRequest): string {
  const { ingredients, style, meal } = request;
  let prompt = `Create a recipe using these ingredients: ${ingredients}.`;
  if (style && style !== 'any') prompt += ` The cuisine style should be ${style}.`;
  if (meal && meal !== 'any') prompt += ` This should be suitable for ${meal}.`;
  prompt +=
    ' Respond with a recipe in markdown. Start with a heading for the title, then an "Ingredients" list, then an "Instructions" numbered list.';
  return prompt;
}

function parseRecipe(raw: string): RecipeResponse {
  const titleMatch = raw.match(/^#\s*(.+)$/m);
  const title = titleMatch?.[1].trim() ?? 'Generated Recipe';

  const ingredientsMatch = raw.match(/##\s*Ingredients\s*\n([\s\S]*?)(?=\n##\s*Instructions|$)/i);
  const ingredients = ingredientsMatch
    ? ingredientsMatch[1]
        .split('\n')
        .map((line) => line.replace(/^[-*]\s*/, '').trim())
        .filter(Boolean)
    : [];

  const instructionsMatch = raw.match(/##\s*Instructions\s*\n([\s\S]*?)(?=\n##|$)/i);
  const instructions = instructionsMatch
    ? instructionsMatch[1]
        .split('\n')
        .map((line) => line.replace(/^\d+\.\s*/, '').trim())
        .filter(Boolean)
    : [];

  return { title, ingredients, instructions, raw, mock: false };
}

async function fetchRecipe(request: RecipeRequest): Promise<RecipeResponse> {
  const apiKey = env.GROQ_API_KEY;

  if (!apiKey || apiKey === PLACEHOLDER_KEY) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return MOCK_RECIPE;
  }

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'llama3-8b-8192',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful recipe assistant. Always respond with a markdown recipe: a title heading, an Ingredients list, and a numbered Instructions list.',
        },
        { role: 'user', content: buildPrompt(request) },
      ],
      temperature: 0.7,
      max_tokens: 1024,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Groq API error ${response.status}: ${body}`);
  }

  const data = (await response.json()) as {
    choices: { message: { content: string } }[];
  };
  const raw = data.choices[0]?.message?.content ?? '';

  return parseRecipe(raw);
}

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body = (await request.json()) as RecipeRequest;
    const recipe = await fetchRecipe(body);
    return json(recipe);
  } catch (err) {
    console.error('Recipe generation failed:', err);
    throw error(500, 'Could not generate a recipe. Please try again later.');
  }
};
