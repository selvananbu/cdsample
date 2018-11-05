class OpenApiResponse{
    // This is the wrapper for AJAX response with convenience functions

    constructor(response){
        this.state = {
            response: response
        }
    }

    isSuccess(response){

    }
    //to get only response
    responseData(response){
        return response.data;   
    }

    //to get only status
    responseStatus(response){
        return response.status;   
    }
}

export default OpenApiResponse;