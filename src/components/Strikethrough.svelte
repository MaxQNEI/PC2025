<script>
    export let status = null;
</script>

<!-- {#if status === "ordered"}
    <div class="strikethrough">
        <div class="line"></div>
    </div>
{/if} -->

{#if status === "ordered"}
    <div class="strikethrough ordered">
        <div class="line">ORDERED</div>
    </div>
{/if}

<style>
    .strikethrough {
        position: absolute;
        z-index: 1;
        width: 100%;
        height: 100%;

        display: grid;
        align-items: center;

        pointer-events: none;
    }

    .line {
        width: 100%;
        padding: 4px;
        background-color: rgba(255, 99, 71, 0.8);
        color: #ffffff;
        text-align: center;
        font-weight: bold;
    }

    .strikethrough.ordered .line {
        background-color: rgb(255, 165, 0);
    }

    @media (max-width: 599.95px) {
        .line {
            display: grid;
            align-items: center;
            justify-self: center;

            width: calc(100% - 20px);
            height: calc(100% - 20px);
            border-radius: 10px;
            background-color: rgba(255, 99, 71, 0.2);
            filter: drop-shadow(0 0 4px #000000);
            color: #ffffff;
            font-size: xx-large;
            font-weight: bold;
        }

        .strikethrough.ordered .line {
            background-color: rgba(255, 165, 0, 0.2);
        }
    }
</style>
