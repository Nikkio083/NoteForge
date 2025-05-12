import { defineStore } from "pinia";
import { supabase } from "@/supabase.ts";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as any,         // contiene l'oggetto user di Supabase
        isLoggedIn: false,
    }),

    actions: {
        setUser(user: any) {
            if (user) {
                this.user = user;
                this.isLoggedIn = true;
            } else {
                this.user = null;
                this.isLoggedIn = false;
            }
            console.log("Auth user set:", this.user);
        },

        logout() {
            this.user = null;
            this.isLoggedIn = false;
            supabase.auth.signOut().then(r => supabase.auth.refreshSession);
        },

        async login(email: string, password: string) {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                throw error;
            }

            this.setUser(data.user);
            return data;
        },

        async registra(email: string, password: string, name: string, school: string, profilePic: string | null = null) {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        name: name,
                        school: school,
                        profilePic: profilePic
                    }
                }
            });

            if (error) throw error;
            await this.login(email, password);

            return data;
        },

        async fetchSession() {
            const { data, error } = await supabase.auth.getSession();
            if (data?.session?.user) {
                this.setUser(data.session.user);
            }
        },

        async updateUser(profilePicUrl: string) {
            const { data, error } = await supabase.auth.updateUser({
                data: {
                    profilePic: profilePicUrl,
                }
            });

            if (error) {
                console.error('Errore aggiornamento:', error.message);
            } else {
                console.log('Utente aggiornato:', data.user);
            }
        },
        async updateUserData(firstName: string, lastname: string, email: string, tel: string, dataDiNascita: any, profession: string, posizione: string, biografia: string) {
            const { data, error } = await supabase.auth.updateUser({
                data: {
                    firstName: firstName,
                    lastname: lastname,
                    email: email,
                    tel: tel,
                    dataDiNascita: dataDiNascita,
                    profession: profession,
                    posizione: posizione,
                    biografia: biografia,
                }
            });

            if (error) {
                console.error('Errore aggiornamento:', error.message);
            } else {
                console.log('Utente aggiornato:', data.user);
            }
        },
    },

    getters: {
        getUser: (state) => state.user,
        isAuthenticated: (state) => state.isLoggedIn,
        getUserSession: (state) => {
        }
    }
});
