export default function (error) {
    if (error.response) {
        switch (error.response.status) {
            case 401:
                return true;
            default:
                return false;
        }
    } else {
        return false;
    }
}
