&lt;?php
header(&#39;Content-Type: application/json&#39;);

// \>\>\>\>\>\> API KEY CỦA BẠN ĐÃ ĐƯỢC THÊM VÀO ĐÂY \<\<\<\<\<\<
$partner\_key = '4F19E3FB6431FD9D4A61517B9B4345F5'; // API Key của bạn
// \>\>\>\>\>\> KẾT THÚC PHẦN THAY THÔNG TIN \<\<\<\<\<\<

$request\_body = file\_get\_contents('php://input');
$data = json\_decode($request\_body, true);

if (\!$data) {
echo json\_encode(['status' =\> 99, 'msg' =\> 'Invalid data format']);
exit();
}

$status = $data['status'] ?? null;
$message = $data['message'] ?? null;
$request\_id = $data['request\_id'] ?? null;
$declared\_value = $data['declared\_value'] ?? 0;
$value = $data['value'] ?? 0;
$amount = $data['amount'] ?? 0;
$code = $data['code'] ?? null;
$serial = $data['serial'] ?? null;
$telco = $data['telco'] ?? null;
$trans\_id = $data['trans\_id'] ?? null;
$sign = $data['sign'] ?? null;

$expected\_sign = md5($partner\_key . $code . $serial);

// --- BƯỚC QUAN TRỌNG NHẤT: XÁC THỰC CHỮ KÝ ---
if ($sign \!== $expected\_sign) {
file\_put\_contents('callback\_log.txt', "INVALID SIGN: " . $request\_body . "\\n", FILE\_APPEND);
echo json\_encode(['status' =\> 100, 'msg' =\> 'Invalid signature']);
exit();
}

file\_put\_contents('callback\_log.txt', "CALLBACK RECEIVED: " . $request\_body . "\\n", FILE\_APPEND);

// --- XỬ LÝ KẾT QUẢ NẠP THẺ ---
if ($status == 1) {
// THẺ NẠP THÀNH CÔNG
// TẠI ĐÂY, BẠN SẼ VIẾT LOGIC CỘNG TIỀN VÀO DATABASE CHO NGƯỜI CHƠI
// Ví dụ: Lấy tên người chơi từ request\_id và cộng `amount` vào tài khoản của họ
$log\_message = sprintf(
"SUCCESS: request\_id=%s, telco=%s, value=%d, amount=%d, trans\_id=%s\\n",
$request\_id, $telco, $value, $amount, $trans\_id
);
file\_put\_contents('successful\_transactions.txt', $log\_message, FILE\_APPEND);

} else if ($status == 2) {
// THẺ NẠP THÀNH CÔNG NHƯNG SAI MỆNH GIÁ
$log\_message = sprintf(
"WRONG AMOUNT: request\_id=%s, telco=%s, declared\_value=%d, actual\_value=%d\\n",
$request\_id, $telco, $declared\_value, $value
);
file\_put\_contents('wrong\_amount\_transactions.txt', $log\_message, FILE\_APPEND);

} else {
// THẺ LỖI
$log\_message = sprintf(
"FAILED: request\_id=%s, status=%s, message=%s\\n",
$request\_id, $status, $message
);
file\_put\_contents('failed\_transactions.txt', $log\_message, FILE\_APPEND);
}

echo json\_encode(['status' =\> 'success', 'msg' =\> 'Callback received']);
?\>
