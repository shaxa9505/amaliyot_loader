window.addEventListener("DOMContentLoaded", () => {

  // tabs
  const tabs = document.querySelectorAll(".tabheader__item"),
    tabParents = document.querySelector(".tabheader__items"),
    tabContents = document.querySelectorAll(".tab_content");


  function hideTabContent () {
    tabContents.forEach(item => {
      item.style.display = "none"
    })

    tabs.forEach(item => {
      item.classList.remove("tabheader__item_active")
    })
  }


  function showTabContent (index  =0) {

    tabContents[index].style.display = "flex";
    tabs[index].classList.add("tabheader__item_active");

  }

  hideTabContent()
  showTabContent()


  tabParents.addEventListener("click", (event) => {
    const target = event.target;


    if(target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, index) => {
        if(target === item) {
          hideTabContent()
          showTabContent(index)
        }
      })
    }
  })
  
  // loader 

  const loaderWrapper = document.querySelector(".loader_wrapper");

  setTimeout(() => {
    loaderWrapper.style.display = "none"
  }, 5000)


  
  // Date

  const deadline = "2024-12-31";

  function getTimeReamining (endtime) {

    const total = Date.parse(endtime) - Date.parse(new Date()),
          days = Math.floor((total / (1000 * 60 * 60 * 24))),
          seconds = Math.floor((total / 1000) % 60),
          minutes = Math.floor((total / 1000 / 60) % 60),
          hours = Math.floor((total / (1000 * 60 * 60)) % 24);

    return {
      total,
      days,
      hours,
      minutes,
      seconds
    }

  }

  function getZero (num) {
    if(num >= 0 && num < 10){
      return `0${num}`
    } else {
      return num
    }
  }

  function setClock (endtime, selector) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),

      timeInterval = setInterval(updateClock, 1000)
    
      updateClock()

      function updateClock () {
        const total = getTimeReamining(endtime);
        days.textContent = getZero(total.days)
        hours.textContent = getZero(total.hours)
        minutes.textContent = getZero(total.minutes)
        seconds.textContent = getZero(total.seconds)

        if(total.total <= 0) {
          clearInterval(timeInterval)
        }
      }

  }

  setClock(deadline, ".timer")
})