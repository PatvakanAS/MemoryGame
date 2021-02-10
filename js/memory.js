$(function () {
    var imgCount = 10;
    var imgArray = [];

    for(var i = 1; i <= imgCount; i++){
        imgArray.push("pic" + i);
    }
    console.log(imgArray);

    function shuffle(array) {
        var rand, index = -1,
            length = array.length,
            result = Array(length);
        while (++index < length) {
            rand = Math.floor(Math.random() * (index + 1));
            result[index] = result[rand];
            result[rand] = array[index];
        }
        return result;
    }
    var shuffleImg_1 = shuffle(imgArray);
    var shuffleImg = shuffleImg_1.concat(shuffle(shuffleImg_1));
    shuffle(shuffleImg);
    console.log(shuffleImg);

    for(var i = 0; i < shuffleImg.length; i++){
        var div = $("<div>");
        var img = $("<div>");
        div.addClass("block");
        img.addClass(shuffleImg[i]);
        img.addClass("hide");
        div.append(img);
        $(".c").prepend(div);
        div.attr("data-block", shuffleImg[i]);
    }

    var step = 1;
    var clickedArray = [];
    var step2 = 0;

    $(".block").on("click", function () {
        $(this).find("div").removeClass("hide");
        if ($(this).hasClass("clicked") || $(this).hasClass("match")){
            return false;
        }

        $(this).addClass("clicked");
        clickedArray.push($(this).data("block"));
        if(step %2 == 0){
            // console.log(clickedArray);
            if(clickedArray[0] == clickedArray[1]){
                // console.log(clickedArray + " true");
                $(".clicked").addClass("match");
                $(".match").find("div").removeClass("hide");
                clickedArray = [];
                step2++;
                    $("<audio>").attr({
                        'src':'audio/true.mp3',
                        'volume':0.4,
                        'autoplay':'autoplay'
                    }).append(".c");
            }
            else {
                // console.log(clickedArray + " else");
                $(".clicked").addClass("not-match");
                $(".match").removeClass("not-match");
                clickedArray = [];
                    $("<audio>").attr({
                        'src':'audio/false.mp3',
                        'volume':0.4,
                        'autoplay':'autoplay'
                    }).append(".c");

                setTimeout(function(){
                    $(".not-match").find("div").addClass("hide");
                }, 400);
                $(".block").removeClass("clicked");
            }
        }
        step++;
        if(step2 == 10){
            $(".block").removeClass("block");
            $("#end").addClass("end");
            $("<audio>").attr({
                'src':'audio/finish.mp3',
                'volume':0.4,
                'autoplay':'autoplay',
                'loop':'loop'
            }).append(".c");
        }
    })
    $(".block").on("click",function(){
        $("<audio>").attr({
            'src':'audio/click.mp3',
            'volume':0.4,
            'autoplay':'autoplay'
        }).append(".c");
    });

});
