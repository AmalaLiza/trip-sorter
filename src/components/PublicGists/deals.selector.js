export const selector = state => ({
    deals: state.deals.get('deals'),
    user: state.deals.get('user'),
    data: state.deals.get('deals'),
    departure: state.deals.get('departure'),
    arrival: state.deals.get('arrival'),
});

export const getError = state => ({
    error: state.deals.get('error'),
    deals: state.deals.get('deals'),
});
