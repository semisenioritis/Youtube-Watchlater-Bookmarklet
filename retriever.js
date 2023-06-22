fetch('https://script.google.com/macros/s/your_own_custom_appscript_api_endpoint_here/exec', 
{ 
    redirect: "follow", 
    method: "GET",         
    headers: { 
        "Content-Type": "text/plain;charset=utf-8", 
    }, 
})
.then((response) => response.json())
.then((data) => {

 console.log(data["status"]);
 var myobj = JSON.parse(data["status"]);
 var vidindx = myobj["indx"];
 var vidname = myobj["vidtitle"];
 var vidurl = myobj["vidid"];
 var viddate = myobj["savedate"];
 window.open("https://www.youtube.com/watch?v="+vidurl, '_blank');
 alert("Video Title : \n"+vidname+"\nSaved on :  "+viddate);

});
