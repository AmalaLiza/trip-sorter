export const selector = state => ({
  filteredDeals: state.deals.get('filteredDeals'),
  departure: state.deals.get('departure'),
  arrival: state.deals.get('arrival'),
});

export const getError = state => ({
  error: state.deals.get('error'),
  filteredDeals: state.deals.get('filteredDeals'),
});
