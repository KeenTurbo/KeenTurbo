[rewrite_local]
# 清除广告图片请求
^https?:\/\/cdn\.smartimg\.chelaile\.net\.cn\/5d26554ecb7446e8bb0945d7d2d78e6e\.jpg url reject

# 修改广告配置JSON响应
^https?:\/\/api\.chelaile\.net\.cn\/adpub\/ url script-response-body https://raw.githubusercontent.com/KeenTurbo/KeenTurbo/refs/heads/gh-pages/chelailenoad.js


let body = $response.body;

// 关键修改点：
body = body.replace(/"ads":\[.*?\]/gs, '"ads":[]');  // 清空广告数组
body = body.replace(/"homeAdPosition":5/, '"homeAdPosition":0'); // 关闭首页广告位
body = body.replace(/"isDisplay":0/, '"isDisplay":1'); // 伪装不显示广告
body = body.replace(/"actPosition":0/, '"actPosition":1'); // 隐藏活动提示

$done({body});