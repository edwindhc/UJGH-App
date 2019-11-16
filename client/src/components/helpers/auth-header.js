export function header() {
    let local = JSON.parse(localStorage.getItem('user'))
    if (local) {
        if (local.token) {
            return { 'Authorization': `Bearer ${local.token.accessToken}` };
        } else {
            return {};
        }
    }
}