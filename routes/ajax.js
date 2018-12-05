function showHint(str){
    console.log('in showHint');
    if(str.length==0){
        document.getElementById("idveld").innerHTML = "";
        return;
    }        
    else{
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(){
            console.log('in ajax');
            if (this.readyState == 4 && this.status == 200){ 
                console.log('in ajax2');
                document.getElementById("idveld").innerHTML = this.responseText;
            }
            xmlhttp.open("GET", "/liedje/zoek" + str, true);
            xmlhttp.send();
        };
    }
};