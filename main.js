const API_KEY = `4564c48784eb454390f0f4dcd82383e9`
const url1=`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;
const url2="https://musical-strudel-f7ea63.netlify.app//top-headlines";
moment.locale("ko");
let newsList =[];
let categoryAll = null;
let alertCount=0;
const getLatestNews= async (category, search)=>{
  try{
    categoryAll = category;
    const requestUrl = new URL(url2);
  
    if(category!=null){
      requestUrl.searchParams.append('category',category);
    }
    if(search!=null){
      requestUrl.searchParams.append('q',search);
    }
    console.log("uuu:",requestUrl);
  
    const response = await fetch(requestUrl);
    const data = await response.json();
    if(response.status==200){
      newsList = data.articles;
      if(data.articles.length<1){
        throw new Error("검색결과가 없습니다. 다른 키워드로 검색해주세요.");
      }
      render();
    }else{
      throw new Error(data.message)
    }
    alertCount = 0;
    searchInput.value="";
  }catch(error){
    const newsBoard = document.getElementById("news-board");
    let divElement = document.createElement("div");
    divElement.classList.add("alert", "alert-danger");
    divElement.setAttribute("role", "alert");
    divElement.textContent = error.message;
    if(alertCount==0){
      newsBoard.insertBefore(divElement, newsBoard.firstChild);
      alertCount++;
    }else{
      divElement = document.querySelector(".alert");
      divElement.style.visibility = "hidden";
    }
    setTimeout(()=>{
      divElement.style.visibility = "visible";
    },50)
  }
};

function searchToggle(){
  const searchSpan = document.querySelector(".input-span");
  searchSpan.classList.toggle("show");
}

const searchInput = document.getElementById("search-input");
const searchBtn = document.querySelector(".search-button");

searchInput.addEventListener("keyup",(e)=>{
  if(e.key=='Enter'){
    q = searchInput.value;
    getLatestNews(categoryAll,q);
  }
})

searchInput.addEventListener("focus",()=>{
  searchInput.value="";
})

searchBtn.addEventListener("click",()=>{
  q = searchInput.value;
  getLatestNews(categoryAll,q);
});

const render =()=>{
  const newsHTML = newsList.map(
    news=>{
      const description=()=>{
        if(news.description == null){
          return "내 용 없 음"
        }
        return news.description.length>=200?news.description.slice(0,196)+"....":news.description;
        }
      const imageUrl=()=>{
        if(news.urlToImage==null){
          return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS26LFm6Ztu_0onvo97ZjZ8LHkErhUbRqTGE0Ak5aVgUA&s";
        }else{
          return news.urlToImage;
        }
      }
      const source=()=>{
        if(news.source == null){
          return "출 처 없 음"
        }else{
          return news.source.name;
        }
      }
    const dateCal=()=>{
      if((moment(news.publishedAt).startOf('day').fromNow()).includes("시간 전")){
        return moment(news.publishedAt).startOf('day').fromNow();
      }else{
        return moment(news.publishedAt).format('LLL');
      }
    }
      return `
      <div class="row news">
        <div class="col-lg-4 text-center">
          <img class="new-img-size" alt="뉴스이미지" src="${imageUrl()}" onError="this.src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS26LFm6Ztu_0onvo97ZjZ8LHkErhUbRqTGE0Ak5aVgUA&s';"/>
        </div>
        <div class="col-lg-8">
          <h2>${news.title}</h2>
          <p>${description()}</p>
          <div>${source()} * ${dateCal()}</div>
        </div>
      </div>
      `;
    }
  ).join("");
  document.getElementById("news-board").innerHTML=newsHTML;
}

getLatestNews();

