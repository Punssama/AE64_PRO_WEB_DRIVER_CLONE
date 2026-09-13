#AE64 Pro Tuner

Công cụ chỉnh bàn phím từ tính (Hall effect) **AE64 Pro** chạy thẳng trên trình duyệt,
không cần cài phần mềm, không phụ thuộc web của hãng.

Toàn bộ nằm trong **một file duy nhất**: `index.html`. Không cần build,
không thư viện, chỉ JavaScript thuần và WebHID.

> **Chưa từng làm việc này bao giờ?** Đọc [HƯỚNG DẪN CHI TIẾT](HUONG-DAN.md) —
> viết cho người chưa rành máy tính, có từng bước một.
>
> English version: [README.md](README.md)

## Làm được gì

| Tính năng         | Mô tả                                                                                 |
| ----------------- | ------------------------------------------------------------------------------------- |
| **Chọn phím**     | Bấm vào bàn phím ảo để chọn, bấm lại để bỏ. Có sẵn nút WASD / Chọn tất cả / Đảo / Xoá |
| **Rapid Trigger** | Bật/tắt cho từng phím. Tắt thì chỉnh 1 thông số, bật thì thêm 2 thông số nữa. Chỉnh được xuống mức nhỏ nhất bàn phím cho phép (0.001mm với bàn này); dưới 0.1mm thì số chuyển đỏ, cả ở ô nhập lẫn tag `RT` trên phím, vì nông vậy switch có thể kích hoạt thất thường |
| **Vùng chết**     | Phần hành trình phím mà bàn phím bỏ qua ở đầu và cuối                                 |
| **Advanced keys** | SOCD, Rapid Switch, MPT, Mod-Tap, Toggle, End — mỗi phím vật lý 1 tính năng. DKS tạm tắt trong lúc làm lại phần chỉnh |
| **Anti-ghosting** | Đọc/bật-tắt công tắc chống dội phím của firmware (tự bật lại sau mỗi lần cắm điện, đúng thiết kế của firmware, không phải lỗi) |
| **Key test area** | Mỗi phím vật lý sáng lên ngay khi giữ, để kiểm tra rollover và phím chết             |
| **Macro editor**  | Ghi âm, lưu, xem danh sách, xoá, và xem trước macro ngay trên trình duyệt. Gán macro vào 1 phím thật thì chưa nối được — mã "chạy macro N" mà firmware cần chưa xác nhận được |
| **Config**        | Bàn phím lưu sẵn 4 hồ sơ, chuyển qua lại được, đổi tên được, mỗi hồ sơ có thông số riêng |
| **Backup / restore** | Xuất mọi thứ tool này đọc được (thông số, keymap, advanced keys, đèn, polling rate) ra file JSON, và nạp lại được, có đọc lại để đối chiếu |
| **Travel test**   | **Kiểm chứng** phím có thật sự kích hoạt đúng độ sâu bạn đặt hay không                |
| **Calibration**   | Bắt bàn phím học lại điểm trên/dưới của từng switch                                   |
| **Polling rate**  | 125 Hz đến 8000 Hz                                                                    |
| **Đèn**           | Hiệu ứng, độ sáng, tốc độ, hướng và màu cho từng vùng đèn, tô màu riêng từng phím; với bàn dual LED này thì bật riêng được LED trên và LED dưới của mỗi switch. Bàn phím ảo hiện trực tiếp đèn đang sáng: nửa trên phím cho LED trên, nửa dưới cho LED dưới |
| **Dark theme**    | Công tắc trên thanh tiêu đề; mặc định theo chế độ sáng/tối của hệ điều hành cho tới khi bạn tự chọn |
| **Nhật ký HID**   | Xem từng gói tin gửi/nhận, để biết chính xác cái gì đã được gửi đi                    |

**Chỉnh xong là lưu ngay**, không có nút Save.

### Cái bẫy về vùng chết

**Vùng chết trên nuốt mọi điểm kích hoạt nông hơn nó.** Vùng chết `0.35mm` mà đặt First
trigger `0.10mm` thì phím kích hoạt ở **0.35mm**, không phải 0.10mm — âm thầm, không báo
gì cả. Độ sâu kích hoạt thật = `max(thông số bạn đặt, vùng chết trên)`.

