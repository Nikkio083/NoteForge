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
        NumFiles: 0,
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
        setCurrentFile(file: Object) {
            this.currentFile = file;
            localStorage.removeItem('currentFile');
            localStorage.setItem('currentFile', JSON.stringify(file));
            console.log(this.currentFile);
        },
        async searchFile(searchTerm: string) {
            console.log(searchTerm);
            const { data, error } = await supabase.from("noteforge").select("*");

            if (error) {
                console.error("Errore durante la ricerca:", error);
            } else {
                // Filter results where any tag contains the search term as a substring
                this.risultati = data.filter((item) => {
                    if (!item.tags || !Array.isArray(item.tags)) return false;

                    // Check if any tag contains the search term
                    return item.tags.some(
                        (tag) =>
                            typeof tag === "string" &&
                            tag.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                });

                console.log(this.risultati);

                // Remove items with 'preview' or 'profilePic' as their first tag
                for (let i = 0; i < this.risultati.length; i++) {
                    if (
                        this.risultati[i].tags[0] === "preview" ||
                        this.risultati[i].tags[0] === "profilePic"
                    ) {
                        this.risultati.splice(i, 1);
                        i--;
                    }
                }

                await router.push("/ris");
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
            console.log(file);
            const {error} = await supabase
                .from('noteforge')
                .update({comments: file.comments})
                .eq('id', file.id.trim())
                .select('*');

            if (error) {
                throw new Error(error.message);
            }
            this.setCurrentFile(file);
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
        },
        async likeFile(fileId: string) {
            const authStore = useAuthStore();
            const user = authStore.user;
            if (!user) throw new Error('Utente non autenticato');

            // Rimuove lo sliko
            await supabase
                .from('file_likes')
                .delete()
                .eq('user_id', user.id)
                .eq('file_id', fileId)
                .eq('type', 'dislike');

            // mette likess
            const { error } = await supabase
                .from('file_likes')
                .upsert({
                    user_id: user.id,
                    file_id: fileId,
                    type: 'like'
                }, { onConflict: ['user_id', 'file_id'] });

            if (error) throw new Error(error.message);
        },

        async dislikeFile(fileId: string) {
            const authStore = useAuthStore();
            const user = authStore.user;
            if (!user?.id) throw new Error('Utente non autenticato');

            // Rimuove eventuale like
            await supabase
                .from('file_likes')
                .delete()
                .eq('user_id', user.id)
                .eq('file_id', fileId)
                .eq('type', 'like');

            // Inserisce o aggiorna il dislike
            const { error } = await supabase
                .from('file_likes')
                .upsert({
                    user_id: user.id,
                    file_id: fileId,
                    type: 'dislike'
                }, { onConflict: ['user_id', 'file_id'] });

            if (error) throw new Error(error.message);
        },

        async getLikeStats(fileId: string) {
            const { count: likeCount, error: likeError } = await supabase
                .from('file_likes')
                .select('*', { count: 'exact', head: true })
                .eq('file_id', fileId)
                .eq('type', 'like');

            const { count: dislikeCount, error: dislikeError } = await supabase
                .from('file_likes')
                .select('*', { count: 'exact', head: true })
                .eq('file_id', fileId)
                .eq('type', 'dislike');

            if (likeError || dislikeError) {
                throw new Error('Errore nel recupero dei dati');
            }

            const {error} = await supabase.from('noteforge')
                .update({likes: likeCount, dislikes: dislikeCount})
                .eq('id', fileId)
                .select('*')
                .single();

            return {
                likes: likeCount ?? 0,
                dislikes: dislikeCount ?? 0
            };
        },

        async getUserVote(fileId: string) {
            const authStore = useAuthStore();
            const user = authStore.user;
            if (!user?.id) return null;

            const { data, error } = await supabase
                .from('file_likes')
                .select('type')
                .eq('user_id', user.id)
                .eq('file_id', fileId)
                .maybeSingle();

            if (error) throw new Error(error.message);
            return data?.type || null;
        },
        async getLikes(file: any) {
            const { data, error } = await supabase
                .from('noteforge')
                .select('*')
                .eq('id', file.id)
                .single();


            file.likes = data.likes;
            file.dislikes = data.dislikes;

            if (error) throw new Error(error.message);
            this.setCurrentFile(file);
            console.log(file);

        },
        async getDislikes(file: any) {
            const { data, error } = await supabase
                .from('noteforge')
                .select('*')
                .eq('id', file.id)
                .single();


            file.likes = data.likes;
            file.dislikes = data.dislikes;

            if (error) throw new Error(error.message);
            this.setCurrentFile(file);
            console.log(file);

        },
        async getNumFiles() {
            try {
                // Assumendo che i file siano memorizzati in una tabella chiamata 'files'
                // Se hai un nome diverso per la tabella, dovrai modificarlo qui
                const {count, error} = await supabase
                    .from("noteforge")
                    .select("*", {count: "exact", head: true});

                if (error) {
                    console.error("Errore nel conteggio dei file:", error.message);

                    // Alternativa: potremmo utilizzare una funzione RPC se la tabella non è accessibile direttamente
                    try {
                        const {data, error: rpcError} = await supabase.rpc(
                            "get_files_count"
                        );

                        if (rpcError) {
                            console.error(
                                "Errore nella chiamata RPC per il conteggio dei file:",
                                rpcError.message
                            );
                            return 0;
                        }

                        // Aggiorniamo la variabile di stato NumFiles
                        this.NumFiles = data || 0;
                        console.log("Numero totale di file:", this.NumFiles);
                        return this.NumFiles;
                    } catch (rpcErr) {
                        console.error("Errore nella chiamata RPC:", rpcErr);
                        return 0;
                    }
                }

                // Aggiorniamo la variabile di stato NumFiles
                this.NumFiles = count || 0;
                console.log("Numero totale di file:", this.NumFiles);
                return this.NumFiles;
            } catch (error) {
                console.error(
                    "Errore imprevisto durante il conteggio dei file:",
                    error
                );
                return 0;
            }
        }
    },

});
