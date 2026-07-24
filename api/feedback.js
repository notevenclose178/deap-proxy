// api/feedback.js
export default async function handler(req, res) {
    // 只允许 POST 请求
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { user, contact, desc } = req.body;

    // 您的钉钉机器人 Webhook
    const webhook = 'https://oapi.dingtalk.com/robot/send?access_token=ffa137d9abcc7795e1b2b9a99a966f66dc37c3176bec3066c7b966b96a5e6db0';

    const text = `
📢 **财务小助理 - 问题未解决反馈**

👤 姓名：${user || '未填写'}
📱 钉钉号：${contact || '未填写'}
📝 问题描述：${desc || '未描述'}

⏰ 时间：${new Date().toLocaleString('zh-CN')}
    `;

    try {
        const response = await fetch(webhook, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                msgtype: 'text',
                text: { content: text }
            })
        });
        const data = await response.json();
        if (data.errcode === 0) {
            res.status(200).json({ success: true });
        } else {
            res.status(500).json({ success: false, error: data.errmsg });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}