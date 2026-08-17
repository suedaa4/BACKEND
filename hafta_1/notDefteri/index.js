import fs from "fs/promises";

const komut = process.argv[2];
const not = process.argv[3];

const dosyaAdi = "notlar.json";

async function notUygulamasi() {
  let notListesi = [];

  if (komut === "ekle") {
    console.log("Not ekleniyor...");

    try {
      const veri = await fs.readFile(dosyaAdi, "utf-8");
      notListesi = JSON.parse(veri);
    } catch (hata) {}
    notListesi.push(not);
    await fs.writeFile(dosyaAdi, JSON.stringify(notListesi, null, 2));
    console.log("Not başarıyla kaydedildi!");
  } else if (komut === "sil") {
    try {
      const veri = await fs.readFile(dosyaAdi, "utf-8");
      notListesi = JSON.parse(veri);
    } catch (hata) {
      console.log("Henüz hiç not eklenmemiş, silinecek bir şey yok.");
      return;
    }

    notListesi = notListesi.filter((mevcutNot) => mevcutNot !== not);
    await fs.writeFile(dosyaAdi, JSON.stringify(notListesi, null, 2));
    console.log(`${not} başarıyla silindi!`);
  } else if (komut === "listele") {
    try {
      const veri = await fs.readFile(dosyaAdi, "utf-8");
      notListesi = JSON.parse(veri);

      console.log("--- NOTLARIM ---");

      notListesi.forEach((mevcutNot, index) => {
        console.log(`${index + 1}.${mevcutNot}`);
      });

      console.log("----------------");
    } catch (hata) {
      console.log("Henüz hiç not eklenmemiş.");
    }
  } else {
    console.log("Bilinmeyen bir komut girdiniz.");
  }
}

notUygulamasi();
