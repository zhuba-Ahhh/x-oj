/* eslint-disable no-undef */
const path = require('path');
const fs = require('fs');

function requireUncached(module) {
    delete require.cache[require.resolve(module)];
    return require(module);
}

module.exports = {
    before: (config = {}) => app => {
        const { mockDir = 'mock', cwd = process.cwd(), routes = ['/rest/*', '/api/*', '/eshop/*'] } = config;
        // 请求计数器
        let counts = {};
        const handle = (req, resp) => {
            const mockPath = path.join(cwd, mockDir, `${req.path}.js`);
            if (fs.existsSync(mockPath)) {
                try {
                    let res = requireUncached(mockPath);
                    // 请求计数器
                    counts[mockPath] = counts[mockPath] || 0;
                    if (typeof res === 'function') {
                        res = res(counts[mockPath]++);
                    }
                    setTimeout(() => {
                        // 测试接口错误
                        if(mockPath == '/Users/nishuai/code/kibt-fe-shop-c/mock/rest/o/ecommerce/customer/shop/isNewUser.js'){
                            resp.status(500);
                            resp.json(res);
                        } else {
                            resp.json(res);
                        }
                    }, 100);
                } catch (e) {
                    console.error(`mock文件加载报错：${mockPath}`);
                    setTimeout(() => {
                        resp.json({ result: -1, message: `mock文件加载报错：${mockPath}` });
                    }, 100);
                }
            } else {
                console.error(`mock文件不存在：${mockPath}`);
                setTimeout(() => {
                    resp.json({ result: -1, message: `mock文件不存在：${mockPath}` });
                }, 100);
            }
        };

        routes.forEach(path => {
            app.get(path, handle);
            app.post(path, handle);
        });
    },
};
