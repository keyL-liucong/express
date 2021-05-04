<script>
export default {
    onLaunch: function () {
        console.log("App Launch");
    },
    onShow: function () {
        console.log("App Show");
    },
    onHide: function () {
        console.log("App Hide");
    },
};
</script>

<style>
/*每个页面公共css */
 @import './static/style/thorui.min.css';
* {
    box-sizing: border-box;
}
button::after {
    border: none;
}
button {
    border-radius: 0;
    background-color: #fff;
}

</style>
