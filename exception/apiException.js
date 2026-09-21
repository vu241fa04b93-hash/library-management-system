export function handleApiError(error) {

    if (error.response) {
        return `Server error: ${error.response.status}`;
    }

    if (error.request) {
        return "Unable to connect to the server. Please make sure JSON Server is running.";
    }

    return `Unexpected error: ${error.message}`;
}