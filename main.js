const API_KEY = `4564c48784eb454390f0f4dcd82383e9`
const url1=`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;
const url2="http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines";
let news =[];
const getLatestNews= async ()=>{
  const url = new URL(url2);
  console.log("uuu:",url);

  const response = await fetch(url);
  const data = await response.json();
  news = data.articles;
  console.log("rrr",response);
  console.log("ddd",data);
  console.log("aaa",news);
};
getLatestNews();