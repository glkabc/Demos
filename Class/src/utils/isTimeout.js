
export default function (error) {
    if (error.isAxiosError && error.code === "ECONNABORTED") {
        return true;
    } else {
        return false;
    }
}
