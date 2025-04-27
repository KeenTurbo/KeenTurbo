[rewrite_local]
# 清除广告图片请
^https?:\/\/cdn\.smartimg\.chelaile\.net\.cn\/5d26554ecb7446e8bb0945d7d2d78e6e\.jpg url reject

# 修改广告配置JSON响应
^https?:\/\/api\.chelaile\.net\.cn\/adpub\/ url script-response-body https://raw.githubusercontent.com/KeenTurbo/KeenTurbo/refs/heads/gh-pages/chelailenoad.js


let body = $response.body;

// 关键修改点：

const $ = new API('ad-blocker');

let body = $.response.body;
try {
    let json = JSON.parse(body);
    
    // 执行深度修改
    json = (function modifyDeep(config) {
        return {
            ...config,
            data: {
                ...config.data,
                ads: [], // 清空所有广告数据
                config: {
                    ...config.data.config,
                    homeAdPosition: -1,
                    isDisplay: 1,
                    adStyle: 0,
                    rejectHomeAdShow: 1,
                    height: 0,
                    width: 0,
                    refreshTime: 0,
                    mixRefreshAdInterval: 0
                }
            }
        };
    })(json);

    $.done({ body: JSON.stringify(json) });
} catch (e) {
    $.log(`解析失败: ${e}`);
    $.done();
}