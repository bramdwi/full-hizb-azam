// Chapter map derived from the source PDF's own page footers/headings.
// Each chapter points at the exact page range of the scanned original,
// so the Arabic (and everything else) shown is always the real page image.
const BOOK = {
  title: "Mukhtashar Al-Hizbul A'zham",
  subtitle: "Buku Saku Amalan Harian",
  totalPages: 76,
  chapters: [
    {
      id: "sampul",
      label: "Sampul",
      title: "Sampul & Petunjuk Penggunaan",
      day: null,
      start: 1, end: 1,
      note: "Daftar isi asli dan petunjuk penggunaan buku saku.",
      highlights: []
    },
    {
      id: "sholawat40",
      label: "Sholawat 40",
      title: "Sholawat 40 & Lafal Salam",
      day: null,
      start: 2, end: 15,
      note: "Empat puluh sholawat pilihan beserta lafal tasyahhud (salam), lengkap dengan sanad dan faidah keutamaannya.",
      highlights: [
        {
          h: "Faidah Sholawat #1",
          body: "Barangsiapa membaca sholawat ini, maka syafaat Nabi Shallallahu 'Alaihi wa Sallam wajib dan pasti baginya. (HR. Thabarani)"
        },
        {
          h: "Faidah Sholawat #4",
          body: "Bagi yang tidak memiliki harta untuk bersedekah, hendaknya membaca sholawat ini dalam doanya — ia akan menjadi penyuci baginya. (HR. Ibnu Hibban)"
        },
        {
          h: "Faidah Sholawat #22",
          body: "Barangsiapa membaca sholawat ini tujuh kali setiap Jumat selama tujuh Jumat berturut-turut, syafaat Nabi wajib baginya. (Al-Qaulul Badi')"
        }
      ]
    },
    {
      id: "jumat",
      label: "Hari Jumat",
      title: "Hizb Pertama — Hari Jumat",
      day: "Jumat",
      start: 16, end: 26,
      note: "Diawali Surah Al-Fatihah sebagai pujian dan doa, dilanjutkan rangkaian sholawat panjang serta doa keselamatan dunia-akhirat.",
      highlights: [
        {
          h: "Al-Fatihah sebagai doa",
          body: "Nabi Shallallahu 'Alaihi wa Sallam bersabda bahwa di dalam Surah Al-Fatihah terdapat obat penawar untuk segala penyakit — baik penyakit agama maupun dunia, lahir maupun batin. (HR. Darimi; Fadhail Qur'an)"
        },
        {
          h: "Keutamaan bersholawat",
          body: "Allah dan para malaikat-Nya bersholawat untuk Nabi. Tidak ada ibadah lain yang diperintahkan Allah dengan cara sedemikian megah selain sholawat. (QS. Al-Ahzab: 56)"
        }
      ]
    },
    {
      id: "sabtu",
      label: "Hari Sabtu",
      title: "Hizb Kedua — Hari Sabtu",
      day: "Sabtu",
      start: 27, end: 35,
      note: "Memuat Sholawat Ibrahimiyah (paling shahih menurut riwayat Bukhari) serta rangkaian doa dari Al-Qur'an: doa Nabi Zakaria, Ibrahim, dan Musa 'alaihimus salam.",
      highlights: [
        {
          h: "Sholawat Ibrahimiyah",
          body: "\"Allahumma shalli 'ala Muhammad wa 'ala aali Muhammad kama shallaita 'ala Ibrahim wa 'ala aali Ibrahim, innaka Hamidun Majid...\" — diajarkan langsung oleh Rasulullah dan disampaikan melalui Malaikat Jibril. Sholawat paling shahih dan utama. (Fadhail Darood Shareef)"
        },
        {
          h: "Doa dunia-akhirat",
          body: "\"Rabbana atina fid dunya hasanah wa fil akhirati hasanah wa qina 'adzaban nar\" — sebagian besar doa Rasulullah adalah doa ini. (HR. Bukhari & Muslim)"
        }
      ]
    },
    {
      id: "ahad",
      label: "Hari Ahad",
      title: "Hizb Ketiga — Hari Ahad",
      day: "Ahad",
      start: 36, end: 44,
      note: "Berisi doa Sayyidul Istighfar (penghulu istighfar) serta doa cahaya (nur) yang dibaca Nabi menuju masjid dan saat tahajud.",
      highlights: [
        {
          h: "Sayyidul Istighfar",
          body: "Doa istighfar paling menyeluruh. Barangsiapa membacanya di siang hari dengan yakin lalu wafat sebelum sore, atau membacanya di malam hari lalu wafat sebelum pagi, ia termasuk penghuni surga. (HR. Bukhari)"
        },
        {
          h: "Doa memohon cahaya",
          body: "\"Allahummaj'al fi qalbi nuura...\" — memohon cahaya pada hati, penglihatan, pendengaran, dan seluruh anggota tubuh sebagai bentuk hidayah dan kejelasan kebenaran. (HR. Bukhari & Muslim)"
        }
      ]
    },
    {
      id: "senin",
      label: "Hari Senin",
      title: "Hizb Keempat — Hari Senin",
      day: "Senin",
      start: 45, end: 53,
      note: "Doa maqam terpuji (Al-Maqam Al-Mahmud), doa Nabi Adam 'alaihis salam ketika diturunkan ke bumi, serta doa-doa untuk kemudahan urusan dan pelunasan utang.",
      highlights: [
        {
          h: "Doa Nabi Adam 'Alaihis Salam",
          body: "Diilhamkan Allah ke hati Nabi Adam setelah shalat dua rakaat di Ka'bah: memohon diterimanya uzur, dipenuhinya kebutuhan, dan diampuninya dosa. Allah berjanji mengabulkannya bagi siapa saja yang membacanya."
        },
        {
          h: "Doa pelunasan utang",
          body: "Diajarkan Rasulullah kepada Ali bin Abi Thalib: seandainya utang sebesar gunung Uhud sekalipun, akan terlunasi dengan izin Allah. (HR. Tirmidzi)"
        }
      ]
    },
    {
      id: "selasa",
      label: "Hari Selasa",
      title: "Hizb Kelima — Hari Selasa",
      day: "Selasa",
      start: 54, end: 60,
      note: "Doa memohon kecintaan kepada Allah melebihi segalanya, keteguhan hati di atas agama, dan husnul khatimah (akhir hayat yang baik).",
      highlights: [
        {
          h: "Doa keteguhan hati",
          body: "\"Ya muqallibal qulub, tsabbit qalbi 'ala dinik\" — Wahai Zat Yang Membolak-balikkan hati, tetapkanlah hatiku di atas agama-Mu. (HR. Tirmidzi, Nasai)"
        },
        {
          h: "Doa husnul khatimah",
          body: "Jadikanlah bagian terbaik dari umurku adalah pada akhirnya, amal terbaikku pada penutupnya, dan hari terbaik dari hari-hariku adalah hari saat aku bertemu dengan-Mu."
        }
      ]
    },
    {
      id: "rabu",
      label: "Hari Rabu",
      title: "Hizb Keenam — Hari Rabu",
      day: "Rabu",
      start: 61, end: 68,
      note: "Doa kesucian hati dari kemunafikan dan riya, permohonan maaf atas hak sesama manusia, serta adab agung mencintai Rasulullah melebihi diri sendiri.",
      highlights: [
        {
          h: "Menunaikan hak sesama",
          body: "\"...maka siapa saja mukmin yang pernah aku sakiti karena sifat kemanusiaan, jadikanlah itu baginya sebagai rahmat, pembersih, dan sarana mendekatkan diri kepada-Mu.\" (HR. Bukhari & Muslim)"
        },
        {
          h: "Kesempurnaan iman",
          body: "\"Tidaklah beriman salah seorang di antara kalian hingga aku menjadi yang lebih dicintainya daripada orang tuanya, anaknya, dan seluruh manusia.\" (HR. Bukhari & Muslim)"
        }
      ]
    },
    {
      id: "kamis",
      label: "Hari Kamis",
      title: "Hizb Ketujuh — Hari Kamis",
      day: "Kamis",
      start: 69, end: 76,
      note: "Doa mengingat kematian dan penutup hayat yang baik, doa terakhir Rasulullah, ditutup penjelasan tazkiyatun nafs (penyucian jiwa) dari Syekh Muhammad Zakariyya.",
      highlights: [
        {
          h: "Doa terakhir Rasulullah",
          body: "\"Allahummaghfir lii warhamnii wa alhiqnii bir rafiiqil a'la\" — Ya Allah, ampunilah aku, rahmatilah aku, dan pertemukanlah aku dengan Teman Yang Mahatinggi. (HR. Bukhari & Muslim)"
        },
        {
          h: "Penjelasan Tazkiyatun Nafs",
          body: "Penyucian jiwa memerlukan cinta dan persahabatan dengan guru (syekh) yang mengikuti sunah, serta perbanyak zikir. Jika belum menemukan guru yang sesuai, perbanyaklah mengingat kematian, bertobat, dan beristighfar — angan-angan panjang keduniaan akan musnah dan cinta dunia mulai keluar dari hati."
        }
      ]
    }
  ]
};
