<template>
    <div>
        <h1> ARTAPLAN </h1>
        <v-card dark color="secondary" class="pa-0" flat>
            <v-row>
                <v-col lg="4" md="6" sm="12" class="pa-5">
                    <v-card-title><span class="text--white"> Register Now </span></v-card-title>
                    <v-card-text>
                        <v-form v-model="valid"
                                ref="form"
                                lazy-validation>
                            <v-text-field required :rules="[v => !!v || 'Username is required']" label="Username" v-model="username"></v-text-field>
                            <v-text-field required :rules="emailRules" label="Email" v-model="email"></v-text-field>
                            <v-text-field required :rules="passwordRules" type="password" label="Password" v-model="password"></v-text-field>
                            <v-text-field required :rules="repeatPasswordRules" type="password" label="Repeat Password"
                                          v-model="repeatPassword"></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>

                        <v-btn color="primary" :disabled="!valid" @click="registerUser()">
                            Εγγραφή
                        </v-btn>
                    </v-card-actions>
                </v-col>
                <v-col lg="8" md="6" sm="12" class="white">
                    <v-img
                            width="100%"
                            src="https://www.paymentsjournal.com/wp-content/uploads/2020/09/forgot-password-concept-illustration_114360-1123-626x375.jpg"
                    />
                </v-col>
            </v-row>

        </v-card>


    </div>
</template>

<script>
    import api from '../api';
    import User from "@/classes/User";
    import {mapMutations} from "vuex"

    export default {
        name: "Registration",
        data: () => ({
            valid:false,
            username: null,
            email: null,
            password: null,
            repeatPassword: null,
            repeatPasswordRules:[
              v=> v === this.password || 'Password does not match'
            ],
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            passwordRules:[
                v => !!v || 'Password Is Required... like obviously?',
                v=> /(?=.*[0-9])/.test(v) || 'password must contain at least a number',
                v=> /(?=.*[A-Z])/.test(v) || 'password must contain at least one Uppercase Letter ',
                v=> /(?=.*[a-z])/.test(v) || 'password must contain at least one lowercase Letter ',

    ]
        }),
        methods: {
            created(){
                this.setLoading(false);
            },
            ...mapMutations([
                'setLoading',
                'pushMessage'
            ]),
            registerUser() {
                let user = new User({
                    username: this.username,
                    email: this.email,
                })
                this.setLoading(true);
                api.users.registerUser(user, this.password).then(resp => {
                    this.setLoading(false);
                    this.pushMessage({
                        type: 'success',
                        text: 'Hurray! You are now part of Artaplan. Go plan something!'
                    })
                    this.$router.push('/login')
                }).catch(resp => {
                    this.setLoading(false);
                    this.pushMessage({
                        type: 'error',
                        text: 'there was some problem with registering you. But do not give up one day you will pass. Please try again!'
                    })
                })

            }
        }
    }
</script>

<style scoped>

</style>
