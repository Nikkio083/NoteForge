import { defineStore } from "pinia";

export const useshareinput = defineStore("shareinput", {
    state: () => ({
        testo : "", // stato condiviso per il testo
    }),

    actions: {
        stampa(){
            console.log(this.testo);

        },
        //function per aprire il microfono e prendere input vocale
        startVoiceRecognition() {
            const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.lang = 'it-IT';
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            recognition.start();

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                this.testo = transcript; // aggiorna lo stato condiviso
                console.log("Voice input:", transcript);
            };

            recognition.onerror = (event) => {
                console.error("Errore nel riconoscimento vocale:", event.error);
            };
        },

    }
});
