


export default defineNuxtPlugin(async(nuxtApp) => {

    let wordsArray = [];

    function fetchWords() {
        const config = useRuntimeConfig();
        const api = config.public.api;


        return new Promise((resolve, reject) => {

            fetch(`${api}/translations`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Request failed');
                    }
                    return response.json();
                })
                .then(data => {
                    resolve(data)
                })
                .catch(error => {
                    reject(error)
                })

        })
    }

    const words = await fetchWords();

    words.data.map((item,i)=>{
       wordsArray[item.attributes.main_text] = item.attributes.translated_text
        
    })

    
    
    


    return {
        provide: {
            wordsArray
        }
    }





});





