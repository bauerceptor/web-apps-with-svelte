export type RecipeRequest = {
  ingredients: string;
  style?: string;
  meal?: string;
};

export type RecipeResponse = {
  title: string;
  ingredients: string[];
  instructions: string[];
  raw: string;
  mock: boolean;
};
