/**
 * Makes a url for the jokes api based on the provided options.
 * @param categories The categories of the joke
 * @param blacklists The flags to blacklist
 * @param jokeTypes Whether to use a single. or double line joke
 * @returns 
 */
const makeUrl = (categories: string[], blacklists: string[], jokeTypes: string[]) => {
  const baseUrl = 'https://v2.jokeapi.dev/joke/';
  const categoriesPart = categories.length > 0 ? categories.join(',') : 'Any';
  const blacklistPart = blacklists.length > 0 ? `?blacklistFlags=${blacklists.join(',')}` : '';
  const jokesPrefix = blacklistPart ? '&' : '?';
  const jokeTypesPart = jokeTypes.length === 1 ? `${jokesPrefix}type=${jokeTypes[0]}` : '';

  const finalUrl = `${baseUrl}${categoriesPart}${blacklistPart}${jokeTypesPart}`;
  return finalUrl;
};


export default makeUrl