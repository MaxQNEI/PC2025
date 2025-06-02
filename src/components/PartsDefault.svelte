<script>
    import { Parts } from "../parts.js";
    import Strikethrough from "./Strikethrough.svelte";

    let ignored = null;
    let selected = null;
    let total = 0;
    let maxtotal = 0;
    let show = { show: false };
    let parts = null;

    let resultFx = 1;

    $: {
        // Defaults
        if (parts === null) {
            parts = Parts.map((p) => ({
                ...p,
                price:
                    (p.cost.discount ? Math.min(p.cost.normal, p.cost.discount) : p.cost.normal) +
                    (p.cost.delivery ?? 0),
            }))
                .sort(({ price: a }, { price: b }) => (a === b ? 0 : a > b ? 1 : -1))
                .sort(({ type: a }, { type: b }) => (a === b ? 0 : a > b ? 1 : -1));
        }

        if (selected === null) {
            ignored = [];
            selected = {};

            let index = 0;
            for (const { type, ignore, status } of parts) {
                if (status === "ordered") {
                } else if (!ignore && !selected[type]) {
                    selected[type] = index;
                } else if (ignore) {
                    ignored.push(index);
                }

                index++;
            }
        }

        const prevTotal = total;
        const prevMaxTotal = maxtotal;

        // Max total
        {
            maxtotal = {};

            let index = 0;
            for (const { type, price, status } of parts) {
                if (status === "ordered") {
                } else if (!ignored.includes(index)) {
                    maxtotal[type] = maxtotal[type] ?? 0;
                    maxtotal[type] = Math.max(maxtotal[type], price);
                }

                index++;
            }

            maxtotal = Object.values(maxtotal).reduce((pv, cv) => pv + cv, 0);
        }

        {
            const selectedIndexes = Object.values(selected);
            total = parts.filter((_, i) => selectedIndexes.includes(i)).reduce((pv, { price }) => pv + price, 0);
        }

        if (prevTotal !== total || prevMaxTotal !== maxtotal) {
            resultFx = resultFx === 1 ? 2 : 1;
        }
    }

    function changeIgnored(index) {
        if (ignored.includes(index)) {
            ignored = ignored.filter((i) => i !== index);
        } else {
            ignored = [...ignored, index];
        }
    }

    function changeSelected(type, index) {
        selected[type] = selected[type] === index ? null : index;
    }

    /* function Link2Domain(link) {
        const url = new URL(link);
        return url.host;
    } */
</script>

