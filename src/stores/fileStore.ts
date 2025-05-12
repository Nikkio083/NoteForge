import { defineStore } from 'pinia';
import { supabase } from '@/supabase';
import { useAuthStore } from '@/stores/authStore';
import {ref} from "vue";
import router from "@/routers/index.ts";

export const useFileStore = defineStore('fileStore', {
    state: () => ({
        file: null as File | null,
        title: '',
        description: '',
        metadata: {} as Record<string, any>,
        currentFile: Object as any,
        risultati: [] as Array<any>,
        pic: '' as string,
    }),

    actions: {
        async uploadFile(file: File, title: string, description: string, tags: Array<string>, preview: string) {
            const authStore = useAuthStore();
            const user = authStore.user;

            if (!user?.id) {
                throw new Error('Utente non autenticato');
            }

            const filePath = `${user.id}/${Date.now()}-${file.name}`;
            const { error: uploadError } = await supabase.storage
                .from('noteforge.files')
                .upload(filePath, file);

            if (uploadError) {
                throw new Error(uploadError.message);
            }

            const { data: urlData } = supabase.storage
                .from('noteforge.files')
                .getPublicUrl(filePath);

            if (!urlData?.publicUrl) {
                throw new Error('Impossibile ottenere l’URL pubblico');
            }

            if(user.user_metadata.profilePic.publicUrl === null) {
                this.pic = ""
            }else{
                this.pic = user.user_metadata.profilePic.publicUrl
            }

            const { error: dbError } = await supabase.from('noteforge').insert([
                {
                    user_id: user.id,
                    title: title,
                    description: description,
                    tags: tags,
                    link: urlData.publicUrl,
                    filePath: filePath,
                    author: user.user_metadata.name,
                    preview: preview,
                    authorPic: this.pic,
                },
            ]);

            if (dbError) {
                throw new Error(dbError.message);
            }

            return {
                publicUrl: urlData.publicUrl,
            };
        },
        async searchFile(searchTerm: string) {
            console.log(searchTerm);
            const { data, error } = await supabase
                .from('noteforge')
                .select('*')
                .contains('tags', [searchTerm]);



            if (error) {
                console.error('Errore durante la ricerca:', error)
            } else {
                this.risultati = data
                console.log(this.risultati)
                for(let i = 0; i < this.risultati.length; i++) {
                    if((this.risultati[i].tags[0] === 'preview') || (this.risultati[i].tags[0] === 'profilePic')) {
                        this.risultati.splice(i, 1);
                        i--;
                    }
                }
                await router.push('/ris');
            }
        },
        async searchFileByTag(tag: string, id: string) {
            const { data, error } = await supabase
                .from('noteforge')
                .select('*')
                .contains('tags', [tag]);





            if (error) {
                console.error('Errore durante la ricerca:', error)
            } else {
                const result = ref(data);
                for(let i = 0; i < result.value.length; i++) {
                    if(result.value[i].id === id) {
                        result.value.splice(i, 1);
                        i--;
                    }
                }
                return result.value;
            }
        },
        async addComment(comment: string, file: any) {
            const authStore = useAuthStore();
            const user = authStore.user;
            console.log(file);

            if (!user?.id) {
                alert('Utente non autenticato');
                throw new Error('Utente non autenticato');
            }
            file.comments.push({
                commentAuthor: user.user_metadata.name,
                commentAuthorPic: user.user_metadata.profilePic.publicUrl,
                comment: comment,
            });
            const {error} = await supabase
                .from('noteforge')
                .update({comments: file.comments})
                .eq('id', file.id.trim())
                .select('*');

            if (error) {
                throw new Error(error.message);
            }
        },
        setCurrentFile(file: Object) {
            this.currentFile = file;
            localStorage.removeItem('currentFile');
            localStorage.setItem('currentFile', JSON.stringify(file));
            console.log(this.currentFile);
        },
        async downloadfile(url: string, fileName: string) {
            const authStore = useAuthStore();
            const user = authStore.user;
            if(!user?.id){
                alert("Utente non autenticato");
                throw new Error('Utente non autenticato');
            }
            else {
                try {
                    const response = await fetch(url);
                    if (!response.ok) {
                        throw new Error(`Errore HTTP: ${response.status}`);
                    }

                    const blob = await response.blob();
                    const blobUrl = URL.createObjectURL(blob);

                    const link = document.createElement('a');
                    link.href = blobUrl;
                    link.download = fileName || 'downloaded-file';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);

                    // Liberiamo la memoria dopo il download
                    setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
                } catch (error) {
                    console.error('Errore durante il download:', error);
                }
            }
        },
        async addView(file: any) {
            file.views++;
            const { error } = await supabase
                .from('noteforge')
                .update({ views: file.views })
                .eq('id', file.id.trim())
                .select('*');
        },
        async addDownload(file: any) {
            file.downloads++;
            const { error } = await supabase
                .from('noteforge')
                .update({ downloads: file.downloads })
                .eq('id', file.id.trim())
                .select('*');
        }
    },
});
