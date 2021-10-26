<template>
  <div class="personalized">
    <div class="personalized-top">
        <h3>{{title}}</h3>
    </div>
    <div class="personalized-list">
        <div class="item" v-for="value in personalized" :key="value.id" @click='selectItem(value.id)'>
            <!-- <img :src="value.picUrl" alt=""> -->
            <img v-lazy="value.picUrl" alt="">
            <p>{{value.name}}</p>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Personalized',
  props: ['personalized', 'title', 'type'],
  methods: {
    selectItem (id) {
      this.$emit('showDetials', id, this.type)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/variable.scss';
@import '../../assets/css/mixin.scss';
.personalized{
    @include bg_sub_color();
    .personalized-top{
        widows: 100%;
        height: 50px;
        padding: 17px 0px;
        border-bottom: ghostwhite 2px solid;
        h3{
            display: block;
            line-height: 50px;
            padding: 0 30px;
            border-left: 6px solid;
            @include border_color();
            @include font_size($font_large);
            font-weight: bold;
            @include font_color()
        }
    }
    .personalized-list{
        width: 100%;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        padding: 20px 0px;
        .item{
            width: 200px;
            img{
            width: 200px;
            height: 200px;
            border-radius: 20px;
            }
            p{
                @include clamp(2);
                @include font_color();
                @include font_size($font_medium_s);
                margin:10px 0px 20px;
                text-align: center;
            }
        }
    }
}
</style>
