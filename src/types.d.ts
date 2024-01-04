interface BaseJokeResponse {
  error: boolean;
  category: string;
  type: string;
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
  setup: string;
  delivery: string;
}

interface OnePartJoke extends BaseJokeResponse {
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
