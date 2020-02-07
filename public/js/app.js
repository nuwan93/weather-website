const formElement = document.querySelector('form')
const searchElement = document.querySelector('input')
const messegeOne = document.querySelector('#first-para')
const messegeTwo = document.querySelector('#second-para')

formElement.addEventListener( 'submit', (e) => {
    e.preventDefault()
    const location = searchElement.value
    if (!location) {
        alert("Please provide a locaton");
    } else {
        getWeather(location)
    }
    
})

const getWeather = (location) => {
    fetch(`/weather?address=${location}`).then( (response) => {
    response.json().then((data) => {
        if (data.err) {
            messegeOne.textContent = data.err
            
        } else {
            messegeOne.textContent = data.city
            messegeTwo.textContent = data.summary
            
        }
    })
})
}