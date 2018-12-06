function showHint(str){
    if(str.length==0){
        document.getElementById("idveld").innerHTML = "";
        return;
    }        
    else{
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function(){
            if (this.readyState == 4 && this.status == 200){ 
                var table="<tr><th>Titel</th><th>Artiest</th><th>AantalStemmen</th></tr>";
                for(i=0;i<JSON.parse(this.responseText).length;i++){
                    table += "<tr><td>" +JSON.parse(this.responseText)[i].titel + "</td><td>" + JSON.parse(this.responseText)[i].artiestNaam +"</td><td>"+JSON.parse(this.responseText)[i].aantStemmen +"</td></tr>";                
                    
                }
                document.getElementById("idveld").innerHTML = table;
            }
        };
        xmlhttp.open("GET", "/liedje/zoek?q="+str, true);
        xmlhttp.send();
    }
};
