//alert("pleb");
function myFunc(){
var checker = document.getElementsByName('checkbox');
var textArea = document.getElementsByName('textArea');

// for(var i=0; i< textArea.length; i++) {
//     textArea[i].disabled = true;
// }
// $('.Blocked').change( function() {
//     var isChecked = this.checked;
//
//     if(isChecked) {
//         $(this).parents("tr:eq(0)").find(".textArea").prop("disabled",true);
//     } else {
//         $(this).parents("tr:eq(0)").find(".textArea").prop("disabled",false);
//     }
//
// });
}

function handleClick(ele){

  // var checkboxes = document.getElementsByTagName('input');
  //    if (ele.checked) {
  //        for (var i = 0; i < checkboxes.length; i++) {
  //            if (checkboxes[i].type == 'checkbox') {
  //                //checkboxes[i].checked = true;
  //                checkboxes[i].disabled = true;
  //            }
  //        }
  //    } else {
  //        for (var i = 0; i < checkboxes.length; i++) {
  //            console.log(i)
  //            if (checkboxes[i].type == 'checkbox') {
  //                //checkboxes[i].checked = false;
  //                checkboxes[i].disabled = false;
  //            }
  //        }
  //    }
  // var checker = document.getElementsByName('checkbox');
  // var textArea = document.getElementsByName('textArea');
  //
  // if(checker.checked){
  //     console.log('boop');
  //     textArea.disabled = false;
  // } else {
  //     textArea.disabled = true;
  // }
}

// checker[i].onchange = function(){
// if(this.checked){
//     textArea[i].disabled = false;
// } else {
//     textArea[i].disabled = true;
// }
// }
// for (var i=0, len=checker.length; i<len; i++) {
//     if ( checker[i].type === 'checkbox' ) {
//         checker[i].onclick = function() {
//           console.log('here');
//           if(this.checked){
//               textArea[i].disabled = false;
//           } else {
//               textArea[i].disabled = true;
//           }
//         }
//     }
// }



//
// console.log('im here');
// checker.onclick = function(){
//   console.log('boop');
//   if(this.checked){
//       textArea.disabled = false;
//   } else {
//       textArea.disabled = true;
//   }
// }
//


//display("Clicked, new value = " + cb.checked);




// In most circumstances you may also want to add the following line to clear the
// text area if the user unchecks the box after having entered text already: document.getElementById('yourText').value = ''
