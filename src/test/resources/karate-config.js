function fn() {
    var env = karate.env || 'dev';
    
    var config = {
        apiBaseUrl: 'https://reqres.in/api',
        apiKey: 'free_user_3EY53Y6P0ViM05wYnAJMrsie8vh'
    };

    if (env === 'qa') {
        config.apiBaseUrl = 'https://reqres.in/api'; // cambiar por QA cuando exista
    }

    karate.configure('headers', { 'x-api-key': config.apiKey });

    return config;
}