<div class="parts">
    <div class="list-scroll">
        <div class="list">
            <!-- HEADER -->
            <div class="header check">❌</div>
            <div class="header check">✅</div>
            <div class="header">IMAGE</div>
            <div class="header">INFO</div>
            <div class="header">LINK</div>
            <div class="header">COST</div>

            <!-- LIST -->
            {#each parts as { type, image, name, link: href, seller, cost, price, status }, index}
                <label
                    class="check ignore"
                    class:selected={selected[type] === index}
                    data-type={type}
                    disabled={status === "ordered"}
                >
                    <Strikethrough {status} />

                    <input
                        type="checkbox"
                        checked={ignored.includes(index)}
                        on:change={() => changeIgnored(index)}
                        disabled={status === "ordered"}
                    />
                </label>

                <label
                    class="check selected"
                    class:selected={selected[type] === index}
                    data-type={type}
                    disabled={status === "ordered"}
                >
                    <Strikethrough {status} />

                    <input
                        type="checkbox"
                        checked={selected[type] === index}
                        on:change={() => changeSelected(type, index)}
                        disabled={status === "ordered"}
                    />
                </label>

                <div
                    class="image"
                    class:selected={selected[type] === index}
                    data-type={type}
                    on:pointerover={() => (show = { ...show, active: true, image: `assets/${type}-${image}.png` })}
                    on:pointerleave={() => (show = { ...show, active: false })}
                >
                    <Strikethrough {status} />

                    <div class="img-wrap">
                        <img src={`assets/${type}-${image}.png`} alt="product" />
                    </div>
                </div>

                <div class="info" class:selected={selected[type] === index} data-type={type}>
                    <Strikethrough {status} />

                    <div class="bgimg" style="background-image: url(assets/{type}-{image}.png);"></div>

                    <h3>
                        <b>{type.toUpperCase()}</b>
                        {name}
                    </h3>
                </div>

                <div class="link" class:selected={selected[type] === index} data-type={type}>
                    <Strikethrough {status} />

                    <a {href} target="_blank">
                        <img class="seller" src={`assets/seller-${seller}.png`} alt={seller} />
                    </a>
                </div>

                <div class="cost" class:selected={selected[type] === index} data-type={type}>
                    <Strikethrough {status} />

                    {#if cost.discount}
                        <div class="cost-red">{cost.normal}₴</div>
                        <div class="cost-green" class:europe={cost.europe}>{price}₴</div>
                    {:else}
                        <div class="cost-green" class:europe={cost.europe}>{price}₴</div>
                    {/if}
                </div>
            {/each}
        </div>
    </div>

    <div class="result" class:fx1={resultFx === 1} class:fx2={resultFx === 2}>
        <span>Total:</span>
        <span class="total">{total}₴</span>
        <span>{total < maxtotal ? "<" : total > maxtotal ? ">" : "="}</span>
        <span class="maxtotal">{maxtotal}₴</span>
        <span>&emsp;</span>
        <span class:maxtotal={total > maxtotal} class:total={total < maxtotal}>~{maxtotal - total}</span>
    </div>
</div>

{#if true}
    <div class="show" class:active={show.active}>
        {#if show.image}
            <!-- svelte-ignore a11y_missing_attribute -->
            <img src={show.image} />
        {/if}
    </div>
{/if}

<style>
    .parts {
        display: grid;
        grid-template-rows: 1fr max-content;

        height: 100dvh;
    }

    .list-scroll {
        overflow: auto;
        padding-bottom: 60px;
    }

    .list {
        display: grid;
        grid-template-columns: max-content max-content max-content 1fr max-content max-content;
        align-content: flex-start;
        grid-row-gap: 4px;
        padding: 20px;
    }

    .list > * {
        position: relative;
        min-height: 60px;

        transition: all 500ms ease;
    }

    .header {
        position: sticky;
        top: 0;
        z-index: 1;
        background-color: #ffffff;
        width: 100%;

        /* justify-items: center; */
        align-content: center;
        text-align: center;

        font-weight: bold;
    }

    .check {
        display: grid;
        justify-content: center;
        align-items: center;

        padding: 0 20px;

        cursor: pointer;
    }

    .image {
        display: grid;
        justify-content: center;
        padding: 4px;
    }

    .image .img-wrap {
        align-self: center;
        padding: 4px;
        border-radius: 16px;
        background-color: #ffffff;
    }

    .image img {
        width: unset;
        height: 100%;
        max-height: calc(60px - 8px);
    }

    .info {
        position: relative;
        display: grid;
        align-items: center;
    }

    .bgimg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: transparent center left / 400px no-repeat;
        filter: blur(2px);
        opacity: 0.1;
    }

    .seller {
        width: 100%;
        max-height: 30px;
    }

    .result {
        padding: 20px;
        background-color: #ffffff;
        filter: drop-shadow(0 0 16px #999999);
    }

    .link {
        display: grid;
        justify-content: flex-start;
        align-content: center;

        padding: 0 20px;
    }

    .cost {
        display: grid;
        justify-content: flex-end;
        align-content: center;
        padding-right: 20px;
        font-weight: bold;
    }

    .cost > *,
    .total,
    .maxtotal {
        font-weight: bold;
        text-align: right;
    }

    .result {
        font-size: x-large;
        text-align: right;
    }

    .total {
        color: yellowgreen;
    }

    .maxtotal {
        color: tomato;
    }

    .cost-green {
        font-size: x-large;
        color: yellowgreen;
    }
    .cost-green.europe {
        color: #666666;
    }

    .cost-red {
        font-size: large;
        text-decoration: line-through;
        text-decoration-thickness: 2px;
        color: tomato;
    }

    .show {
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        width: 100dvw;
        height: 100dvh;

        display: grid;
        place-items: center;
        background-color: rgba(255, 255, 255, 0.5);
        backdrop-filter: blur(2px);
        pointer-events: none;

        transition: all 500ms ease;
    }
    .show img {
        width: auto;
        max-width: 90dvw;
        max-height: 90dvh;
    }
    .show:not(.active) {
        transform: scale(0.9);
        opacity: 0;
    }

    /*  */
    [data-type]:not(.selected) {
        filter: grayscale(0.5) opacity(0.5);
    }

    [data-type="case"] {
        border-bottom-color: rgba(100, 100, 100);
        background-color: rgba(100, 100, 100, 0.1);
    }

    [data-type="cooler"] {
        border-bottom-color: rgba(0, 150, 200);
        background-color: rgba(0, 150, 200, 0.1);
    }

    [data-type="cpu"] {
        border-bottom-color: rgba(200, 100, 0);
        background-color: rgba(200, 100, 0, 0.1);
    }

    [data-type="motherboard"] {
        border-bottom-color: rgba(50, 50, 150);
        background-color: rgba(50, 50, 150, 0.1);
    }

    [data-type="psu"] {
        border-bottom-color: rgba(80, 80, 80);
        background-color: rgba(80, 80, 80, 0.1);
    }

    [data-type="ram"] {
        border-bottom-color: rgba(0, 200, 100);
        background-color: rgba(0, 200, 100, 0.1);
    }

    [data-type="thermal-paste"] {
        border-bottom-color: rgba(160, 160, 160);
        background-color: rgba(160, 160, 160, 0.1);
    }

    [data-type="gpu"] {
        border-bottom-color: rgba(150, 0, 200);
        background-color: rgba(150, 0, 200, 0.1);
    }

    .list > *:not(.header, .strikethrough) {
        border-bottom-width: 2px;
        border-bottom-style: solid;
    }

    .result.fx1 {
        animation: ResultFX1 1000ms ease 1;
    }

    .result.fx2 {
        animation: ResultFX2 1000ms ease 1;
    }

    @keyframes ResultFX1 {
        0% {
            background-color: rgba(255, 99, 71, 0.2);
        }
        100% {
            background-color: #ffffff;
        }
    }

    @keyframes ResultFX2 {
        0% {
            background-color: rgba(255, 99, 71, 0.2);
        }
        100% {
            background-color: #ffffff;
        }
    }

    @media (max-width: 599.95px) {
        .list {
            grid-template-columns: 1fr 1fr;
            padding: 0;
        }

        .header,
        .image {
            display: none;
        }

        .list > * {
            min-height: unset;
        }

        .check {
            padding: 8px;
        }

        .info {
            grid-column-start: 1;
            grid-column-end: 3;

            padding: 10px;
            text-shadow:
                0 0 4px #ffffff,
                0 0 2px #000000;
        }

        .bgimg {
            background-size: cover;
            opacity: 0.2;
            filter: blur(0);
        }

        .link,
        .cost {
            margin-bottom: 20px;
        }

        .check {
            border-top: 2px solid #000000;
        }

        .link,
        .cost {
            border-bottom: 2px solid #000000;
        }

        .result {
            text-align: center;
        }
    }
</style>
