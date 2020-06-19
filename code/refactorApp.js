var respuesta1;
var stats=[];
var name="";
var page="https://pokeapi.co/api/v2/pokemon/";
var nPage="";
var countPage=0;


//$(document).ready(function() {
    $(function(){
       
   // start();
   $('.botones').hide();
 //  $('.colorBoton').hide();

        
    $('#botonBuscar').click(function(){
        countPage=0;
      //  localStorage.setItem("name", $('#pokemonIngresado').val());
        name = $('#pokemonIngresado').val();
       // $('#nombrePokemonIngresado').text(name);
       console.log(name);
       if(name==""){
          // page="";
        $(".result").empty();
        $('.botones').show();
        start();
       }
       else{
        $(".result").empty();
        $(".botones").hide();
        individualCall(name); 
         
       }
    });

    $('#botonSiguiente').click(function(){
       // console.log("pagina" + nPage);
       $(".result").empty();
       $('.botones').show();
       countPage=countPage+20;
      // console.log(countPage);
        pageChange(nPage, countPage); 
    });
    $('#botonAnterior').click(function(){
        // console.log("pagina" + nPage);
        $(".result").empty();
        $('.botones').show();
        if(countPage>0){
            countPage=countPage-20;
        }
        else{
            countPage=0;
        }
        
       // console.log(countPage);
         pageChange(nPage, countPage); 
     });
    
    
});

function start(){
    firstAjax(page, countPage);
}

function individualCall(name){
let i =0;
            //------Consulta 1 abajo
            $('.result').append(
            '<div class="card row col-m cartas" style="width: 18rem;">'+
                '<img id=imagen'+0+' class="card-img-top imagenCarta" src="..." alt="Card image cap">'+
                '<div class="card-body">'+
                    '<h5 class="card-title">'+name+'</h5>'+
                    '<ol>'+
                    '<li id=texto'+0+'></li>'+
                    '<li id=texto2'+0+'></li>'+
                    '<li id=texto3'+0+'></li>'+
                    '<li id=texto4'+0+'></li>'+
                    '<li id=texto5'+0+'></li>'+
                    '</ol>'+
                '<div id="chartContainer'+0+'" style="height:200px; width:250px;"></div>'+
            '<a href="#" class="btn btn-primary">Mostrar Pokemon</a>'+
            '</div>'
            );
            
            $('.result').append(
                '<div class="row col-m graficoGrande" style="width: 18rem;">'+
                '<div id="chartPokemon"></div>'+
            '</div>'
             );
            
            //----------- Consulta 1 arriba
            //-------------Consulta 2 abajo
           
           $.ajax({url:"https://pokeapi.co/api/v2/pokemon/"+name+"/", dataType:'json', success:function(respuesta){
            //console.log(respuesta);
            //console.log(respuesta.sprite.back_default);
            $('#texto'+i).text("Orden: " + respuesta.order );
            $('#texto2'+i).text("Tamaño: " + respuesta.height/10 + " m" );
            $('#texto3'+i).text("Peso: " + respuesta.weight/10 +" Kg" );
            $('#texto4'+i).text("Tipo 1: " + respuesta.types[0].type.name );
            if(respuesta.types[1]==null){
                $('#texto5'+i).text("Tipo 2: " + respuesta.types[0].type.name );
            }
            else{
                
                $('#texto5'+i).text("Tipo 2: " + respuesta.types[1].type.name );
            }
            
            $("#imagen"+i).attr("src",respuesta.sprites.front_default); // modifica el recurso de src
          
            for(let k=0;k<respuesta.stats.length;k++){
                stats.push(respuesta.stats[k].base_stat);
               // console.log(respuesta.stats[k].base_stat);
                //console.log(respuesta.stats[k].stat.name);

            }
              //  console.log("prueba stats" +stats);
                chart(i, stats);
                chartPokemon(stats);
                stats=[];
               
           },
            error:function(){
                $(".result").empty();
                alert("No existe Pokemon");
                
            }
        });
        //chartPokemon();
            //------------ Consulta 2 arriba
            
        

}

