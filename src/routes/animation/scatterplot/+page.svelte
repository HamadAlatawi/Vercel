<script>
    export let step;
</script>

<div class="chart-container">

</div>

<style>
    .chart-container {
        height: 80vh;
        max-width: 100%;
        background:
                repeating-linear-gradient(
                        to right,
                        transparent,
                        transparent 50px,
                        #FDFCF5 50px,
                        #FDFCF5 55px
                ),
                repeating-linear-gradient(
                        to bottom,
                        transparent,
                        transparent 50px,
                        #FDFCF5 50px,
                        #FDFCF5 55px
                ),
                linear-gradient(45deg, pink, #FFF086, #897BCF);
        border-radius: 5px;
        box-shadow: 1px 1px 0px 0px rgba(2, 3, 10, 1),
        2px 2px 0px 0px rgba(2, 3, 10, 1), 3px 3px 0px 0px rgba(2, 3, 10, 1),
        4px 4px 0px 0px rgba(2, 3, 10, 1), 5px 5px 0px 0px rgba(2, 3, 10, 1),
        6px 6px 0px 0px rgba(2, 3, 10, 1), 7px 7px 0px 0px rgba(2, 3, 10, 1),
        8px 8px 0px 0px rgba(2, 3, 10, 1), 9px 9px 0px 0px rgba(2, 3, 10, 1),
        10px 10px 0px 0px rgba(2, 3, 10, 1);
    }
</style>