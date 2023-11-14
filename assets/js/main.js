// Overlay Div 
let site_overly = document.querySelector('.site-overly');

// Aside Open/Close
let aside_open_btn = document.querySelector('.layout-header .aside-open');
let aside_close_btn = document.querySelector('aside .brand .aside-close');
let aside = document.querySelector('#apps aside');

aside_open_btn.addEventListener('click',function(){
    aside.classList.add('show');
    site_overly.classList.add('show');
});
aside_close_btn.addEventListener('click',function(){
    aside.classList.remove('show');
    site_overly.classList.remove('show');
});
let link_item = document.querySelectorAll("aside nav .navbar-nav li a.link-item");
for(let i = 0; i < link_item.length; i++){
    link_item[i].addEventListener('click',function(){
        aside.classList.remove('show');
        site_overly.classList.remove('show');
    });
}


// Overly Click All Close
site_overly.addEventListener('click',function(){
    this.classList.remove("show");
    aside.classList.remove("show");
});



// User Options Open/Close
let user_options_btn = document.querySelector('.layout-header .avatar .user-options-btn');
let user_options = document.querySelector('.layout-header .avatar .user-options');
let user_options_head = document.querySelector('.layout-header .avatar .user-options .head');
window.addEventListener('mouseup',function(event){
    if(user_options_btn == event.target.closest(".avatar .user-options-btn")){
        user_options.classList.toggle('show');
    }else{
        if(event.target == user_options_head || event.target.closest(".user-options .head") == user_options_head){
            return false;
        }else if(event.target != user_options && event.target.parentNode != user_options){
            user_options.classList.remove("show");
        }
    }
}); 



// Image Select
let imageSelect = document.querySelectorAll('.thumbnail .imageSelect');
let imageDefault = document.querySelectorAll('.thumbnail .imageDefault');
let fileOpen = document.querySelectorAll('.thumbnail .fileOpen');
let ImageRemove = document.querySelectorAll('.thumbnail .ImageRemove');

imageSelect.forEach((select,index) => {
    select.addEventListener('click', function(){
        this.closest('.thumbnail').querySelector('.fileOpen').click();
    })
});


fileOpen.forEach((file,index) => {
    file.addEventListener('change', function(event){
        let isThis = this;
        let reader = new FileReader();
        reader.onload = function(){
            imageDefault[index].style.display = "none";
            ImageRemove[index].style.display = "block";
            isThis.closest('.thumbnail').querySelector('.imagePreview').style.display = "block";
            let imagePreview = isThis.closest('.thumbnail').querySelector('.imagePreview');
            imagePreview.src = reader.result;
        };
        reader.readAsDataURL(event.target.files[0]); 
    })
});

ImageRemove.forEach((remove,index) => { 
    remove.addEventListener('click', function(){
        remove.style.display = "none";
        this.closest('.thumbnail').querySelector('.fileOpen').value = null;
        this.closest('.thumbnail').querySelector('.imagePreview').src = null;
        this.closest('.thumbnail').querySelector('.imagePreview').style.display = "none";
        this.closest('.thumbnail').querySelector('.imageDefault').style.display = "block";
    })
});
















