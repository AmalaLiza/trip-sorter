export const selector = state => ({
  filteredDeals: state.deals.get('filteredDeals'),
  departure: state.deals.get('departure'),
  arrival: state.deals.get('arrival'),
});

export const appSelector = state => ({
  error: state.deals.get('error'),
  filteredDeals: state.deals.get('filteredDeals'),
  noResults: state.deals.get('noResults'),
});
