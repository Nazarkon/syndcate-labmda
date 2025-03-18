exports.handler = async (event) => {
    console.log(event, 'event');
    const requestedContext = event?.requestContext;

    if(requestedContext) {
        const { http } = requestedContext;

        if(http.method === 'GET' && http.path === '/hello') {
            return ({
                statusCode: 200,
                body: 'Hello from Lambda',
            })
        } else {
            return (
                {
                    statusCode: 400,
                    message: `Bad request syntax or unsupported method. Request path: ${http.path}. HTTP method: ${http.method}`
                }
            )
        }
    }

    return (
        {
            statusCode: 400,
            message: 'Bad request syntax or unsupported method'
        }
    )
};
