<script>
    import { onDestroy, onMount } from "svelte";
    import Strikethrough from "../Strikethrough.svelte";

    export let changeIgnored = () => {};
    export let changeSelected = () => {};
    export let editingChange = (editing) => {};
    export let clear = () => {};
    export let editing = false;
    export let ignored = [];
    export let selected = [];
    export let parts = [];
    export let saved = false;

    let current = 0;

    let slider = {
        down: null,
        start: [],
        xPrev: "-100%",
        xCurrent: 0,
        xNext: "100%",
    };

    onMount(() => {
        addEventListener("scroll", onScroll);
        addEventListener("touchmove", onPointerMove);
        addEventListener("touchend", onPointerUp);
    });

    onDestroy(() => {
        addEventListener("scroll", onScroll);
        removeEventListener("touchmove", onPointerMove);
        removeEventListener("touchend", onPointerUp);
    });

    function onScroll(event) {
        if (!slider.down) {
            return;
        }

        event.preventDefault();
    }

    function onPointerDown(event) {
        if (slider.down) {
            return;
        }

        slider = {
            ...slider,
            down: true,
            start: [event.touches[0].clientX, event.touches[0].clientY],
            end: 0,
            xPrev: `-100%`,
            xCurrent: `0`,
            xNext: `100%`,
        };
    }

    function onPointerMove(event) {
        if (!slider.down) {
            return;
        }

        const end = event.touches[0].clientX - slider.start[0];

        slider = {
            ...slider,
            end,
            xPrev: `calc(-100% + ${end}px)`,
            xCurrent: `${end}px`,
            xNext: `calc(100% + ${end}px)`,
        };
    }

    function onPointerUp(event) {
        if (!slider.down) {
            return;
        }

        const a = innerWidth / 6;

        if (slider.end < -a) {
            current = Math.min(current + 1, parts.length - 1);
        } else if (slider.end > a) {
            current = Math.max(current - 1, 0);
        }

        slider = {
            ...slider,
            down: false,
            xPrev: 0,
            xCurrent: 0,
            xNext: 0,
        };
    }

    function onContextMenu(event) {
        if (!slider.down) {
            return;
        }

        event.preventDefault();
    }

    function styleTransform(index, current, slider) {
        if (!slider.down) {
            return "";
        }

        if (index === current - 1) {
            return `transform: translate(${slider.xPrev}) scale(0.9);`;
        } else if (index === current) {
            return `transform: translate(${slider.xCurrent});`;
        } else if (index === current + 1) {
            return `transform: translate(${slider.xNext}) scale(0.9);`;
        }

        return "";
    }
</script>

<div class="only-mobile list-scroll">
    <div class="tools">
        <button type="button" class:gray={editing} class:green={!editing} ontouchend={() => editingChange(!editing)}>
            {editing ? "SELECTING" : "CART"}
        </button>
    </div>

    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="list" ontouchstart={onPointerDown} oncontextmenu={onContextMenu}>
        {#each parts as { id, type, image, name, link: href, seller, cost, price, status }, index}
            <div
                class="cart"
                class:selected={selected.includes(id)}
                class:ordered={status === "ordered"}
                class:slide-prev={index < current}
                class:slide-current={index === current}
                class:slide-next={index > current}
                data-type={type}
                style={styleTransform(index, current, slider)}
            >
                <Strikethrough {status} />

                <div class="image">
                    <img src={`assets/${type}-${image}.png`} alt="product" />
                </div>

                <h2 class="name">
                    <b>{type.toUpperCase()}</b>
                    {name}
                </h2>

                <div></div>

                <a class="shop-cost" {href} target="_blank">
                    <div class="shop">
                        <img class="seller" src={`assets/seller-${seller}.png`} alt={seller} />
                    </div>

                    <div class="cost">
                        {#if cost.discount}
                            <div class="cost-red">{cost.normal}₴</div>
                            <div class="cost-green" class:europe={cost.europe}>{price}₴</div>
                        {:else}
                            <div class="cost-green" class:europe={cost.europe}>{price}₴</div>
                        {/if}
                    </div>
                </a>

                <div class="actions">
                    <button type="button" class:gray={!ignored.includes(id)} ontouchend={() => changeIgnored(id)}>
                        IGNORE
                    </button>

                    <button
                        type="button"
                        class:gray={!selected.includes(id)}
                        ontouchend={() => changeSelected(type, id)}
                    >
                        CART
                    </button>
                </div>
            </div>
        {/each}

        <div class="hint swipe" class:hide={slider.down !== null}>
            <h2>&LeftArrow; SWIPE &RightArrow;</h2>
        </div>
    </div>
</div>

<style>
    .list-scroll {
        display: grid;
        grid-template-rows: max-content 1fr max-content;
        overflow: hidden;
    }

    .tools {
        padding: 20px;
        padding-bottom: 0;
    }

    .list {
        position: relative;
    }

    .cart {
        position: absolute;
        top: 20px;
        left: 20px;
        right: 20px;
        bottom: 20px;

        display: grid;
        grid-template-rows: max-content max-content 1fr max-content;
        grid-gap: 20px;
        justify-content: center;
        align-content: flex-start;

        padding: 10px;
        border-radius: 20px;
        background-color: rgba(47, 79, 79, 0.2);

        transition: 100ms ease;
    }

    .cart.ordered > * {
        filter: blur(2px) grayscale(1);
    }

    .slide-prev {
        transform: translateX(-100%) scale(0.9);
    }

    /* .slide-current {} */

    .slide-next {
        transform: translateX(100%) scale(0);
    }

    .image {
        display: grid;
        justify-items: center;
        align-items: center;

        padding: 10px;
        border-radius: 10px;
        background-color: #ffffff;
    }

    .image img {
        width: 60%;
    }

    /* .name {} */

    .shop-cost {
        display: grid;
        grid-auto-flow: column;
        grid-gap: 20px;
        align-items: center;

        padding: 10px;
        border-radius: 10px;
        background-color: rgba(255, 255, 255, 0.75);

        text-decoration: none;
    }

    .cost {
        display: grid;
        justify-content: flex-end;
        align-content: flex-end;
        font-weight: bold;
    }

    .cost > * {
        font-weight: bold;
        text-align: right;
    }

    .cost-green {
        font-size: xx-large;
        color: yellowgreen;
    }
    .cost-green.europe {
        color: #666666;
    }

    .cost-red {
        font-size: x-large;
        text-decoration: line-through;
        text-decoration-thickness: 2px;
        color: tomato;
    }

    .actions {
        display: grid;
        grid-gap: 20px;
        grid-template-columns: 1fr 1fr;
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

    .hint.swipe {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 20dvh;
        font-size: xx-large;
        font-weight: bold;
        text-align: center;
        pointer-events: none;

        transition: all 1000ms ease;
        animation: HintSwipe 4000ms ease infinite;
    }
    .hint.swipe.hide {
        bottom: -10dvh;
        opacity: 0;
    }

    @keyframes HintSwipe {
        0% {
            transform: translateX(0);
        }

        20% {
            transform: translateX(0);
        }

        30% {
            transform: translateX(-10dvw) skewY(-1deg);
        }

        40% {
            transform: translateX(-10dvw) skewY(-1deg);
        }

        50% {
            transform: translateX(0dvw) skewY(0deg);
        }

        55% {
            transform: translateX(0dvw) skewY(0deg);
        }

        65% {
            transform: translateX(10dvw) skewY(1deg);
        }

        75% {
            transform: translateX(10dvw) skewY(1deg);
        }

        85% {
            transform: translateX(0);
        }
    }
</style>
