
fetch('https://moviesapi.ir/api/v1/movies?page=1')
    .then(function (response){
        return response.json();
    })
    .then(function (data){
        appendData(data);
    })
    .catch(function (err){
        console.log('Error : ' + err);
    })

function appendData(data){
    let mainDiv = document.getElementById('div1');
    var d = data.data;
    let p = document.getElementById('page');
    p.innerHTML = 'Page : ' + data.metadata.current_page + '/' + data.metadata.page_count;
    var x = '';
    var card = '';
    for(var i = 0; i < d.length; i++){
        x += '<div class="col-md-5 mx-auto">'
             +  '<div class="card mt-3">'
             +  '<img class="card-img-top" src="' + d[i].poster + '">'
             +  '<div class="card-body">'
             +  '<h5 class="card-title">' + d[i].id + ' ' + d[i].title + '</h5>'
             +  '<p class="card-text"> imdb rating : ' + d[i].imdb_rating + '<br>'
             +  'year : ' + d[i].year + '<br>'
             +  'country : ' + d[i].country + '<br>'
             +  'genres : [' + d[i].genres[0] + ' , ' + d[i].genres[1] + "]<br></p>"
             +  '<button href="#" class="btn btn-primary">Go somewhere</button>'
             +  '</div></div></div>';
        
        
    } 
    mainDiv.innerHTML = x; 
}

function getData(num){

    fetch('https://moviesapi.ir/api/v1/movies?page=' + num)
    .then(function (response){
        return response.json();
    })
    .then(function (data){
        setData(data);
    })
    .catch(function (err){
        console.log('Error : ' + err);
    })

}

function setData(data)
{
    var mainData = data.data;
    let parentDiv = document.getElementById('div1');
    parentDiv.innerText.replace(/(<([^>]+)>)/ig, '');
    var p = document.getElementById('page');
    p.innerHTML = 'Page : ' + data.metadata.current_page + '/' + data.metadata.page_count;
    var htmlTemplate = '';
    for(var i = 0; i < mainData.length; i++){
        htmlTemplate += '<div class="col-md-5 mx-auto">'
                        +  '<div class="card mt-3">'
                        +  '<img class="card-img-top" src="' + mainData[i].poster + '">'
                        +  '<div class="card-body">'
                        +  '<h5 class="card-title">' + mainData[i].id + ' ' + mainData[i].title + '</h5>'
                        +  '<p class="card-text"> imdb rating : ' + mainData[i].imdb_rating + '<br>'
                        +  'year : ' + mainData[i].year + '<br>'
                        +  'country : ' + mainData[i].country + '<br>'
                        +  'genres : [' + mainData[i].genres[0] + ' , ' + mainData[i].genres[1] + "]<br></p>"
                        +  '<button href="#" class="btn btn-primary">Go somewhere</button>'
                        +  '</div></div></div>';
    }
    parentDiv.innerHTML = htmlTemplate;
}

function nextPage()
{
    var p = document.getElementById('page').innerText;
    var num = p.split(" ");
    var number = parseInt(num[2]);
    if(number === 25){
        alert('This is the last page!');
    }
    getData(number + 1);
}

function previousPage()
{
    var p = document.getElementById('page').innerText;
    var num = p.split(" ");
    var number = parseInt(num[2]);
    if(number === 1){
        alert('This is page 1!');
    } else {
        getData(number - 1);
    }   
}