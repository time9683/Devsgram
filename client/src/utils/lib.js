export const RealsTopixel = (amount) => {
    const screenHeight = window.innerHeight
    // heigth the margin is 90% of the screen
    const margin = screenHeight * 0.9
  
    return amount * margin
  }


const DATE_UNITS = {
  day: 86400,
  hour: 3600,
  minute: 60,
  second: 1,
}

const getSeconds = date =>  (Date.now() - date) / 1000



const getUnitAndValue = (secondsElapsed) => {
  for (const [unit,secondUnit] of Object.entries(DATE_UNITS)) {
    if (secondsElapsed >= secondUnit || unit === "second") {
        const value = Math.floor(secondsElapsed / secondUnit) * -1
       return {value,unit}
}
  }
}


  export const    CalcularTime = (time) => {
    const rtf = new Intl.RelativeTimeFormat('es-Es',{style:"short",numeric:"always"})
    const seconds = getSeconds(time)
    console.log(seconds)
    const {value,unit} = getUnitAndValue(seconds)
    return rtf.format(value, unit)


  }


  export  const commas = (number) => {
    return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
