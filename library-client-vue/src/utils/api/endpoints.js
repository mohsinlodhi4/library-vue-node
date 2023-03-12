const baseUrl = import.meta.env.VITE_ROOT_API

const endPoints = {
    register: baseUrl + '/auth/register',
    login: baseUrl + '/auth/login',
    userFromToken: baseUrl + '/auth/user',
    getBooks: baseUrl + '/books/list',
    checkOutBook: baseUrl + '/books/checkout',
    checkInBook: baseUrl + '/books/checkin',
    checkInHistoryBook: baseUrl + '/books/history',
}

export default endPoints;