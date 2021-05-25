<template>
    <div class="app-container">
        <rich-text type="text" :nodes="wuliuText"></rich-text>
    </div>
</template>

<script>
import Api from "../../services/index";
export default {
    components: {},
    data() {
        return {
			wuliuText:""
        };
    },
	async onLoad() {
          let res = await this.$api.wuliuText();
		  if( res.data.data){
			  this.wuliuText = res.data.data.wuliuText;
		  } 
	},
};
</script>
<style lang='scss' scoped>
</style>