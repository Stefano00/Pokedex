var stats=[];
var cant;
var name = localStorage.getItem("name");
var nextPokemones=localStorage.getItem("nextPokemones");
var next="";
var cont;


   $(document).ready(function() {   
    console.log(name);
   
    $('#botonBuscar').click(function(){
        localStorage.setItem("name", $('#pokemonIngresado').val());
        name = $('#pokemonIngresado').val();
       // $('#nombrePokemonIngresado').text(name);
        location.reload();
    });

    $('#botonSiguiente').click(function(){
        console.log("probando api");
        console.log("\""+nextPokemones+"\"");
         next=respuesta.next;
         localStorage.setItem("nextPokemones", next);
         location.reload();
    });

   /* $('#botonBuscar').click(function(){*/
        //var name = $('#pokemonIngresado').val();
       
        $.ajax({url:"https://pokeapi.co/api/v2/pokemon/"+name, dataType:'json', success:function(respuesta){
            if(name==""){
                cant=respuesta.results.length;
                muchosPokemones(cant, respuesta);
            }
            else{
                cant=1;
                unPokemon(cant, respuesta);         
            }            
        }}); 
    /*});*/       
   });

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

    function muchosPokemones(cant, respuesta){
        console.log(respuesta);  
        $('.botones').append('<div class="btn-group" role="group" aria-label="Basic example">'+
        '<button type="button" id="botonAnterior" class="btn btn-secondary colorBoton">Anterior</button>'+
        '<button type="button" id="botonSiguiente" class="btn btn-secondary colorBoton">Siguiente</button>'+
        '</div>');

    
            //console.log(respuesta.results);
            //console.log(respuesta.results.length);
            for(let i=0; i<respuesta.results.length;i++){
                //console.log(respuesta.results[i].name);
                //------Consulta 1 abajo
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
                '</div>'+
                '</div>'
                );
                
                //----------- Consulta 1 arriba
                //-------------Consulta 2 abajo
                new Number(i);
                var j=i+1;
                console.log(respuesta.next);
               
                $.ajax({url:"https://pokeapi.co/api/v2/pokemon/"+j+"/", dataType:'json', success:function(respuesta){
                    console.log(respuesta);
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
                        //console.log(stats);
                        chart(i, stats);
                        stats=[];
                        
                   }});
               
               
             
                
                //------------ Consulta 2 arriba
                
            }


    }

    function unPokemon(cant, respuesta){
        console.log(respuesta);    
            
            for(let i=0; i<1;i++){
                //console.log(respuesta.results[i].name);
                //------Consulta 1 abajo
                $('.result').append('<div class="card row col-m cartas" style="width: 18rem;">'+
                '<img id=imagen'+i+' class="card-img-top imagenCarta" src="..." alt="Card image cap">'+
                '<div class="card-body">'+
                '<h5 class="card-title">'+respuesta.name+'</h5>'+
                '<ol>'+
                '<li id=texto'+i+'></li>'+
                '<li id=texto2'+i+'></li>'+
                '<li id=texto3'+i+'></li>'+
                '<li id=texto4'+i+'></li>'+
                '<li id=texto5'+i+'></li>'+
                '</ol>'+
                '<div id="chartContainer'+i+'" style="height:200px; width:250px;"></div>'+
                '<a href="#" class="btn btn-primary">Mostrar Pokemon</a>'+
                '</div>'+
                '</div>'
                );
                
                //----------- Consulta 1 arriba
                //-------------Consulta 2 abajo
                new Number(i);
                var j=i+1;
               // console.log(j);
               
               $.ajax({url:"https://pokeapi.co/api/v2/pokemon/"+respuesta.name+"/", dataType:'json', success:function(respuesta){
                console.log(respuesta);
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
                    //console.log(stats);
                    chart(i, stats);
                    stats=[];
                    
               }});
                
                //------------ Consulta 2 arriba
                
            }

    }

    function nextPage(cant, respuesta){

        $.ajax({url:"https://pokeapi.co/api/v2/pokemon/"+name, dataType:'json', success:function(respuesta){
            if(name==""){
                cant=respuesta.results.length;
                muchosPokemones(cant, respuesta);
            }
            else{
                cant=1;
                unPokemon(cant, respuesta);         
            }            
        }}); 
        console.log(respuesta);  

        $('.botones').append('<div class="btn-group" role="group" aria-label="Basic example">'+
        '<button type="button" id="botonAnterior" class="btn btn-secondary colorBoton">Anterior</button>'+
        '<button type="button" id="botonSiguiente" class="btn btn-secondary colorBoton">Siguiente</button>'+
        '</div>');

    
            //console.log(respuesta.results);
            //console.log(respuesta.results.length);
            for(let i=0; i<respuesta.results.length;i++){
                //console.log(respuesta.results[i].name);
                //------Consulta 1 abajo
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
                '</div>'+
                '</div>'
                );
                
                //----------- Consulta 1 arriba
                //-------------Consulta 2 abajo
                new Number(i);
                var j=i+1;
                console.log(respuesta.next);
               
                $.ajax({url:"https://pokeapi.co/api/v2/pokemon/"+j+"/", dataType:'json', success:function(respuesta){
                    console.log(respuesta);
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
                        //console.log(stats);
                        chart(i, stats);
                        stats=[];
                        
                   }});
               
               
             
                
                //------------ Consulta 2 arriba
                
            }




     

    }
