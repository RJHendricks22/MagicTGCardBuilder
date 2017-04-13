$( document ).ready(function() {
  console.log( "ready!" );

  let randomNum = function(length){
    return Math.floor(Math.random()*Number(length))
  };
  let randomPage = function(maxim, minim) {
    return Math.floor(Math.random()*(Number(maxim)-Number(minim))+Number(minim + .999))
  }
  // splits the name of the card, and rejoins it on '+'s so it links to the search on magiccards.info
  let namesplit = function(str) {
    let split = str.split(' ');
    let restring = split.join('+')
    return restring
  }
  //ajax api call for the card pictures with animation
  let getData = function(){
    $.ajax({
      url: 'https://api.magicthegathering.io/v1/cards?page='+randomPage(225, 219),
      method: 'GET',
      success: function(data) {
        let i = randomNum((data.cards.length - 3));
        $('#card1').removeClass('animated fadeInUp');
        $('#card2').removeClass('animated fadeInUp');
        $('#card3').removeClass('animated fadeInUp');
        $('#card1').attr('src',data.cards[i].imageUrl);
        $('#card2').attr('src',data.cards[i + 1].imageUrl);
        $('#card3').attr('src',data.cards[i + 2].imageUrl);
        $('#card1link').attr("href","http://magiccards.info/query?q="+namesplit(data.cards[i].name)+"&v=list&s=issue")
        $('#card2link').attr("href","http://magiccards.info/query?q="+namesplit(data.cards[i+1].name)+"&v=list&s=issue")
        $('#card3link').attr("href","http://magiccards.info/query?q="+namesplit(data.cards[i+2].name)+"&v=list&s=issue")
        setInterval(function(){
          $('#card1').addClass('animated fadeInUp');
          $('#card2').addClass('animated fadeInUp');
          $('#card3').addClass('animated fadeInUp');
        }, 0)
      }
    })
  }

  getData();
  setInterval(getData, 8000);

  // ajax api call for the sample text on the card generation page
  let getSample = function(){
    $.ajax({
      url: 'https://api.magicthegathering.io/v1/cards?page=222',
      method: 'GET',
      success: function(data) {
        let i = randomNum((data.cards.length - 15))
        $('#text1').text(data.cards[i].text)
        $('#text2').text(data.cards[i+1].text) 
        $('#text3').text(data.cards[i+2].text) 
        $('#text4').text(data.cards[i+3].text) 
        $('#text5').text(data.cards[i+4].text)  
      }
    })
  }
  getSample();
  setInterval(getSample, 15000);

  //This is the attempt at saving the card file as a JPG, but it does not work yet, gotten from here: http://codepedia.info/convert-html-to-image-in-jquery-div-or-table-to-jpg-png/
  //i think i know what i need to do to make this work but it would require me to redesign how the card is rendered
  var element = $("#showcard"); // global variable
  var getCanvas; // global variable

  $("#btn-Preview-Image").on('click', function () {
    html2canvas(element, {
      onrendered: function (canvas) {
        $("#previewImage").append(canvas);
        getCanvas = canvas;
      }
    });
  });
  //*
  $("#btn-Convert-Html2Image").on('click', function () {
    var imgageData = getCanvas.toDataURL("image/png");
    // Now browser starts downloading it instead of just showing it
    var newData = imgageData.replace(/^data:image\/png/, "data:application/octet-stream");
    $("#btn-Convert-Html2Image").attr("download", "your_pic_name.png").attr("href", newData);
  });
  
  
});