function multiCall(respuesta, countPage){ //Se generan las cartas de los pokemones
    //console.log(respuesta);  
    nPage=respuesta.next;
  //  console.log(nPage);
    /*$('.botones').append('<div class="btn-group" role="group" aria-label="Basic example">'+
    '<button type="button" id="botonAnterior" class="btn btn-secondary colorBoton">Anterior</button>'+
    '<button type="button" id="botonSiguiente" class="btn btn-secondary colorBoton">Siguiente</button>'+
    '</div>');*/

        for(let i=0; i<respuesta.results.length;i++){           
            $('.result').append('<div class="card row col-m cartas" style="width: 18rem;">'+
            '<img id=imagen'+i+' class="card-img-top imagenCarta" src="..." alt="Card image cap">'+
            '<div class="card-body">'+
            '<h5 class="card-title">'+respuesta.results[i].name+'</h5>'+
            '<ol>'+
                '<li id=texto'+i+'></li>'+
                '<li id=texto2'+i+'></li>'+
                '<li id=texto3'+i+'></li>'+
                '<li id=texto4'+i+'></li>'+
                '<li id=texto5'+i+'></li>'+
            '</ol>'+
            '<div id="chartContainer'+i+'" style="height:200px; width:250px;"></div>'+
            '<a href="#" class="btn btn-primary">Mostrar Pokemon</a>'+
            '</div>'
            );           
            secondAjax(i, countPage);
        }


}

function pageChange(nPage, countPage){
    console.log(nPage);
    firstAjax(nPage, countPage);
}

function firstAjax(page, countPage){
    console.log(page);     
        $.ajax({url:page, dataType:'json', success:function(respuesta){
          console.log(respuesta);  
          return multiCall(respuesta, countPage); 
        }});       
} 

function secondAjax(i, countPage){
    new Number(i);
    new Number(countPage);
    var j=countPage+i+1;
   
    $.ajax({url:"https://pokeapi.co/api/v2/pokemon/"+j+"/", dataType:'json', success:function(respuesta){
        console.log(respuesta);
        $('#texto'+i).text("Orden: " + respuesta.order );
        $('#texto2'+i).text("Tamaño: " + respuesta.height/10 + " m" );
        $('#texto3'+i).text("Peso: " + respuesta.weight/10 +" Kg" );
        $('#texto4'+i).text("Tipo 1: " + respuesta.types[0].type.name );
        if(respuesta.types[1]==null){
            $('#texto5'+i).text("Tipo 2: " + respuesta.types[0].type.name );
        }
        else{           
            $('#texto5'+i).text("Tipo 2: " + respuesta.types[1].type.name );
        }
        
        $("#imagen"+i).attr("src",respuesta.sprites.front_default); // modifica el recurso de src
      
        for(let k=0;k<respuesta.stats.length;k++){
            stats.push(respuesta.stats[k].base_stat);
        }
           // console.log(stats);
            chart(i, stats);        
            stats=[];
            
       }});
   
}

function chart (id, stats) {
    console.log(stats);
    var chart = new CanvasJS.Chart("chartContainer"+id, {
    animationEnabled: true,
    theme: "light1", // "light1", "light2", "dark1", "dark2"
    title:{
        text: "Status"
    },
    axisY: {
        title: ""
    },
    data: [{        
        type: "column",  
        showInLegend: true, 
        legendMarkerColor: "grey",
        legendText: "",
        dataPoints: [      
            { y: stats[0], label: "hp" },
            { y: stats[1],  label: "attack" },
            { y: stats[2],  label: "defense" },
            { y: stats[3],  label: "special-attack" },
            { y: stats[4],  label: "special-defense" },
            { y: stats[5], label: "speed" }
        ]
    }]
});
chart.render();

}

function chartPokemon(status){
      //  console.log("llego?" + status);
        var chart = new CanvasJS.Chart("chartPokemon", {
        theme: "light2", // "light1", "light2", "dark1", "dark2"
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: "Estadísticas del Pokémon"
        },
        data: [{
            type: "pie",
            startAngle: 25,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}%",
            dataPoints: [
            { y: stats[0], label: "hp" },
            { y: stats[1],  label: "attack" },
            { y: stats[2],  label: "defense" },
            { y: stats[3],  label: "special-attack" },
            { y: stats[4],  label: "special-defense" },
            { y: stats[5], label: "speed" }
            ]
        }]
    });
    
    chart.render();
    }