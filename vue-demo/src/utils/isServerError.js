export default function (error) {
    if (error.isAxiosError) {
        if (error.response && error.response.status === 500 || error.response === undefined && error.code !== "ECONNABORTED") {
            return true;
        }
        return false;
    } else {
        return false;
    }
}
