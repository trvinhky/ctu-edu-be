const db = require("../models")
const axios = require("axios")
const RechargeServices = require("../services/recharge.service")
const crypto = require('crypto');

const RechargeControllers = {
    async create(req, res) {
        const {
            recharge_money,
            recharge_score
        } = req.body

        if (isNaN(+recharge_money) || isNaN(+recharge_score)) {
            return res.errorValid()
        }

        try {
            const newRecharge = await RechargeServices.create(
                {
                    recharge_money: +recharge_money,
                    recharge_score: +recharge_score
                }
            )

            if (newRecharge) {
                return res.successNoData(
                    'Thêm mới gói nạp thành công!'
                )
            }

            return res.error(
                404,
                'Thêm mới gói nạp thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async update(req, res) {
        const {
            recharge_money,
            recharge_score
        } = req.body
        const { id } = req.params

        if (!id || isNaN(+recharge_money) || isNaN(+recharge_score)) {
            return res.errorValid()
        }

        const transaction = await db.sequelize.transaction()

        try {
            const recharge = await RechargeServices.update(
                {
                    recharge_money: +recharge_money,
                    recharge_score: +recharge_score
                },
                id,
                transaction
            )

            if (recharge) {
                await transaction.commit()
                return res.successNoData(
                    'Cập nhật gói nạp thành công!'
                )
            }

            await transaction.rollback()
            return res.error(
                404,
                'Cập nhật gói nạp thất bại!'
            )
        } catch (err) {
            await transaction.rollback()
            return res.errorServer()
        }
    },
    async getOne(req, res) {
        const { id } = req.params

        if (!id) {
            return res.errorValid(
                'Id gói nạp không tồn tại!'
            )
        }

        try {
            const recharge = await RechargeServices.getOne({ recharge_Id: id })

            if (recharge) {
                return res.success(
                    'Lấy gói nạp thành công!',
                    recharge
                )
            }

            return res.error(
                404,
                'Lấy gói nạp thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async getAll(req, res) {
        const { page, limit } = req.query

        try {
            const recharges = await RechargeServices.getAll({
                page, limit
            })

            if (recharges) {
                return res.success(
                    'Lấy tất cả gói nạp thành công!',
                    {
                        count: recharges.count,
                        recharges: recharges.rows
                    }
                )
            }

            return res.error(
                404,
                'Lấy tất cả gói nạp thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async delete(req, res) {
        const { id } = req.params

        if (!id) {
            return res.errorValid(
                'Id gói nạp không tồn tại!'
            )
        }

        try {
            const recharge = await RechargeServices.delete(id)

            if (recharge) {
                return res.successNoData(
                    'Xóa gói nạp thành công!'
                )
            }

            return res.error(
                404,
                'Xóa gói nạp thất bại!'
            )
        } catch (err) {
            return res.errorServer()
        }
    },
    async payment(req, res) {
        const { amount } = req.body
        const { account_Id } = req

        if (!amount) {
            return res.errorValid(
                'Số tiền nạp không tồn tại!'
            )
        }
        //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
        //parameters
        const accessKey = process.env.MOMO_ACCESS_KEY;
        const secretKey = process.env.MOMO_SECRET_KEY;
        const orderInfo = 'pay with MoMo';
        const partnerCode = 'MOMO';
        const redirectUrl = 'https://7afa-2001-ee0-e1f5-46d0-6048-4154-7d72-fef4.ngrok-free.app/auth'; // FE
        const ipnUrl = 'https://b4f7-2001-ee0-e1f5-46d0-6048-4154-7d72-fef4.ngrok-free.app/history/callback'; // BE
        const requestType = "payWithMethod";
        const orderId = partnerCode + new Date().getTime();
        const requestId = orderId;
        const extraData = account_Id;
        const orderGroupId = '';
        const autoCapture = true;
        const lang = 'vi';

        //before sign HMAC SHA256 with format
        //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
        const rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType;

        const signature = crypto.createHmac('sha256', secretKey)
            .update(rawSignature)
            .digest('hex');

        //json object send to MoMo endpoint
        const requestBody = JSON.stringify({
            partnerCode: partnerCode,
            partnerName: "Test",
            storeId: "MomoTestStore",
            requestId: requestId,
            amount: amount,
            orderId: orderId,
            orderInfo: orderInfo,
            redirectUrl: redirectUrl,
            ipnUrl: ipnUrl,
            lang: lang,
            requestType: requestType,
            autoCapture: autoCapture,
            extraData: extraData,
            orderGroupId: orderGroupId,
            signature: signature,
        });

        // options for axios
        const options = {
            method: 'POST',
            url: 'https://test-payment.momo.vn/v2/gateway/api/create',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(requestBody),
            },
            data: requestBody,
        };

        // Send the request and handle the response
        try {
            const result = await axios(options);
            /*
             "data": {
                    "partnerCode": "MOMO",
                    "orderId": "MOMO1729520153416",
                    "requestId": "MOMO1729520153416",
                    "amount": 50000,
                    "responseTime": 1729520155004,
                    "message": "Thành công.",
                    "resultCode": 0,
                    "payUrl": "https://test-payment.momo.vn/v2/gateway/pay?s=c06bc9b0c33ecc21b70cbc325f39ec8f1d3183e8e209173157f0ca86c1fd9ee5&t=TU9NT3xNT01PMTcyOTUyMDE1MzQxNg",
                    "shortLink": "https://test-payment.momo.vn/shortlink/9LY2xg5w0C"
                }
             */
            return res.success(
                'Tạo giao dịch thành công!',
                result.data
            )
        } catch (error) {
            return res.errorServer()
        }
    }
}

module.exports = RechargeControllers