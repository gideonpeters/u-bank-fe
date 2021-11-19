<template>
    <v-row class="fill-height w-100" no-gutters>
        <v-col cols="12" md="5" class="d-md-block d-none">
            <v-card
                tile
                flat
                color="primary"
                class="fill-height"
                :style="{
                    backgroundImage: `url('${require('@/assets/images/abode-cover.jpeg')}')`,
                    backgroundPosition: 'center center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }"
            >
                <v-row no-gutters class="fill-height">
                    <v-col cols="12">
                        <slot name="sidebar" />
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
        <v-col cols="12" md="7">
            <v-card
                tile
                flat
                color="transparent"
                class="px-10 py-16 fill-height"
                :style="{
                    backgroundImage: $vuetify.breakpoint.mdAndDown
                        ? `url('${require('@/assets/images/abode-cover.jpeg')}')`
                        : '',
                    backgroundPosition: 'center center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                }"
            >
                <v-row justify="center" align="start" class="fill-height">
                    <v-col cols="12" md="8">
                        <div class="d-flex justify-center">
                            <v-img
                                src="./../assets/images/abode_logo--gold.png"
                                contain
                                width="180px"
                                height="200px"
                            ></v-img>
                        </div>
                    </v-col>
                    <v-col cols="12" md="8">
                        <slot />
                    </v-col>
                </v-row>
            </v-card>
        </v-col>
    </v-row>
</template>


