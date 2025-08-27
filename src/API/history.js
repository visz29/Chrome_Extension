const history = async () => {
    // Dummy Result for testing ......
    // let results = [
    //     { title: 'New Tab', url: 'http://localhost:5173/' },
    //     { title: 'one punch man Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. - Google Search', url: 'https://www.google.com/search?q=one%20punch%20man' },
    //     { title: 'sukuna - Google Search', url: 'https://www.google.com/search?q=sukuna' },
    //     { title: 'toutube - Google Search', url: 'https://www.google.com/search?q=toutube' },
    //     { title: 'youtub - Google Search', url: 'https://www.google.com/search?q=youtub' },
    //     { title: 'New tab UI - v0 by Vercel', url: 'https://v0.app/chat/new-tab-ui-eTuyW7pN9Ks' },
    //     { title: 'v0 by Vercel', url: 'https://v0.app/' },
    //     { title: 'Color wheel - color theory and calculator | Canva Colors', url: 'https://www.canva.com/colors/color-wheel/' },
    //     { title: 'color in # - Google Search', url: 'https://www.google.com/search?q=color%20in%20%23' },
    //     { title: 'COLOR IN Definition & Meaning - Merriam-Webster', url: 'https://www.merriam-webster.com/dictionary/color%20in' }
    // ]
    let data = []

    await chrome.history.search({ text: '', maxResults: 20 }, (results) => {

        results.forEach(item => {
            // console.log(item.title, item.url);
            // You can show these in a dropdown as "suggestions"
            data.push({title:(item.title).split("-")[0], url: item.url})
        });

    });
   
    
    return data
}

export default history