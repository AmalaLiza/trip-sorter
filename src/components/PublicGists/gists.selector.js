export const selectGists = state => ({
  gists: state.gistsApi.get('publicGists'),
  user: state.gistsApi.get('user'),
});

export const getError = state => ({
  error: state.gistsApi.get('error'),
  gists: state.gistsApi.get('publicGists'),
});
