
let item_carrossel_header=document.querySelectorAll(".item_carrossel_header")
let section_carrossel_header=document.querySelector(".section_carrossel_header")
let buttonEsquerda=document.querySelector(".buttonEsquerda")
let buttonDireito=document.querySelector(".buttonDireito")
let button_inicio_mob=document.querySelector("#button_inicio_mob")

let buttonMob=document.querySelector("#buttonMob")
let li_pesquisa_input=document.querySelector(".li_pesquisa input")








function carrosselHeader(){

    for (let index = 0; index < item_carrossel_header.length; index++) {

         buttonDireito.addEventListener("click",()=>{
            section_carrossel_header.scrollBy(500,0)
         })


         
         buttonEsquerda.addEventListener("click",()=>{
            section_carrossel_header.scrollBy(-500,0)
         })
        
    }
}


carrosselHeader()



window.addEventListener("scroll" ,buttonInicio)


function buttonInicio(){
    if(scrol=window.pageYOffset>=500 && window.screen.width <=810 ){
      button_inicio_mob.style.display="flex"
    }else{
      button_inicio_mob.style.display="none"
    }
}


function pesquisaMob(){

   if(window.screen.width <=530){

      buttonMob.addEventListener("click", chamarInput)
     
         function chamarInput(){
            li_pesquisa_input.style.display="block"
            
            setTimeout(() => {
            li_pesquisa_input.style.top="60px"
            li_pesquisa_input.style.opacity="1"
   
            }, 200);
   
            buttonMob.addEventListener("click",removeInput)
            buttonMob.removeEventListener("click", chamarInput)
          
         }
   
         function removeInput(){
            li_pesquisa_input.style.top="45px"
            li_pesquisa_input.style.opacity="0"
            setTimeout(() => {
               li_pesquisa_input.style.display="none"
               }, 200);
   
               buttonMob.removeEventListener("click",removeInput)
               buttonMob.addEventListener("click", chamarInput)
         }
   
   
   }
}


 pesquisaMob()




 