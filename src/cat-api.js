import axios from "axios"

export function fetchBreeds() { 
     axios.defaults.headers.common["x-api-key"] = "live_FEXZMZc6iegq2PvxAwrfoCU5usHng8qMAJp0hbDIAtgQGAL5mFZVsYT5sVBwpJIJ";
  return axios.get('https://api.thecatapi.com/v1/breeds').then(responce => {
        return responce;
    });
}
export function fetchCatByBreed(breedId){
    axios.defaults.headers.common["x-api-key"] = "live_wMLksS0GuaQqPVH3u1VLBvmUZAbMJ8e3AegBJO0UW7Vryje54J8fOwWNJInxbJPV";
    return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`).then(responce => {
        return responce;
    });
}