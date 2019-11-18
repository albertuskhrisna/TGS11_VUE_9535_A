<template>
    <v-container>
        <v-card>
            <v-container grid-list-md mb-0>
                 <h2 class="text-md-center">LOGIN</h2>
                    <v-row>
                        <v-col cols="4"></v-col>
                        <v-col cols="4">
                            <div class="form">
                                <v-text-field
                                    v-model="form.email"
                                    label="Email"
                                    filled
                                    rounded
                                    prepend-inner-icon="mdi-human-male">
                                </v-text-field>
                                <v-text-field
                                    v-model="form.password"
                                    label="Password"
                                    filled
                                    rounded
                                    dense
                                    prepend-inner-icon="mdi-lock"
                                    :type="'password'">    
                                </v-text-field>    
                                <v-btn @click="userlogin()" block color="success" class="elevation-0" height=40>Login</v-btn>
                            </div>
                        </v-col>
                        <v-col cols="4"></v-col>
                    </v-row>
                </v-container>
            </v-card>
            <v-snackbar       
                v-model="snackbar"
                :color="color"       
                :multi-line="true"       
                :timeout="3000">       
                {{ text }}       
                
                <v-btn         
                    dark         
                    text         
                    @click="snackbar = false">         
                    Close       
                </v-btn>     
            </v-snackbar>
    </v-container>
</template>

<script>
export default {
    data(){
        return {
            form : {
                email: null, 
                password: null,
            },
            user : new FormData,
            errors: '',
            text: '',
            color: null,
            snackbar: false, 
            load: false
        }
    },
    beforeCreate: function(){
        if(this.$session.exists()){
            this.$router.push('/user')
        }
    },
    methods:{
        userlogin(){
            var url = this.$apiUrl + '/authentication'
            this.user = new FormData()
            this.user.append('email',this.form.email);
            this.user.append('password',this.form.password);
            this.$http.post(url,this.user).then(response =>{
                if(response.data.token){
                    localStorage.setItem("token" , response.data.token)
                    this.$session.start()
                    this.$session.set("token", response.data.token)
                    this.$router.push({ name : "UserController"})
                }
                else{
                    this.snackbar = true;               
                    this.text = 'Login Failed!';               
                    this.color = 'red';
                    this.load = false; 
                }
            })
        }
    }
}
</script>