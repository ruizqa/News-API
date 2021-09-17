const API_KEY = "f183f5568b0d49599236e0ab4ff5ad1a";


function grabInfo(event){
    event.preventDefault();
    let searchTerm = event.target.searchTerm.value;
    console.log(searchTerm)
    fetchingInformation(searchTerm);

}


function fetchNews(searchTerm){
    let url=`https://newsapi.org/v2/top-headlines?q=${searchTerm}&apiKey=${API_KEY}&pageSize=10`;

    let settings = {
        method:"GET"


    }

    fetch(url,settings)
    .then((response) => {
        if(response.ok){
            return response.json();
        }

        else{

            throw Error(response.statusText);

        }
        
        
    })
    .then ((data)=>{
        let results = document.querySelector('.results');
        results.innerHTML = "";
        for(let i=0; i<data.articles.length;i++){
            results.innerHTML+=`
                <div class="topNew">
                    <h2>
                        ${data.articles[i].title}
                    </h2>

                    <div class="image">
                        <img src="${data.articles[i].urlToImage}">
                    </div>

                    <h4>
                        ${data.articles[i].author}
                    </h4>

                    <p>${data.articles[i].description}</p>

                </div>
            `;

        }
    })

    .catch((error)=>{
        let results = document.querySelector('.results');
        results.innerHTML = error;


    })
}


async function fetchingInformation(searchTerm){
    let url=`https://newsapi.org/v2/top-headlines?q=${searchTerm}&pageSize=10`;

    let settings = {
        method:"GET",
        headers:{
            "X-Api-Key": API_KEY
        }
    }

    let response=await fetch(url,settings);
    let data=await response.json();
    
    console.log(data);
    let results = document.querySelector('.results');

    for(let i=0; i<data.articles.length;i++){
        results.innerHTML+=`
            <div class="topNew">
                <h2>
                    ${data.articles[i].title}
                </h2>

                <div class="image">
                    <img src="${data.articles[i].urlToImage}">
                </div>

                <h4>
                    ${data.articles[i].author}
                </h4>

                <p>${data.articles[i].description}</p>

            </div>
        `;

    }


}

let newsForm = document.querySelector('#newsForm');

newsForm.addEventListener("submit", grabInfo);



