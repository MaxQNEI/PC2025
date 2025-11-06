function ToId(data) {
    const digits = JSON.stringify(data).replace(/([^\d])/g, (m, p1) => p1.charCodeAt(0));
    let str = [];

    const ps = 128;
    for (let i = 0, f, t; i < digits.length; i += ps) {
        f = i;
        t = i + ps;
        str.push(parseInt(digits.slice(f, t)).toString(36));
    }

    str = str.join("");

    return str;
}

ids = [];
const Parts = [
    {
        type: "cpu",
        image: "00",
        name: "AMD Ryzen 7 7700 (100-000000592) sAM5 Tray, 3,8 (5,3 GHz Turbo), 32MB, Without Cooler",
        link: "https://hard.rozetka.com.ua/ua/433539365/p433539365/",
        seller: "rozetka",
        costs: [
            {
                date: "2025-06-01",
                normal: 10160,
                discount: 8570,
            },

            {
                date: "2025-06-03",
                normal: 10270,
                discount: 8470,
            },
        ],
    },

    {
        type: "cpu",
        image: "01",
        name: "AMD Ryzen 7 7700 3.8GHz/32MB (100-100000592BOX) sAM5 BOX",
        link: "https://hard.rozetka.com.ua/ua/amd-100-100000592box/p364755915/",
        seller: "rozetka",
        costs: [
            {
                date: "2025-06-01",
                normal: 15419,
                discount: 13299,
            },
        ],
        ignore: true,
    },

    {
        type: "cpu",
        image: "02",
        name: "AMD Ryzen 7 7700 (100-000000592)",
        link: "https://luckylink.kiev.ua/amd-ryzen-7-7700-100-000000592/",
        seller: "luckylink",
        costs: [
            {
                date: "2025-06-03",
                normal: 10299,
                discount: 8299,
            },
        ],
        ignore: true,
    },

    {
        type: "cpu",
        image: "02",
        name: "AMD Ryzen 7 7700 (100-000000592)",
        link: "https://tehno-mart.com.ua/amd-ryzen-7-7700-100-000000592/?utm_source=E-katalog&utm_medium=cpc",
        seller: "tehnomart",
        costs: [
            {
                date: "2025-06-03",
                normal: 8691,
                discount: 8199,
            },
        ],
        ignore: true,
    },

    {
        type: "motherboard",
        image: "00",
        name: "MSI PRO B650-S Wi-Fi (sAM5, AMD B650, PCI-Ex16)",
        link: "https://hard.rozetka.com.ua/ua/msi-pro-b650-s-wifi/p407082552/",
        seller: "rozetka",
        costs: [
            {
                date: "2025-06-01",
                normal: 7266,
                discount: 6499,
            },
        ],
        ignore: true,
    },

    {
        type: "motherboard",
        image: "01",
        name: "Gigabyte B850 GAMING WIFI6 (sAM5, AMD B850, PCI-Ex16)",
        link: "https://hard.rozetka.com.ua/ua/gigabyte-b850-gaming-wifi6/p478549269/",
        seller: "rozetka",
        costs: [
            {
                date: "2025-06-06",
                normal: 8889,
                discount: 8299,
            },
        ],
    },

    {
        type: "gpu",
        image: "00",
        name: "Gigabyte PCI-Ex GeForce RTX 5070 Ti Windforce SFF 16GB GDDR7 (256bit) (2452/28000) (HDMI, 3 x DisplayPort) (GV-N507TWF3-16GD)",
        link: "https://hard.rozetka.com.ua/ua/gigabyte-gv-n507twf3-16gd/p512016864/",
        seller: "rozetka",
        costs: [
            {
                date: "2025-06-01",
                normal: 43999,
                discount: 43019,
            },
        ],
    },

    {
        type: "gpu",
        image: "01",
        name: "Gigabyte GeForce RTX 5070 Ti WINDFORCE SFF 16384MB (GV-N507TWF3-16GD)",
        link: "https://telemart.ua/ua/products/gigabyte-geforce-rtx-5070-ti-windforce-sff-16384mb-gv-n507twf3-16gd/",
        seller: "telemart",
        costs: [
            {
                date: "2025-06-01",
                normal: 45295,
                discount: 42999,
            },
        ],
    },

    {
        type: "gpu",
        image: "02",
        name: "MSI PCI-Ex GeForce RTX 5080 SHADOW 3X OC 16GB GDDR7 (256bit) (2655/30000) (HDMI, 3 x DisplayPort) (RTX 5080 16G SHADOW 3X OC)",
        link: "https://hard.rozetka.com.ua/ua/msi-rtx-5080-16g-shadow-3x-oc/p490840829/",
        seller: "rozetka",
        costs: [
            {
                date: "2025-06-03",
                normal: 65999,
                discount: 55499,
            },
        ],
        ignore: true,
    },

    {
        type: "ram",
        image: "00",
        name: "DDR5 32GB (2x16GB) 5200 MHz Beast AM5 Black Kingston Fury (ex.HyperX) (KF552C36BBEK2-32)",
        link: "https://enko.com.ua/shop/komplektuyuschie-pk/operativnaya-pamyat/ddr5/432096-modul-pamyat-dlya-komputera-ddr5-32gb-2x16gb-5200-mhz-beas/",
        seller: "enko",
        costs: [
            {
                date: "2025-06-01",
                normal: 4399,
                discount: 3938,
            },
        ],
    },

    {
        type: "ram",
        image: "00",
        name: "Kingston FURY DDR5-5200 32768MB PC5-41600 (Kit of 2x16384) Beast AM5 Black (KF552C36BBEK2-32)",
        link: "https://hard.rozetka.com.ua/ua/kingston-fury-exhyperx-kf552c36bbek2-32/p356031282/",
        seller: "rozetka",
        costs: [
            {
                date: "2025-06-01",
                normal: 4959,
                discount: 4299,
            },
        ],
    },

    {
        type: "psu",
        image: "00",
        name: "Gigabyte GOLD 750W ATX 3.0 (GP-UD750GM PG5)",
        link: "https://hard.rozetka.com.ua/ua/gigabyte-gp-ud750gm-pg5/p393683826/",
        seller: "rozetka",
        costs: [
            {
                date: "2025-06-01",
                normal: 5499,
                discount: 4599,
            },
        ],
    },

    {
        type: "psu",
        image: "01",
        name: "Gigabyte UD1000GM PG5 power supply unit 1000 W 20+4 pin ATX ATX Black (GP-UD1000GM PG5 Rev 2.0)",
        link: "https://hard.rozetka.com.ua/ua/383802378/p383802378/",
        seller: "rozetka-eu",
        costs: [
            {
                date: "2025-06-03",
                normal: 6345,
                discount: 5617,
                delivery: 179,
                europe: true,
            },
        ],
        ignore: true,
    },

    {
        type: "psu",
        image: "02",
        name: "MSI MAG A850GL PCIE5 850W (306-7ZP8A11-CE0)",
        link: "https://hard.rozetka.com.ua/ua/msi-306-7zp8a11-ce0/p400641204/",
        seller: "rozetka-eu",
        costs: [
            {
                date: "2025-06-03",
                normal: 5892,
                discount: 5039,
                delivery: 179,
                europe: true,
            },
        ],
        ignore: true,
    },

    {
        type: "psu",
        image: "03",
        name: "Corsair RM1000x Shift PCIE5 1000W (CP-9020253-EU)",
        link: "https://hard.rozetka.com.ua/ua/corsair-cp-9020253-eu/p377616381/",
        seller: "rozetka",
        costs: [
            {
                date: "2025-06-03",
                normal: 11829,
            },
        ],
        ignore: true,
    },

    {
        type: "cooler",
        image: "00",
        name: "be quiet! Dark Rock Pro 5 (BK036)",
        link: "https://hard.rozetka.com.ua/ua/be-quiet-bk036/p404068188/",
        seller: "rozetka",
        costs: [
            {
                date: "2025-06-01",
                normal: 4649,
            },
        ],
        ignore: true,
    },

    {
        type: "cooler",
        image: "01",
        name: "DeepCool AK620 Zero Dark Black",
        link: "https://hard.rozetka.com.ua/ua/deepcool-ak620-zero-dark/p359852886/",
        seller: "rozetka",
        costs: [
            {
                date: "2025-06-01",
                normal: 3169,
            },
        ],
        ignore: true,
    },

    {
        type: "cooler",
        image: "02",
        name: "MSI Mag Coreliquid A13 360 Black",
        link: "https://hard.rozetka.com.ua/ua/msi-mag-coreliquid-a13-360/p465181079/",
        seller: "rozetka",
        costs: [
            {
                date: "2025-06-07",
                normal: 4399,
            },
        ],
    },

    {
        type: "case",
        image: "00",
        name: "be quiet! Silent Base 601 Black (BG026)",
        link: "https://hard.rozetka.com.ua/ua/be-quiet-4260052187111/p407609370/",
        seller: "rozetka-eu",
        costs: [
            {
                date: "2025-06-01",
                normal: 6680,
                delivery: 509,
                europe: true,
            },
        ],
        ignore: true,
        // status: "ordered",
    },

    {
        type: "thermal-paste",
        image: "00",
        name: "Thermal Grizzly Kryonaut Extreme, 2 г, шприц, 14.2 Вт/мК (TG-KE-002-R)",
        link: "https://exe.ua/product/p382648/",
        seller: "exe",
        costs: [
            {
                date: "2025-06-01",
                normal: 630,
            },
        ],
        ignore: true,
    },

    {
        type: "thermal-paste",
        image: "00",
        name: "Thermal Grizzly Kryonaut Extreme 2g (TG-KE-002-R)",
        link: "https://hard.rozetka.com.ua/ua/358886094/p358886094/",
        seller: "rozetka",
        costs: [
            {
                date: "2025-06-01",
                normal: 695,
            },
        ],
        ignore: true,
    },

    {
        type: "thermal-paste",
        image: "01",
        name: "Thermal Grizzly Kryonaut 1g (TG-K-001-RS)",
        link: "https://hard.rozetka.com.ua/ua/358886079/p358886079/",
        seller: "rozetka",
        costs: [
            {
                date: "2025-06-01",
                normal: 258,
            },
        ],
        ignore: true,
    },

    {
        type: "ssd",
        image: "00",
        name: "c:ShareHubMotorolaPicturesScreenshotsScreenshot_20251106-184012.Privat24.png",
        link: "https://hard.rozetka.com.ua/ua/samsung-mz-vap4t0bw/p501161474/",
        seller: "rozetka",
        costs: [
            {
                date: "2025-07-18",
                normal: 23203,
            },
        ],
    },
].map((p) => ({
    ...p,
    id: `${p.name}-${p.seller}`,
    costs: p.costs.sort(({ date: a }, { date: b }) => (a === b ? 0 : a > b ? 1 : -1)),
    cost: p.costs.sort(({ date: a }, { date: b }) => (a === b ? 0 : a > b ? -1 : 11))[0],
}));

export { Parts };
