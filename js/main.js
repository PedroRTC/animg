

let div_animes=document.querySelector(".div_animes")
let divErro=document.querySelector(".divErro")
let item_menu=document.querySelectorAll(".item")
let inputPesquisa=document.querySelector("#pesquisa")
let todosAnimes=[]
let filterImg=[]


function fetchJson(url){
    return fetch(url).then((resp)=>{
         return resp.json()
        
    })
}







async function init(){
    
   
    try {
        todosAnimes = await fetchJson("anime.json")
        
        geraAnime()
        inputPesquisa.addEventListener("input",filter)
       
    } catch (error) {

        showErro()
    }
 
}

init()

  
 
async function filter() {

    if(inputPesquisa.value.length >=2){
       div_animes.style.position="absolute"
       div_animes.style.top="60px"
       
        let cards=document.querySelectorAll(".card_anime")
        for (const iterator of cards) {
            iterator.style.display="none" 
        }

        filterImg=todosAnimes.filter(({nome})=>nome.toLowerCase().includes(inputPesquisa.value.toLowerCase()))
        todosAnimes=filterImg
       
        geraAnime()

    }else{

        div_animes.style.position=""
        div_animes.style.top=""
        let cards=document.querySelectorAll(".card_anime")
        for (const iterator of cards) {
            iterator.style.display="none" 
        }

        todosAnimes = await fetchJson("anime.json")
        
       geraAnime()
       
         
    } 
      
      
}


   

function geraAnime(){

    todosAnimes.map((i)=>{
        let card_anime=document.createElement("div")
        let section_anime=document.createElement("section")
        let span_anime=document.createElement("span")
        let nome_anime=document.createElement("p")
        let nota_anime=document.createElement("p")

        card_anime.classList.add("card_anime")
        nome_anime.classList.add("nome_anime")
        nota_anime.classList.add("nota_anime")

        

        card_anime.style.backgroundImage=`url(${i.img})`
        nome_anime.innerHTML = `<a download href="${i.img}"><i class="fa fa-download" aria-hidden="true"></i></a> ${i.nome}`
        nota_anime.innerHTML=`${i.nota} / <i class="fa fa-star-o" aria-hidden="true"></i>` 

        
        span_anime.appendChild(nome_anime)
        span_anime.appendChild(nota_anime)
        section_anime.appendChild(span_anime)
        card_anime.appendChild(section_anime)
        div_animes.appendChild(card_anime)


        card_anime.addEventListener("click" , mostraImg)

        function mostraImg(){

            let sectionImg=document.createElement("div")
            let buttonFecha=document.createElement("button")
            let imgAnime=document.createElement("div")
            let icones=document.createElement("section")

         
        
            sectionImg.classList.add("sectionImg")
            buttonFecha.classList.add("buttonFecha")
            icones.classList.add("icones")
            imgAnime.classList.add("imgAnime")

            imgAnime.style.backgroundImage=`url("${i.img}")`
            imgAnime.innerHTML=`<span><i class="fa fa-star" aria-hidden="true"></i></span>`

            icones.innerHTML=`<i class="fa fa-star" aria-hidden="true" id="buttonAvaliar"></i>
                              <a href="javascript:void(0)" onclick="share()"><i class="fa fa-share" aria-hidden="true"></i> </a> 
                              <a download href="${i.img}"><i class="fa fa-download" aria-hidden="true"></i></a>`
           
            buttonFecha.innerHTML=`<i class="fa fa-times fa-lg" aria-hidden="true"></i>`
            sectionImg.appendChild(buttonFecha)
            sectionImg.appendChild(imgAnime)
            sectionImg.appendChild(icones)
            window.document.body.appendChild(sectionImg)

            buttonFecha.addEventListener("click", ()=>{
                window.document.body.removeChild(sectionImg)
            })



            let buttonAvaliar=document.querySelector("#buttonAvaliar")
            let spanImg=document.querySelector(".imgAnime span")
            let estrelaImg=document.querySelector(".imgAnime i")

             buttonAvaliar.addEventListener("click", avaliar)
             
             
            function avaliar(){
                buttonAvaliar.style.background="blue"
                buttonAvaliar.style.color="white"
                spanImg.style.background=" rgba(255, 255, 255, 0.481)"
                    estrelaImg.style.opacity="0.8"
                    estrelaImg.style.transform="scale(13)"
                
                 setTimeout(() => {
                    estrelaImg.style.opacity="0"
                    estrelaImg.style.transform="scale(0)"
                    spanImg.style.background=""
                 },1000);
                 buttonAvaliar.removeEventListener("click", avaliar)
                 buttonAvaliar.addEventListener("click", removerAvaliacao)

            }
            
            function removerAvaliacao(){
                buttonAvaliar.style.background=""
                buttonAvaliar.style.color=""
                buttonAvaliar.addEventListener("click", avaliar)
                buttonAvaliar.removeEventListener("click", removerAvaliacao)
            }
        }

    })
                     
}



        
       

function share(){
	if (navigator.share !== undefined) {
		navigator.share({
			title: 'Animg',
			text: 'Aqui você vera imagens de alta qualidade de seus Animes  favoritos.',
			url: 'https://animg.netlify.app/',
		})
		.then(() => console.log('Successful share'))
		.catch((error) => console.log('Error sharing', error));
	}
}


function showErro(){
    divErro.innerHTML=`<h3>Erro ao carregar os dados...</h3>`
  }