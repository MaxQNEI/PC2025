<script>
    import { Parts } from "../../parts.js";
    import PartsDesktop from "./PartsDesktop.svelte";
    import PartsMobile from "./PartsMobile.svelte";

    let editing = false;

    let ignored = JSON.parse(localStorage.getItem("ignored") ?? "null");
    let selected = JSON.parse(localStorage.getItem("selected") ?? "null");
    let total = 0;
    let maxtotal = 0;
    let parts = null,
        _parts = null;

    let resultFx = 1;

    let saved = false;

    $: upd();

    function upd() {
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

        if (ignored === null) {
            ignored = [];
            selected = {};

            for (const { id, type, ignore, status } of parts) {
                if (!ignore && !selected[type]) {
                    selected[type] = id;
                } else if (ignore) {
                    ignored.push(id);
                }
            }

            selected = Object.values(selected);
        }

        const prevTotal = total;
        const prevMaxTotal = maxtotal;

        // Max total
        {
            maxtotal = {};

            for (const { id, type, price, status } of parts) {
                if (!ignored.includes(id)) {
                    maxtotal[type] = maxtotal[type] ?? 0;
                    maxtotal[type] = Math.max(maxtotal[type], price);
                }
            }

            maxtotal = Object.values(maxtotal).reduce((pv, cv) => pv + cv, 0);
        }

        {
            total = parts.filter(({ id }) => selected.includes(id)).reduce((pv, { price }) => pv + price, 0);
        }

        if (prevTotal !== total || prevMaxTotal !== maxtotal) {
            resultFx = resultFx === 1 ? 2 : 1;
        }

        _parts = _parts ?? parts;
        parts = _parts.filter(({ id }) => editing || selected.includes(id));

        saved = !!(localStorage.getItem("ignored") || localStorage.getItem("selected"));
    }

    function changeIgnored(id) {
        if (ignored.includes(id)) {
            ignored = ignored.filter((i) => i !== id);
        } else {
            ignored = [...ignored, id];
        }

        localStorage.setItem("ignored", JSON.stringify(ignored));
        localStorage.setItem("selected", JSON.stringify(selected));
    }

    function changeSelected(type, id) {
        if (selected.includes(id)) {
            selected = selected.filter((_id) => _id !== id);
        } else {
            for (const { id: _id, type: _type } of parts) {
                if (_type !== type) {
                    continue;
                }

                selected = selected.filter((__id) => __id !== _id);
            }

            selected = [...selected, id];
        }

        localStorage.setItem("ignored", JSON.stringify(ignored));
        localStorage.setItem("selected", JSON.stringify(selected));
    }

    function editingChange(newEditing) {
        setTimeout(() => (editing = !!newEditing), 100);
    }

    function clear() {
        localStorage.removeItem("ignored");
        localStorage.removeItem("selected");

        ignored = selected = null;
        total = maxtotal = 0;

        upd();
    }

    $: {
        console.clear();
        console.log(
            _parts
                .filter(({ id }) => selected.includes(id))
                .map(({ name }, index) => `#${index + 1}. ${name}`)
                .join("\n"),
        );
    }
</script>

<div class="parts">
    {#each [PartsDesktop, PartsMobile] as component}
        <svelte:component
            this={component}
            {changeIgnored}
            {changeSelected}
            {editingChange}
            {clear}
            {editing}
            {ignored}
            {selected}
            {parts}
            {saved}
        />
    {/each}

    <div class="result" class:fx1={resultFx === 1} class:fx2={resultFx === 2}>
        <span>Total:</span>
        <span class="total">{total}₴</span>
        <span>{total < maxtotal ? "<" : total > maxtotal ? ">" : "="}</span>
        <span class="maxtotal">{maxtotal}₴</span>
        <span>&emsp;</span>
        <span class:maxtotal={total > maxtotal} class:total={total < maxtotal}>~{maxtotal - total}</span>
    </div>
</div>

<style>
    .parts {
        display: grid;
        grid-template-rows: 1fr max-content;

        height: 100dvh;
    }

    .total,
    .maxtotal {
        font-weight: bold;
        text-align: right;
    }

    .result {
        padding: 20px;
        font-size: x-large;
        text-align: right;
    }

    .total {
        color: yellowgreen;
    }

    .maxtotal {
        color: tomato;
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
        .result {
            font-size: x-large;
            text-align: center;
        }
    }
</style>
