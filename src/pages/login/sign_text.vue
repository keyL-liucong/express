<template>
    <div class="app-container">
        <rich-text type="text" :nodes="signText"></rich-text>
    </div>
</template>

<script>
import Api from "../../services/index";
export default {
    components: {},
    data() {
        return {
			signText:""
        };
    },
	async onLoad() {
          let res = await this.$api.signText();
		  if( res.data.data){
			  this.signText = res.data.data.sign_text;
		  }
		  console.log(121321);
	},
};
</script>
<style lang='scss' scoped>
</style>