Muốn đúng thông số thì phải hạ vùng chết xuống dưới điểm kích hoạt. Tab **Travel test**
phát hiện và nói thẳng chuyện này ra.

## Chạy thế nào

**<https://punssama.github.io/AE64_PRO_WEB_DRIVER_CLONE/>** — mở lên và bấm
**Connect keyboard**. Không phải clone, không phải cài gì, và **luôn là bản mới nhất**
vì trang được phục vụ thẳng từ nhánh `main`.

Sở dĩ phải có bản chạy trên mạng là vì WebHID chỉ hoạt động trong **môi trường an
toàn**: `https://` và `localhost` thì được, `file://` thì **không**. Bấm đúp vào file
HTML thì `navigator.hid` không tồn tại và nút Connect chết cứng.

Muốn tự chạy bản của mình — offline, hoặc có sửa đổi — thì chạy qua localhost:

```sh
git clone https://github.com/Punssama/AE64_PRO_WEB_DRIVER_CLONE.git
cd AE64_PRO_WEB_DRIVER_CLONE
python -m http.server 8787
```

Rồi mở <http://localhost:8787/>. Máy chủ tĩnh nào cũng được; `python -m http.server`
chỉ tiện vì không phải cài thêm gì. Thêm `?selftest` vào URL để chạy phần kiểm tra bộ
lọc thiết bị trong console.

**Trình duyệt:** WebHID có trên Chrome, Edge và các trình duyệt nhân Chromium.
Firefox và Safari **không** hỗ trợ.

## Bản desktop (Windows)

Muốn một app riêng — không cần trình duyệt, chạy offline, kết nối không hiện hộp chọn
thiết bị? Tải bộ cài ở trang [**Releases**](https://github.com/Punssama/AE64_PRO_WEB_DRIVER_CLONE/releases)
(`AE64-Pro-Tuner-Setup-<phiên bản>.exe`). Đây là cùng công cụ này gói trong Electron;
giao thức y hệt bản web.

App **chưa ký số**, nên lần đầu chạy Windows SmartScreen sẽ báo "Windows protected your
PC" — bấm **More info → Run anyway**.

Mã nguồn bản desktop nằm ở [`desktop/`](desktop/); chạy `cd desktop && npm install && npm run dist`
để build lại bộ cài. Nó dùng chung đúng file `index.html` này, nên chỉ có một nguồn duy nhất.

## Cảnh báo an toàn

Công cụ này ghi thẳng vào cấu hình trong firmware bàn phím. Vài điều nó làm để không
làm hỏng bàn phím của bạn — đáng biết nếu bạn định sửa code:

- **Dữ liệu hiệu chỉnh trục** của mỗi phím (`axisRangeMax`, `axisCoefficient`, …) được
  đọc lại trước mỗi lần ghi và truyền qua nguyên vẹn. Ghi số 0 vào đó là **xoá mất
  hiệu chỉnh gốc** của phím đó.
- Form được nạp từ bàn phím ngay khi bạn chọn phím. Một lần ghi gửi đi **tất cả** thông
  số cùng lúc, nên một ô còn giá trị cũ sẽ âm thầm ghi đè lên giá trị thật.
- **Mọi lần ghi đều được đọc lại và đối chiếu.** Firmware bỏ qua giá trị nó không chấp
  nhận mà không báo lỗi, nên nếu không đọc lại thì một lần ghi bị từ chối vẫn trông như
  thành công.
- Ô nhập để trống bị từ chối, thay vì bị hiểu thành `0.00mm`.

Khi bạn chọn nhiều phím, chỉnh bất kỳ thông số nào là **ghi vào tất cả** các phím đó.

## Dự án này được làm ra thế nào

Giao thức được dịch ngược từ chính web của hãng, bằng cách đọc mã JavaScript đã biên
dịch của họ và quan sát gói tin HID trên thiết bị tôi sở hữu. Mã lệnh được lấy từ chính
mã nguồn đó, không phải đoán mò.

Bundle của hãng **không** nằm trong repo này — đó là mã có bản quyền của họ.
`.gitignore` đã loại trừ.

## Miễn trừ trách nhiệm

Không liên kết, không được bảo trợ hay hỗ trợ bởi nhà sản xuất hoặc xsyd.top.
Bạn tự chịu rủi ro khi sử dụng.
