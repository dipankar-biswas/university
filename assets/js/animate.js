
window.addEventListener("load", (event) => {
    document.querySelectorAll('.animation')[0].classList.add('animate');
});

let animations = document.querySelectorAll('.animation');
let countValue = 1;
window.onscroll = () => {
    animations.forEach((animate,index) => {
        let top = window.scrollY;
        let offset = animate.offsetTop - 300;
        let height = animate.offsetHeight;
        
        if(top >= offset && top < offset + height){
            animate.classList.add('animate');
        }
        // else{
        //     animate.classList.remove('animate');
        // }
    })
}