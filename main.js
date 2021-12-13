prediction1="";
prediction2="";
Webcam.set({
    width:350,
    height:300,
    image_format:"jpg",
    jpg_quality:100
});
cam=document.getElementById("camera");
Webcam.attach(cam);

function capture(){
    Webcam.snap(function(data_uri){
       document.getElementById("result").innerHTML='<img id="picture" src="'+data_uri+'">'; 
    });
}

console.log("ml5version",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/tELuQ1pYW/model.json",Model_Ready);
function Model_Ready(){
    console.log("Model Loaded");
}

function speak(){
  var  synth=window.speechSynthesis;
  speak_data1="The First Prediction is"+prediction1;
  speak_data2="The Second Prediction is"+prediction2;
utter_this=new SpeechSynthesisUtterance(speak_data1+speak_data2);
synth.speak(utter_this);
}

function detect(){
    var img=document.getElementById("picture");
    classifier.classify(img,gotResult);

}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name1").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        prediction1=results[0].label;
        prediction2=results[1].label;
        speak();
        if(results[0].label=="sleepy"){
            document.getElementById("result_emoji1").innerHTML="&#128542;";
        }
        
        if(results[0].label=="angry"){
            document.getElementById("result_emoji1").innerHTML="&#128545;";
        }
        
        if(results[0].label=="victory"){
            document.getElementById("result_emoji1").innerHTML="&#9996;";
        }

        if(results[1].label=="sleepy"){
            document.getElementById("result_emoji2").innerHTML="&#128542;";
        }
        
        if(results[1].label=="angry"){
            document.getElementById("result_emoji2").innerHTML="&#128545;";
        }
        
        if(results[1].label=="victory"){
            document.getElementById("result_emoji2").innerHTML="&#9996;";
        }


    }
}

