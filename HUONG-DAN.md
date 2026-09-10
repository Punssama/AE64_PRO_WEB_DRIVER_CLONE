# Hướng dẫn sử dụng — từng bước một

Hướng dẫn này viết cho người **chưa từng làm gì với dòng lệnh**. Bạn chỉ cần làm theo
đúng thứ tự, không cần hiểu gì về lập trình.

Mất khoảng 30 giây. Không phải tải gì về máy, không phải cài gì.

---

## Mục lục

1. [Cần chuẩn bị gì](#1-cần-chuẩn-bị-gì)
2. [Mở công cụ](#2-mở-công-cụ)
3. [Kết nối bàn phím](#3-kết-nối-bàn-phím)
4. [Hiểu các khái niệm](#4-hiểu-các-khái-niệm--phần-quan-trọng-nhất)
5. [Chỉnh thông số phím](#5-chỉnh-thông-số-phím)
6. [Kiểm tra xem có đúng không](#6-kiểm-tra-xem-có-đúng-không)
7. [4 hồ sơ cấu hình](#7-4-hồ-sơ-cấu-hình)
8. [Các tính năng còn lại](#8-các-tính-năng-còn-lại)
9. [Lỗi thường gặp](#9-lỗi-thường-gặp)

---

## 1. Cần chuẩn bị gì

- Bàn phím **AE64 Pro**, cắm dây USB vào máy tính (không dùng được qua Bluetooth)
- **Google Chrome** hoặc **Microsoft Edge**
  - **Firefox và Safari KHÔNG chạy được.** Đây không phải lỗi — hai trình duyệt này
    không hỗ trợ công nghệ WebHID mà công cụ cần để nói chuyện với bàn phím.
- Máy tính Windows, macOS hoặc Linux

---

## 2. Mở công cụ

Mở **Chrome** hoặc **Edge**, vào địa chỉ này:

**<https://punssama.github.io/AE64_PRO_WEB_DRIVER_CLONE/>**

Xong. Không tải gì về, không cài gì, không có cửa sổ đen nào cả.

Bấm **Ctrl+D** lưu lại để lần sau vào thẳng.

### Làm sao có tính năng mới nhất?

Cứ mở lại đúng cái link đó. Trang **luôn là bản mới nhất** — bạn không phải tải lại
hay cập nhật gì cả. Nếu bạn để tab mở suốt nhiều ngày thì bấm **Ctrl+F5** một cái.

Góc trên bên phải có dòng kiểu `build 09/10/2026`, cho biết bạn đang dùng bản ngày nào.

---

## 3. Kết nối bàn phím

1. Giữa màn hình có biểu tượng bàn phím và dòng **"No keyboard connected."**
   Bàn phím ảo chưa hiện là **đúng** — nó chỉ hiện khi đã kết nối thật.
2. Bấm **Connect keyboard**
3. Chrome hiện hộp thoại chọn thiết bị. Trong đó **chỉ có bàn phím** — công cụ lọc
   theo mã hãng, nên chuột hay tai nghe của bạn không hiện ra để bấm nhầm.
   Chọn nó rồi bấm **Connect**.
   - Nếu thấy nhiều dòng giống hệt nhau, chọn dòng nào cũng được. Bàn phím có nhiều
     cổng bên trong; công cụ tự tìm đúng cổng điều khiển.
4. Góc trên bên phải đổi thành **`[ Connected to AE64 Pro ]`** và bàn phím ảo hiện ra.

Nếu chọn phải thứ không nói chuyện được, công cụ **báo lỗi và quay về màn hình ban
đầu** để bạn bấm Connect chọn lại — chứ không nằm im giả vờ đã kết nối.

Lần sau Chrome nhớ quyền, bấm Connect là vào thẳng, không hỏi lại.

---

## 4. Hiểu các khái niệm — phần quan trọng nhất

Đọc xong phần này thì mọi thứ còn lại rất dễ.

### Hành trình phím

Phím từ tính khác phím cơ thường ở chỗ: nó **đo được** bạn đang nhấn sâu bao nhiêu,
chứ không chỉ biết có bấm hay không.

```
   0.00mm  ┌─────────────┐  ← mặt phím, chưa chạm
           │▒▒▒▒▒▒▒▒▒▒▒▒▒│  ← VÙNG CHẾT TRÊN: bàn phím bỏ qua đoạn này
   0.20mm  ├─────────────┤
           │             │
           │             │
   2.50mm  ┝━━━━━━━━━━━━━┥  ← ĐIỂM KÍCH HOẠT: tới đây chữ mới hiện ra
           │             │
   3.39mm  └─────────────┘  ← đáy, nhấn hết cỡ
```

**Điểm kích hoạt** càng nông (số càng nhỏ) thì phím càng nhạy, phản hồi càng nhanh,
nhưng càng dễ bấm nhầm. Càng sâu thì càng chắc chắn nhưng chậm hơn.

### Rapid Trigger là gì

**Chế độ thường:** bấm xuống qua điểm kích hoạt thì chữ hiện. Muốn bấm lại phải nhả
lên qua điểm đó rồi mới bấm xuống lại. Nhả nửa vời là không ăn.

**Rapid Trigger:** chỉ cần **nhích lên một đoạn rất nhỏ** là phím nhả, **nhích xuống
một đoạn rất nhỏ** là phím bấm lại. Không cần nhả hết.

```
Chế độ thường:          Rapid Trigger (0.1mm):

 ↓ bấm       → ON        ↓ bấm        → ON
 ↑ nhả hết   → OFF       ↑ nhích 0.1  → OFF
 ↓ bấm       → ON        ↓ nhích 0.1  → ON
                         ↑ nhích 0.1  → OFF
```

Nhờ vậy bấm liên tục nhanh hơn hẳn — rất lợi khi chơi game, nhất là lúc đổi hướng
trái/phải trong game bắn súng.

### Ba thông số của Rapid Trigger

| Thông số | Nghĩa |
|---|---|
| **First trigger** | Lần bấm đầu từ trạng thái nhả hẳn: tới độ sâu này thì ăn |
| **Press sensitivity** | Đang nhả, nhích xuống bao nhiêu thì bấm lại |
| **Release sensitivity** | Đang bấm, nhích lên bao nhiêu thì nhả |

Số càng nhỏ càng nhạy. `0.1mm` là rất nhạy, `0.3mm` là vừa phải.

### Vùng chết (Dead zone)

Là phần hành trình bàn phím **cố tình bỏ qua**, ở đầu (trên) và cuối (dưới). Mục đích
là chống nhiễu, tránh phím tự ăn khi bạn chỉ đặt hờ tay lên.

> ### ⚠ CÁI BẪY QUAN TRỌNG NHẤT
>
> **Vùng chết trên "nuốt" mọi điểm kích hoạt nông hơn nó.**
>
> Nếu vùng chết trên là `0.35mm` mà bạn đặt First trigger `0.10mm`, thì phím
> **không** kích hoạt ở 0.10mm — nó kích hoạt ở **0.35mm**. Bàn phím không báo gì cả.
> Bạn tưởng đang dùng 0.1mm nhưng thực tế thì không.
>
> Muốn RT thật sự nhạy 0.1mm thì **phải hạ vùng chết trên xuống dưới 0.1mm trước.**
>
> Tab **Travel test** của công cụ này sẽ cảnh báo thẳng khi gặp trường hợp đó.

---

## 5. Chỉnh thông số phím

### Bước 1 — Chọn phím

Bấm vào phím trên bàn phím ảo. Phím vàng lên là đã chọn. Bấm lần nữa để bỏ chọn.

- Chọn nhiều phím thì bấm lần lượt từng phím
- Hoặc dùng nút có sẵn: **WASD** · **Select all** (tất cả) · **Invert** (đảo lại) ·
  **Clear** (bỏ hết)

Dòng dưới cùng màn hình luôn cho biết đang chọn bao nhiêu phím.

> **Chọn nhiều phím thì mọi thay đổi ghi vào TẤT CẢ các phím đó** — chúng sẽ giống hệt
> nhau. Dòng trạng thái nhắc bạn điều này trước khi bạn kịp chỉnh.

### Bước 2 — Chỉnh

Vào **TRIGGER → Settings** ở cột trái.

**Tab Rapid trigger:**
- Nút gạt **Rapid trigger**: tắt thì chỉ có 1 thanh trượt (điểm kích hoạt),
  bật thì hiện thêm 2 thanh nữa
- Kéo thanh trượt, hoặc gõ thẳng số vào ô bên phải

**Tab Dead zone:** hai thanh trượt cho vùng chết trên và dưới.

### Bước 3 — Không có bước 3

**Không có nút Save.** Chỉnh xong là đã lưu vào bàn phím ngay lập tức. Góc dưới bên
phải hiện **✓ Saved** mỗi lần lưu xong.

### Thông số gợi ý

| Kiểu dùng | Điểm kích hoạt | Rapid Trigger |
|---|---|---|
| Gõ văn bản | 1.5 – 2.0mm | Tắt |
| Chơi game phổ thông | 1.0 – 1.5mm | Bật, 0.2 – 0.3mm |
| FPS, cần phản xạ nhanh | 0.5 – 1.0mm | Bật, 0.1mm (nhớ hạ vùng chết!) |

Chỉ nên bật Rapid Trigger cho phím di chuyển (WASD). Bật cho phím chữ sẽ khiến gõ văn
bản bị lặp chữ.

---

## 6. Kiểm tra xem có đúng không

Đây là tính năng hữu ích nhất, và web của hãng **không có**.

Vào **TRIGGER → Travel test**, chọn một phím, rồi **nhấn phím đó vài lần**.

```
Key A   Mode Rapid Trigger   Now 0.85 mm   PRESSED   Presses 12

First trigger  0.34  set 0.35  OK
Re-press after 0.11  set 0.10  OK
Release after  0.10  set 0.10  OK
```

- **OK** = phím kích hoạt đúng như bạn đặt
- **OFF** = không đúng, số đo lệch khỏi thông số

**Nhấn càng nhiều lần, số đo càng chính xác. Nhấn chậm chính xác hơn nhấn nhanh.**
Mỗi lần nhấn sẽ thu hẹp khoảng đo lại — sau khoảng 10–15 lần thì sai số chỉ còn
cỡ 0.01mm.

Nếu vùng chết đang lấn át thông số của bạn, dòng chữ đậm phía trên sẽ nói thẳng, kèm
con số bạn cần hạ xuống.

---

## 7. 4 hồ sơ cấu hình

Bàn phím lưu sẵn **4 hồ sơ**, mỗi hồ sơ có bộ thông số riêng cho toàn bộ phím. Ví dụ
một hồ sơ để chơi game, một hồ sơ để gõ văn bản.

Đổi hồ sơ bằng ô **CONFIG** ở góc trên bên trái. Đổi xong, mọi thông số trên màn hình
được đọc lại từ hồ sơ mới.

Tên hồ sơ là tên đang lưu trong bàn phím. Chưa đặt tên thì hiện tên mặc định.

---

## 8. Các tính năng còn lại

### Travel test — xem cả bàn phím

Khi **không chọn phím nào**, tab Travel test tô đầy từng phím theo độ sâu bạn đang
nhấn. Tiện để kiểm tra có phím nào bị kẹt hoặc không nhận.

### Calibration — hiệu chỉnh

Bắt bàn phím học lại điểm trên cùng và dưới cùng của từng switch.

**Khi nào cần:** phím ăn không đều, hoặc số đo ở Travel test trông vô lý.
Bình thường **không cần đụng tới**.

Cách làm: vào **TRIGGER → Calibration**, bấm **Start calibration**, rồi bấm **lần nữa
để xác nhận** (phải bấm hai lần là cố ý, tránh chạy nhầm). Sau đó **nhấn từng phím
xuống hết cỡ rồi thả**. Phím nào xong sẽ chuyển xanh, có bộ đếm cho biết còn bao nhiêu
phím. Xong hết thì bấm **Finish calibration**.

> ⚠ Việc này **ghi đè hiệu chỉnh của toàn bộ phím**. Bỏ dở giữa chừng khiến vài phím
> học chưa xong — không hỏng vĩnh viễn, nhưng nên chạy lại từ đầu.

### Polling rate

Số lần bàn phím báo về máy tính mỗi giây. Cao hơn = độ trễ thấp hơn, tốn CPU hơn chút
ít. 1000 Hz đủ cho hầu hết mọi người; 8000 Hz dành cho game thủ thi đấu.

Đổi thông số này khiến bàn phím **ngắt rồi kết nối lại trong chốc lát** — bình thường,
không phải lỗi.

### Lighting

Tô màu từng phím theo chế độ: **trắng** là phím thường, **đỏ** là phím đang bật Rapid
Trigger. Nhìn phát biết ngay đã bật RT cho những phím nào.

Quét hết bàn phím mất khoảng 30 giây. Màu giữ nguyên cho tới khi bạn bấm dừng.

### Log

Nhật ký toàn bộ gói tin gửi/nhận với bàn phím. Người dùng bình thường không cần, nhưng
khi trục trặc thì đây là chỗ xem chuyện gì đã xảy ra.

---

## 9. Lỗi thường gặp

### Bấm Connect mà không có gì xảy ra

- Có đang dùng Firefox hoặc Safari không? Hai trình duyệt này không hỗ trợ. Ngay giữa
  màn hình sẽ có dòng báo đúng như vậy.
- Có mở đúng link ở [mục 2](#2-mở-công-cụ) không? Nếu địa chỉ bắt đầu bằng `file:///`
  thì không bao giờ chạy được.

### Hộp thoại chọn thiết bị trống trơn

Không tìm thấy bàn phím nào khớp bộ lọc. Kiểm tra theo thứ tự:

- Dây USB đã cắm chưa (Bluetooth **không** dùng được)
- Thử cổng USB khác, tránh dùng hub
- Rút ra cắm lại rồi bấm Connect lần nữa

Vẫn không thấy? Bàn phím của bạn có thể được bán dưới **thương hiệu khác** với mã hãng
mà tôi chưa biết. Bấm dòng chữ nhỏ **"Keyboard not in the list?"** ngay dưới nút
Connect — nó mở hộp thoại **không lọc**, hiện mọi thiết bị. Chọn bàn phím của bạn;
nếu chọn nhầm thứ khác thì công cụ vẫn kiểm tra và từ chối, không hỏng gì cả.

Nếu cách đó chạy được, **báo cho tôi biết** để tôi thêm mã hãng của bạn vào bộ lọc.

### Báo "The keyboard did not answer"

Bàn phím đang khởi động lại — hay gặp nhất là ngay sau khi đổi **Polling rate**.
Đợi vài giây rồi bấm **Connect keyboard** lần nữa.

### Trang treo, bấm gì cũng không được

Dịch vụ HID của Chrome bị kẹt. Cách sửa: **đóng hẳn Chrome rồi mở lại** (đóng cả
chương trình, không chỉ đóng tab). Tránh gặp lại bằng cách không tải lại trang khi
đang kết nối bàn phím.

### Bàn phím gõ chữ lung tung khi đang test

Bình thường — bàn phím vẫn là bàn phím. Trước khi nhấn thử, bấm chuột ra chỗ trống
trên trang, đừng để con trỏ nằm trong ô nhập liệu.

### Chỉnh xong mà không thấy khác gì

- Đã chọn phím chưa? Chưa chọn thì mọi ô đều mờ và không bấm được.
- Có nhầm hồ sơ không? Kiểm tra ô **CONFIG** góc trên bên trái.
- Vào **Travel test** kiểm tra xem phím có thật sự kích hoạt đúng chỗ không — rất có
  thể **vùng chết đang lấn át** thông số của bạn
  (xem [mục 4](#4-hiểu-các-khái-niệm--phần-quan-trọng-nhất)).

### Rút bàn phím ra rồi cắm lại

Công cụ tự nhận biết. Rút ra thì quay về màn hình "No keyboard connected"; cắm lại thì
bấm **Connect keyboard** lần nữa.

---

## Vẫn không được?

Mở tab **Log**, chụp màn hình mấy dòng cuối, rồi tạo issue tại
<https://github.com/Punssama/AE64_PRO_WEB_DRIVER_CLONE/issues>.
