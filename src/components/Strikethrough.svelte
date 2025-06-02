<script>
    export let status = null;
</script>

{#if status === "ordered"}
    <div class="strikethrough">
        <div class="line"></div>
    </div>
{/if}

<style>
    .strikethrough {
        position: absolute;
        width: 100%;
        height: 100%;

        display: grid;
        align-items: center;
    }

    .line {
        width: 100%;
        height: 2px;
        background-color: tomato;
        filter: drop-shadow(0 0 4px tomato);
    }
</style>
