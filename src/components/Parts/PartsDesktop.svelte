<script>
    import Strikethrough from "../Strikethrough.svelte";

    export let changeIgnored = () => {};
    export let changeSelected = () => {};
    export let editing = true;
    export let ignored = null;
    export let selected = null;
    export let parts = null;

    let show = { show: false };
</script>

<div class="only-desktop list-scroll" class:selected-only={!editing}>
    <div class="list">
        <!-- TOOLS -->
        <div class="tools">
            <label>
                <input
                    type="checkbox"
                    checked={editing}
                    on:change={(event) => {
                        event.preventDefault();
                        editing = !editing;
                    }}
                />

                <span>Editing</span>
            </label>
        </div>

        <!-- HEADER -->
        {#if editing}
            <div class="header check">❌</div>
        {/if}

        {#if editing}
            <div class="header check">✅</div>
        {/if}

        <div class="header">IMAGE</div>
        <div class="header">INFO</div>
        <div class="header">LINK</div>
        <div class="header">COST</div>

        <!-- LIST -->
        {#each parts.filter(({ id }) => editing || selected.includes(id)) as { id, type, image, name, link: href, seller, cost, price, status }}
            {#if editing}
                <label
                    class="check ignore"
                    class:selected={selected.includes(id)}
                    data-type={type}
                    disabled={status === "ordered"}
                >
                    <Strikethrough {status} />

                    <input
                        type="checkbox"
                        checked={ignored.includes(id)}
                        on:change={(event) => {
                            event.preventDefault();
                            changeIgnored(id);
                        }}
                        disabled={status === "ordered"}
                    />
                </label>
            {/if}

            {#if editing}
                <label
                    class="check selected"
                    class:selected={selected.includes(id)}
                    data-type={type}
                    disabled={status === "ordered"}
                >
                    <Strikethrough {status} />

                    <input
                        type="checkbox"
                        checked={selected.includes(id)}
                        on:change={(event) => {
                            event.preventDefault();
                            changeSelected(type, id);
                        }}
                        disabled={status === "ordered"}
                    />
                </label>
            {/if}

            <div
                class="image"
                class:selected={selected.includes(id)}
                data-type={type}
                on:pointerover={() => (show = { ...show, active: true, image: `assets/${type}-${image}.png` })}
                on:pointerleave={() => (show = { ...show, active: false })}
            >
                <Strikethrough {status} />

                <div class="img-wrap">
                    <img src={`assets/${type}-${image}.png`} alt="product" />
                </div>
            </div>

            <div class="info" class:selected={selected.includes(id)} data-type={type}>
                <Strikethrough {status} />

                <div class="bgimg" style="background-image: url(assets/{type}-{image}.png);"></div>

                <h3>
                    <b>{type.toUpperCase()}</b>
                    {name}
                </h3>
            </div>

            <div class="link" class:selected={selected.includes(id)} data-type={type}>
                <Strikethrough {status} />

                <a {href} target="_blank">
                    <img class="seller" src={`assets/seller-${seller}.png`} alt={seller} />
                </a>
            </div>

            <div class="cost" class:selected={selected.includes(id)} data-type={type}>
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

<div class="show" class:active={show.active}>
    {#if show.image}
        <!-- svelte-ignore a11y_missing_attribute -->
        <img src={show.image} />
    {/if}
</div>

<style>
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

    .list-scroll.selected-only .list {
        grid-template-columns: max-content 1fr max-content max-content;
    }

    .list > * {
        position: relative;
        min-height: 60px;

        transition: all 500ms ease;
    }

    .tools {
        grid-column-start: 1;
        grid-column-end: 7;

        min-height: unset;
        padding: 10px;
        background-color: #cccccc;
    }

    .list-scroll.selected-only .tools {
        grid-column-end: 5;
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

    .cost > * {
        font-weight: bold;
        text-align: right;
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

    .list > *:not(.tools, .header, .strikethrough) {
        border-bottom-width: 2px;
        border-bottom-style: solid;
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
    }
</style>
