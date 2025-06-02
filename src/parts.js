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

const Parts = [
    {
        type: "cpu",
        image: "00",
        name: "AMD Ryzen 7 7700 (100-000000592) sAM5 Tray, 3,8 (5,3 GHz Turbo), 32MB, Without Cooler",
        link: "https://hard.rozetka.com.ua/ua/433539365/p433539365/",
        seller: "rozetka",
        cost: {
            normal: 10160,
            discount: 8570,
        },
    },

    {
        type: "cpu",
        image: "01",
        name: "AMD Ryzen 7 7700 3.8GHz/32MB (100-100000592BOX) sAM5 BOX",
        link: "https://hard.rozetka.com.ua/ua/amd-100-100000592box/p364755915/",
        seller: "rozetka",
        cost: {
            normal: 15419,
            discount: 13299,
        },
        ignore: true,
    },

    {
        type: "motherboard",
        image: "00",
        name: "MSI PRO B650-S Wi-Fi (sAM5, AMD B650, PCI-Ex16)",
        link: "https://hard.rozetka.com.ua/ua/msi-pro-b650-s-wifi/p407082552/",
        seller: "rozetka",
        cost: {
            normal: 7266,
            discount: 6499,
        },
    },

    {
        type: "gpu",
        image: "00",
        name: "Gigabyte PCI-Ex GeForce RTX 5070 Ti Windforce SFF 16GB GDDR7 (256bit) (2452/28000) (HDMI, 3 x DisplayPort) (GV-N507TWF3-16GD)",
        link: "https://hard.rozetka.com.ua/ua/gigabyte-gv-n507twf3-16gd/p512016864/",
        seller: "rozetka",
        cost: {
            normal: 43999,
            discount: 43019,
        },
    },

    {
        type: "gpu",
        image: "01",
        name: "Gigabyte GeForce RTX 5070 Ti WINDFORCE SFF 16384MB (GV-N507TWF3-16GD)",
        link: "https://telemart.ua/ua/products/gigabyte-geforce-rtx-5070-ti-windforce-sff-16384mb-gv-n507twf3-16gd/",
        seller: "telemart",
        cost: {
            normal: 45295,
            discount: 42999,
        },
    },

    {
        type: "ram",
        image: "00",
        name: "DDR5 32GB (2x16GB) 5200 MHz Beast AM5 Black Kingston Fury (ex.HyperX) (KF552C36BBEK2-32)",
        link: "https://enko.com.ua/shop/komplektuyuschie-pk/operativnaya-pamyat/ddr5/432096-modul-pamyat-dlya-komputera-ddr5-32gb-2x16gb-5200-mhz-beas/",
        seller: "enko",
        cost: {
            normal: 4399,
            discount: 3938,
        },
    },

    {
        type: "ram",
        image: "00",
        name: "Kingston FURY DDR5-5200 32768MB PC5-41600 (Kit of 2x16384) Beast AM5 Black (KF552C36BBEK2-32)",
        link: "https://hard.rozetka.com.ua/ua/kingston-fury-exhyperx-kf552c36bbek2-32/p356031282/",
        seller: "rozetka",
        cost: {
            normal: 4959,
            discount: 4299,
        },
    },

    {
        type: "psu",
        image: "00",
        name: "Gigabyte GOLD 750W ATX 3.0 (GP-UD750GM PG5)",
        link: "https://hard.rozetka.com.ua/ua/gigabyte-gp-ud750gm-pg5/p393683826/",
        seller: "rozetka",
        cost: {
            normal: 5499,
            discount: 4599,
        },
    },

    {
        type: "cooler",
        image: "00",
        name: "be quiet! Dark Rock Pro 5 (BK036)",
        link: "https://hard.rozetka.com.ua/ua/be-quiet-bk036/p404068188/",
        seller: "rozetka",
        cost: {
            normal: 4649,
        },
    },

    {
        type: "cooler",
        image: "01",
        name: "DeepCool AK620 Zero Dark Black",
        link: "https://hard.rozetka.com.ua/ua/deepcool-ak620-zero-dark/p359852886/",
        seller: "rozetka",
        cost: {
            normal: 3169,
        },
        ignore: true,
    },

    {
        type: "case",
        image: "00",
        name: "be quiet! Silent Base 601 Black (BG026)",
        link: "https://hard.rozetka.com.ua/ua/be-quiet-4260052187111/p407609370/",
        seller: "rozetka-eu",
        cost: {
            normal: 6680,
            delivery: 509,
            europe: true,
        },
        ignore: true,
        status: "ordered",
    },

    {
        type: "thermal-paste",
        image: "00",
        name: "Thermal Grizzly Kryonaut Extreme, 2 г, шприц, 14.2 Вт/мК (TG-KE-002-R)",
        link: "https://exe.ua/product/p382648/",
        seller: "exe",
        cost: {
            normal: 630,
        },
    },

    {
        type: "thermal-paste",
        image: "00",
        name: "Thermal Grizzly Kryonaut Extreme 2g (TG-KE-002-R)",
        link: "https://hard.rozetka.com.ua/ua/358886094/p358886094/",
        seller: "rozetka",
        cost: {
            normal: 695,
        },
    },

    {
        type: "thermal-paste",
        image: "01",
        name: "Thermal Grizzly Kryonaut 1g (TG-K-001-RS)",
        link: "https://hard.rozetka.com.ua/ua/358886079/p358886079/",
        seller: "rozetka",
        cost: {
            normal: 258,
        },
    },
].map((p) => ({ ...p, id: ToId(p) }));

export { Parts };
