//alert("pleb");
function myFunc(){
var checker = document.getElementById('orderChecked');
var textArea = document.getElementById('textArea');


textArea.disabled = true;
checker.onchange = function(){
if(this.checked){
    textArea.disabled = false;
} else {
    textArea.disabled = true;
}
}
}
