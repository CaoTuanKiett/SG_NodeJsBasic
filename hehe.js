
// let call = (x) =>{
//     let arr = [];
//     if(x > 0) {
//         let a = x % 10;
//         arr.push(a);
//         x = Math.floor(x/10);
//         call(x);
//     }
    
// }

// console.log(arr);

// let isPalindrome = function(x) {
//     console.log(call(x));

// };








// ==========================
function palindrome(str) {

    var len = str.length;
    var mid = Math.floor(len/2);

    for ( var i = 0; i < mid; i++ ) {
        if (str[i] !== str[len - 1 - i]) {
            return false;
        }
    }

    return true;
}

palindrome(121);



