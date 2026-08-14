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
  } else {
  }
}
notUygulamasi();
