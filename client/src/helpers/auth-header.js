export function header() {
    let local = JSON.parse(localStorage.getItem('user'))
    if (local) {
        return {
            headers: {
                'Authorization': `Bearer ${local.token.accessToken}`
            }
        }
    }
}