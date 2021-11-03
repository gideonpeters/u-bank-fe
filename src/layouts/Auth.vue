<template>
    <v-row class="fill-height w-100" no-gutters>
        <v-col cols="12" md="5" class="d-md-block d-none">
            <v-card tile flat color="primary" class="fill-height">
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
            >
                <v-row justify="center" align="start" class="fill-height">
                    <v-col cols="12" md="8">
                        <div
                            class="
                                text-lg-h3 text-h4
                                font-weight-bold
                                text-md-left text-center
                            "
                        >
                            Abode
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


