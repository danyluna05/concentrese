var imgAbierta="";
var imgActual;
var score=0;
var audioElement;

$(document).ready(function() {
	 $('#mydiv').share({
	        networks: ['facebook','pinterest','googleplus'],
	        orientation: 'vertical',
	        title:'Concentrese',
	        urlToShare: 'www.pruebaConcentrese.com',
	        affix: 'right center'
	});
	
	$('#id-reiniciar').click(reiniciar);	
	asignarUbicacionCartas();
	$("#tablero div").click(abrirImg);
	
	audioElement= document.createElement('audio');   
    audioElement.setAttribute('autoplay', 'autoplay');
	
});

function asignarUbicacionCartas(){
	var imagenes = $("#tablero").children();
	var imagen = $("#tablero div:first-child");
	var contador=imagenes.length/2; 	
	mezclarImg(contador,imagen);
	$('img').hide();
	
}




function mezclarImg(contador,imagen){
	imagen=mezclarImgCore(contador,imagen);	
	mezclarImgCore(contador,imagen);
}



function mezclarImgCore(contador,imagen){
	var num_usados=[];
	for(_i=1; _i<=contador; _i++){
		var randomImg=Math.floor(Math.random() * contador);	
		var isUsed=verificarNumExiste(randomImg,num_usados);
		
		while(isUsed){
			randomImg=Math.floor(Math.random() * contador);	
			isUsed=verificarNumExiste(randomImg,num_usados);
		}
		
		num_usados.push(randomImg);
		var srcImg='img/animales/animal'+randomImg+'.png';
		$(imagen).append('<img height="100px" width="100px" src="'+srcImg+'"/>')
		$(imagen).attr('class','divInicio');
		imagen= imagen.next();
		
	}
	return imagen;	
	
}


function verificarNumExiste(num, num_usados){
	var isUsed=false;
	  if(jQuery.inArray( num, num_usados)!=-1){
			isUsed=true;
	  }
	return isUsed;	
}


function abrirImg(){
   audioElement.pause();	
   var div=$(this)
   $(div).attr('class','cart');
   var imagenSeleccionada=$(div).find('img');
   if($(imagenSeleccionada).is(":hidden")){
	   $(div).unbind("click", abrirImg);
       $(imagenSeleccionada).slideDown('fast');       
       if(imgAbierta==""){
    	  imgAbierta= $(imagenSeleccionada);
       }else{
    	  imgActual = $(imagenSeleccionada);
    	  if(imgAbierta.attr('src')!=imgActual.attr('src')){ 
    		  setTimeout(function() {
    			  $(imgAbierta).slideUp('fast');
    	          $(imgActual).slideUp('fast');
    	          var divAbierto=$(imgAbierta).closest('div');
    	          $(divAbierto).attr('class','divInicio');
    	          $(divAbierto).bind("click", abrirImg);
    	          $(div).attr('class','divInicio');
    	          $(div).bind("click", abrirImg);
    	          imgAbierta="";
    	          },600); 
    		  audioElement.setAttribute('src', 'audio/perdedor.mp3');
    		  activarAudio();
    	  }else{
    		  imgAbierta="";
    		  score++;
    		  $("#puntos").html(score);
    		  audioElement.setAttribute('src', 'audio/campana.mp3');
    		  activarAudio();
    	  }
    	   
       }
   }
}


function reiniciar(){
	imgAbierta="";
	imgActual="";
	score=0;
	$("div img").remove();
	asignarUbicacionCartas();
	$("#puntos").html(score);
	
}

function activarAudio(){
	    $.get();
        audioElement.play();      
}