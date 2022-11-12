

        var i = 0, text
        text = `SERVER IS RUNING ON PORT 3001 ----------- ${window.location} .............................`
        function typing() {
            if (i <= text.length) {
             document.getElementById("p").innerHTML += text.charAt(i)
             i++

              if(i === text.length) {
                setTimeout(()=>{
                 i =  0;
                 document.getElementById("p").innerHTML = null
                 typing()
                }, 2000)
              } else {
                setTimeout(typing, 100)
              }
            }
        }
        typing()