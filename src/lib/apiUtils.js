const apiUtils = {
    checkStatus: (response) => {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            let error = Error(response.statusText);
            error.response = response;
            throw error;
        }
    }
};

export default apiUtils;