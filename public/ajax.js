function showHint(str){
    if(str.length==0){
        document.getElementById("idveld").innerHTML = "";
        return;
    }        
    else{
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){ 
                
                    document.getElementById("idveld").innerHTML = this.responseText;                
                
            }
        };
        xmlhttp.open("GET", "/liedje/zoek?q="+str, true);
        xmlhttp.send();
    }
};
