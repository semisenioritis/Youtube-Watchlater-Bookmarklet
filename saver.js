// To use this code as a bookmarklet, remove all line breaks and comments in the code and add the comment bellow to the start of the code. After this all code along with the below comment should be on a single line. Also dont forget to replace the dummy google appscript endpoint with your own endpoint.
// javascript:
var a = window.location.href; 

function youtube_parser(url) { 
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
      return [match[2], "normal"];
    } 
    else if(match && match[2].length == 12 && match[1] == "shorts"){
        return [match[2].substring(1), "shorts"];
    }
    else {
      return false;
    } 
} ;

function displayer(data, video_title) { 
    var w = window.open('', '', 'width=150,height=100,resizable=no,toolbar=no,top=120,left=1000'); 
    w.document.write("<style>body {font-family: 'Bebas Neue';font-size: 22px;}</style>"); 
    w.document.write("<body>"); 
    w.document.write(video_title); 
    w.document.write("<br>"); 
    w.document.write(data.status); 
    w.document.write("</body>"); 
    setTimeout(function () { w.close(); }, 4000); 
} ;

processor=youtube_parser(a);
const tex_id=String(processor[0]);
const ttype=String(processor[1]);
 
console.log(tex_id);


if (ttype == "normal") {
    var video_title= document.getElementsByClassName("title style-scope ytd-video-primary-info-renderer")[0].innerText;
};
else if (ttype == "shorts") {
    var video_title= document.getElementsByClassName("title style-scope ytd-reel-player-header-renderer")[0].innerText;
};


fetch('###Add your google appscript webapp url here, (for eg. https://script.google.com/macros/s/something_something_and_identifiers_for_the_api_endpoint/exec)###', 
{ 
    redirect: "follow", method: "POST", body: JSON.stringify({ "videoid": tex_id, "video_title": video_title }), headers: { "Content-Type": "text/plain;charset=utf-8", }, 
});
.then((response) => response.json())
.then((data) => displayer(data, video_title));


