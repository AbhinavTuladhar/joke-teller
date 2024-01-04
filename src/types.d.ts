interface BaseJokeResponse {
  error: boolean;
  category: string;
  flags: {
    nsfw: boolean;
    religious: boolean;
    political: boolean;
    racist: boolean;
    sexist: boolean;
    explicit: boolean;
  };
  id: number;
  safe: boolean;
  lang: string;
}

interface TwoPartJoke extends BaseJokeResponse {
  type: 'twopart',
  setup: string;
  delivery: string;
}

interface OnePartJoke extends BaseJokeResponse {
  type: 'single',
  joke: string;
}

interface NoJoke extends Partial<BaseJokeResponse> {
  internalError: boolean;
  code: number;
  message: string;
  causedBy: string[];
  additionalInfo: string;
  timestamp: number;
}

// Use Partial to make certain keys optional
// export type JokeResponse = TwoPartJoke | OnePartJoke | (NoJoke & Partial<BaseJokeResponse>);
export type JokeResponse = TwoPartJoke | OnePartJoke;
