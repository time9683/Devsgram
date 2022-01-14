export const RealsTopixel = (amount) => {
    const screenHeight = window.innerHeight
    // heigth the margin is 90% of the screen
    const margin = screenHeight * 0.9
  
    return amount * margin
  }


  export const    CalcularTime = (time) => {
    if (time < 60) {
      return `${time.toFixed(0)}s`
    }

    if (time >= 60) {
      if (time >= 3600) {
        if (time / 3600 >= 24) {
          if ((time / 3600) * 24 >= 7) {
            return `${((time / 3600) * 24 * 7).toFixed(0)}sem`
          }

          return `${((time / 3600) * 24).toFixed(0)}d`
        }

        return `${(time / 3600).toFixed(0)}h`
      }

      return `${(time / 60).toFixed(0)}m`
    }
  }


  export  const commas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }
