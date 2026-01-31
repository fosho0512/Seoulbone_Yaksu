exports.handler = async function(event, context) {
    const clientId = process.env.NAVER_MAP_CLIENT_ID;
    
    if (!clientId) {
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ error: 'API key not configured' })
        };
    }
    
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ clientId })
    };
};
