const { createProxyMiddleware }= require('http-proxy-middleware');

module.exports = function(app) {
    app.use('/api', createProxyMiddleware({
                "target": "https://music.163.com",
                "changeOrigin": true,
                "pathRewrite": {
                    "^/api": "/"
                }
            })
        );
};
