var movieID = getquery('id');
var page = getquery('hal');

function movieslide (){
  $.getJSON("https://api.themoviedb.org/3/movie/now_playing?api_key=31aefd5a188358198d1ee265bd5ce17f&language=en-US&page=1",function(result){
    $('#movie1').html("<img class='d-block w-100' src='https://image.tmdb.org/t/p/w1400_and_h450_face/"+result.results[0].backdrop_path+"'>");
    $('#movie2').html("<img class='d-block w-100' src='https://image.tmdb.org/t/p/w1400_and_h450_face/"+result.results[1].backdrop_path+"'>");
    $('#movie3').html("<img class='d-block w-100' src='https://image.tmdb.org/t/p/w1400_and_h450_face/"+result.results[2].backdrop_path+"'>");

      });
}

function index(){

  $.getJSON("https://api.themoviedb.org/3/movie/now_playing?api_key=31aefd5a188358198d1ee265bd5ce17f&language=en-US&page=1",function(result){
    $.each(result.results,function(key,val){
      $('#np').append("<div class='card col-lg-2 bg-light'>"+
      "<a href='javascript:movieId("+val.id+")'><img class='card-img-top' src='https://image.tmdb.org/t/p/w500/"+val.poster_path+"' alt='Card image cap'>"+
      "<div class='card-body'>"+
      "<h5 class='card-index tulisangede'>"+val.title+"</h5></a></div></div>");
      return key<5;
    })
  });

  $.getJSON("https://api.themoviedb.org/3/movie/upcoming?api_key=31aefd5a188358198d1ee265bd5ce17f&language=en-US&page=1",function(result){
    $.each(result.results,function(key,val){
      $('#uc').append("<div class='card col-lg-2 bg-light'>"+
      "<a href='javascript:movieId("+val.id+")'><img class='card-img-top' src='https://image.tmdb.org/t/p/w500/"+val.poster_path+"' alt='Card image cap'>"+
      "<div class='card-body'>"+
      "<h5 class='card-index tulisangede'>"+val.title+"</h5></a></div></div>");
      return key<5;
    })
  });
}

function npmovies(){
  $.getJSON("https://api.themoviedb.org/3/movie/now_playing?api_key=31aefd5a188358198d1ee265bd5ce17f&language=en-US&page="+page,function(result){
    $.each(result.results,function(key,val){
      $('#np').append("<br><div class='card'>"+
      "<div class='row '>"+
      "<div class='col-md-0'>"+
      "<a href='javascript:movieId("+val.id+")'><img class='sizegambar w-10px' src='https://image.tmdb.org/t/p/w500/"+val.poster_path+"' alt='Card image cap'></div>"+
      "<div class='col-md-8 px-3'>"+
      "<div class='card-block px-0'>"+
      "<h3 class='card-title'>"+val.title+"</h4></a>"+
      "<h4 class='card-text'>"+val.overview+"</h3></div></div>");
      return key<19;
    })
  });
}


function ucmovies(){
  $.getJSON("https://api.themoviedb.org/3/movie/upcoming?api_key=31aefd5a188358198d1ee265bd5ce17f&language=en-US&page="+page,function(result){
    $.each(result.results,function(key,val){
      $('#uc').append("<br><div class='card'>"+
      "<div class='row '>"+
      "<div class='col-md-0'>"+
      "<a href='javascript:movieId("+val.id+")'><img class='sizegambar w-10px' src='https://image.tmdb.org/t/p/w500/"+val.poster_path+"' alt='Card image cap'></div>"+
      "<div class='col-md-8 px-3'>"+
      "<div class='card-block px-0'>"+
      "<h3 class='card-title'>"+val.title+"</h4></a>"+
      "<h4 class='card-text'>"+val.overview+"</h3></div></div>");
      return key<19;
    })
  });
}

function movieId(id){
  movieID = id;
  window.location.href = 'detail.html?id='+movieID;
  return false;
}

function getquery(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};


function detail(){
  $.getJSON("https://api.themoviedb.org/3/movie/"+movieID+"?api_key=31aefd5a188358198d1ee265bd5ce17f",function(jd){
    var genres = genre(jd.genres, 'name');

    $('.bg-detail').css('background-image', 'url(https://image.tmdb.org/t/p/w1400_and_h450_face/' + jd.backdrop_path + ')');
    $('#poster').html("<img src='https://image.tmdb.org/t/p/w500/"+jd.poster_path+"' class='poster'>");
    $('#judul').html(jd.title);
    $('#genre').html("Genre : "+genres);
    $('#durasi').html("Durasi : "+jd.runtime+"m");
    $('#rating').html("Rating : "+jd.vote_average+"/10");
    $('#jadwaltayang').html("Tgl. Tayang : "+jd.release_date);
    $('#sinopsis').html("Sinopsis :<br>"+jd.overview);

  });
  $.getJSON("https://api.themoviedb.org/3/movie/"+movieID+"/videos?api_key=31aefd5a188358198d1ee265bd5ce17f",function(jd){
    $('#trailer').html("<div class='embed-responsive embed-responsive-16by9'><iframe class='embed-responsive-item' style='width:885px;height : 450px' src='https://www.youtube.com/embed/"+jd.results[0].key+"'?controls=0'></iframe></div>");
  });
}

function next(){
  page++;
  window.location.href = '?hal='+page;
}



function genre(arr, key) {
  return arr.map(function(o) {
    return o[key];
  }).join(", ");
}
