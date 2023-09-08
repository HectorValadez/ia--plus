function setup(){
    canvas=createCanvas(300,330)
    video=createCapture(VIDEO)
    video.hide()
    monje=ml5.imageClassifier("MobileNet")
    frameRate(5)

}
function draw() {
    image(video,0,0,300,330)
    monje.classify(video,sabiduria)
}
function sabiduria(error,resultados) {
    if (!error) {
        console.log(resultados);
        objeto=resultados[0].label
        porcentaje=resultados[0].confidence
        porcentaje=Math.round(porcentaje*100)
        if(porcentaje>20){
            fetch("https://api.mymemory.translated.net/get?q="+objeto+"&langpair=en|es")
            .then(respons=>respons.json())
            .then(data=>{
                traduccion=data.responseData.translatedText
                if (traduccion.includes("MYMEMORY")) {
                    document.getElementById("ia_mas_inteligente_de_lo_normal").innerHTML=objeto
                    
                }else{
                    document.getElementById("ia_mas_inteligente_de_lo_normal").innerHTML=traduccion

                }
            } )
            
        }
    }
}