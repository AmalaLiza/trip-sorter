export const selector = state => ({
    filteredDeals: state.deals.get('filteredDeals'),
    user: state.deals.get('user'),
    data: state.deals.get('deals'),
    departure: state.deals.get('departure'),
    arrival: state.deals.get('arrival'),
});

export const getError = state => ({
    error: state.deals.get('error'),
    filteredDeals: state.deals.get('filteredDeals'),
});
