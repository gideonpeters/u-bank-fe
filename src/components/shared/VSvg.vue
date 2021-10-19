<template>
    <Component
        :is="require(`@/assets/svgs/${name}.svg`)"
        v-bind="$attrs"
        class="v-svg"
        @v-on="$listeners"
        :style="{
            height: `${height}`,
            width: `${width}`,
            minHeight: `${height}`,
            minWidth: `${width}`,
        }"
    />
</template>

<script>
export default {
    name: "VSvg",
    inheritAttrs: true,
    props: {
        name: {
            type: String,
            required: true,
        },
        height: {
            type: String,
        },
        width: {
            type: String,
        },
    },
};
</script>

<style lang="scss" scoped>
.v-svg {
    min-height: 25px;
    min-width: 25px;
}
</style>



