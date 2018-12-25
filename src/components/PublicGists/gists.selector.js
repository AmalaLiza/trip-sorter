export const selectGists = state => ({
  gists: state.gistsApi.get('publicGists'),
  user: state.gistsApi.get('user'),

  data: state.gistsApi.get('data'),
  departure: [...new Set(state.gistsApi.getIn(['data', 'deals']).map(item => item.get('departure')))],
  arrival: [...new Set(state.gistsApi.getIn(['data', 'deals']).map(item => item.get('arrival')))],

});

export const getError = state => ({
  error: state.gistsApi.get('error'),
  gists: state.gistsApi.get('publicGists'),
});
