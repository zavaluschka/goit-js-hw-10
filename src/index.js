import {fetchBreeds, fetchCatByBreed} from './cat-api.js';
import SlimSelect from 'slim-select'
import Notiflix from 'notiflix';



const elSet = {
    selectElement: document.querySelector('.breed-select'),
    infoElement: document.querySelector('.cat-info'),
    successTextElement: document.querySelector('.loader'),
    errorTextElement: document.querySelector('.error'),
}


elSet.selectElement.style.width = "150px";
elSet.selectElement.style.display = "none";
elSet.errorTextElement.style.display = "none";
elSet.infoElement.style.display = "flex";
elSet.infoElement.style.flexDirection = "row";
elSet.infoElement.style.gap = "20px";

elSet.successTextElement.style.position = "absolute";
elSet.successTextElement.style.left = "50vw";
elSet.successTextElement.style.top = "300px";

function newSettings() {
    const textBlock = document.querySelector('[name="text-block"]');
    const titleDes = document.querySelector('[name="des"]');
    const titleTemp = document.querySelector('[name="temp"]');
    const textTemp = document.querySelector('[name="text-temp"]');
    
    textBlock.style.display = "flex";
    textBlock.style.flexDirection = "column";

    titleDes.style.fontSize = "24px";
    titleDes.style.fontWeight = "700";
    titleDes.style.fontWeight = "bold";
    titleDes.style.marginBottom = "10px";
   
    titleTemp.style.fontWeight = "bold";

    textTemp.style.marginTop = "20px";
}

fetchBreeds().then(responce => {

    

    elSet.selectElement.style.display = "block";
    elSet.successTextElement.style.display = "none";
    elSet.errorTextElement.style.displey = "none";
   
    responce.data.map(result => {
        let newOpt = document.createElement('option');
        newOpt.setAttribute('value', result.id);
        newOpt.textContent = result.name;
        elSet.selectElement.appendChild(newOpt);
    });

    new SlimSelect({
        select: '#selectElement',
      
            data: nameBreeds,

      })
}).catch(() => {

    elSet.successTextElement.style.display = "none";
    elSet.errorTextElement.style.visibility = "visible";
 } 
);

function getBrred (evt) {

    elSet.successTextElement.style.display = "block";
    elSet.infoElement.style.display = "none";

    fetchCatByBreed(evt.target.value).then(responce => {
       
        elSet.successTextElement.style.display = "none";
        elSet.infoElement.style.display = "flex";
    
        elSet.infoElement.innerHTML = ""; 
        
        
        if(responce.hasOwnProperty("data") && responce.data.length === 0)  
            throw new Error("Breed array is empty!");

        const { url, breeds } = responce.data[0]
        const { description, temperament, name} = breeds[0]
        

        elSet.infoElement.innerHTML = `
        <img src=${url} width="600" hight="250">
        </img> 
        <div name="text-block">
            <p1 name="des">${name}</p1>
            <a>${description}</a>
            <a name="text-temp"><span name="temp">Temperament: </span>${temperament}</a>
        </div>`;
        newSettings();
        
    }).catch(error => {

        elSet.successTextElement.style.display = "none";
        elSet.errorTextElement.style.visibility = "visible";
        Notiflix.Notify.warning(error.message);
     } 
    );
};

elSet.selectElement.addEventListener('change', getBrred);