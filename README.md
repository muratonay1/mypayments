# Main Page
![period_AnaSayfa](https://github.com/muratonay1/mypayments/assets/34923740/f73b8891-9ef2-4b6b-bb0b-a4a7df0f08c3)

# Periods List
- Her periyot farklı verileri içermektedir. Seçilen periyoda göre yapılan harcamalar listelenir.
![1](https://github.com/muratonay1/mypayments/assets/34923740/0f320ba8-d242-4e74-b492-880898f8f424)

# Add New Periods
- Yeni periyot eklerken mantıklı isimlendirme sıralama için önemlidir. İsimlendirme formatı şu şekilde olmalıdır.
-  Ocak-2023, Subat-2023, Mart-2023, Nisan-2023, Mayis-2023 ...
-  Baş harf büyük ve türkçe karakter kullanmadan "Ay" + "-" + "Yıl" olacak şekilde girilmelidir.
![2](https://github.com/muratonay1/mypayments/assets/34923740/d18f7f05-1bc4-4207-8877-05f5ff0e69bc)

# Add New Payment
- Detay alanına harcama detayınız, Tutar alanına ise yalnızca harcama tutarını 300, 500, ya da 200,50 gibi küsüratlı rakamlar girin.
- Ya da Toplu Dönem yükle butonu ile oluşturduğunuz {"name":"Harcama Detayı", "amount":"Harcama Tutarı", "date":"14 Tem 2023 Cum 15:11:35"} formatlı json arraylistini yükleyebilirsiniz. Bu backup aldığınızda olası hatalarda dönemi, kolayca yeniden yükleme olanağı verir.
![2](https://github.com/muratonay1/mypayments/assets/34923740/4763a53e-1655-405e-84ed-daedca0dc134)

# Statistics
- Sisteme toplam kaç dönem girilmiş ve toplam harcama detay bilgilerinin yer aldığı popuptır.
![2](https://github.com/muratonay1/mypayments/assets/34923740/e3361994-b6f3-4a99-824a-d92493c0522f)

# Get Backup
- Eğer yedek almak isterseniz firebase authentication'da tanımlı şifreniz ile bütün dönemlerin yedeğini .json formatında indirip saklayabilirsiniz.
![2](https://github.com/muratonay1/mypayments/assets/34923740/7c0b917f-0fde-4b36-95fa-499990755dd0)

# Saving Funds
Şuan için yalnızca Gram Altın cinsinden birikim fonu saklayabilirsiniz. Anlık kur bilgisini "Yeniden Hesapla" butonu ile çekebilir ve miktar cinsinden yeniden TL karşılığını hesaplayabilirsiniz. Ardından kaydedebilir ve bir sonraki Yeniden Hesapla'ya basıncaya dek sonucu saklayabilirsiniz.
![2](https://github.com/muratonay1/mypayments/assets/34923740/d1b73ecc-e5c4-4547-98cf-d92c9d8024bf)

# Updating
- Eğer eklediğiniz harcama detayında ya da tutarında bir yanlışlık yaptıysanız veyahut yapılan harcama tutarı değiştiyse hücre bazında değeri güncelleyip "Kaydet" butonuna basmanız yeterli olacaktır. Bu içinde bulunduğunuz döneme, değişikliği yansıtacaktır.
![2](https://github.com/muratonay1/mypayments/assets/34923740/6b8831aa-8a5c-4cdb-b224-df4a661abdce)
![2](https://github.com/muratonay1/mypayments/assets/34923740/eaee0280-a9e5-4916-bd82-515397395697)

# Deleting
- Dönem Silme
Dönem sil butonuna tıkladığınızda içinde bulunduğunuz dönem silinecektir. 
![2](https://github.com/muratonay1/mypayments/assets/34923740/cb367659-0546-485d-a4eb-9a5744348be4)

- Harcama Silme
Harcama satırına sağ click yaptığımızda açılan menüden remove row tıklayarak seçilen satırı silebilir, ardından kaydet tuşuna basarak harcamalarınızı ve tutarınızı güncelleyebilirsiniz.
![2](https://github.com/muratonay1/mypayments/assets/34923740/bbdf2c2a-29de-42d1-941c-941ab8343c10)
![2](https://github.com/muratonay1/mypayments/assets/34923740/f8b860bd-e9f6-4100-a2e3-c3525d402737)



Kusursuz bir model olmamakla birlikte projeyi indirip kendi isterlerinize uygun düzenleyip, yeniden bir model oluşturabilirsiniz. Bir taslak çalışmasıdır. 
Öneri: Github hesabınıza bir repository ekleyip bu repository'i github pages'e bağlayın. Mobil uyumlu'da bir model olduğu için kendi harcama detaylarınızı sisteme girip kendi veritabanınızı yönetirken de kişisel harcamalarınıza ay ay ve miktar miktar ulaşabilirsiniz.

Dilediğiniz gibi indirip revize edebilirsiniz. Aklınıza takılan herhangi br soru olursa ya da öneri sunmak isterseniz mail adresim: imuratony@gmail.com
