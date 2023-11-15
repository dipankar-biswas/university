const offerWrap = document.querySelector(".offer-wrap");
if(offerWrap){

    const offers = document.querySelector(".offers");
    const firstCardWidth = offers.querySelector(".item").offsetWidth;
    const arrowBtns = offerWrap.querySelectorAll(".arrow .icon");
    const offersChildrens = [...offers.children];
    
    let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;
    
    // Get the number of items that can fit in the offers at once
    let itemPerView = Math.round(offers.offsetWidth / firstCardWidth);
    
    // Insert copies of the last few items to beginning of offers for infinite scrolling
    offersChildrens.slice(-itemPerView).reverse().forEach(item => {
        offers.insertAdjacentHTML("afterbegin", item.outerHTML);
    });
    
    // Insert copies of the first few items to end of offers for infinite scrolling
    offersChildrens.slice(0, itemPerView).forEach(item => {
        offers.insertAdjacentHTML("beforeend", item.outerHTML);
    });
    
    // Scroll the offers at appropriate postition to hide first few duplicate items on Firefox
    offers.classList.add("no-transition");
    offers.scrollLeft = offers.offsetWidth;
    offers.classList.remove("no-transition");
    
    // Add event listeners for the arrow buttons to scroll the offers left and right
    arrowBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            offers.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
        });
    });
    
    const dragStart = (e) => {
        isDragging = true;
        offers.classList.add("dragging");
        // Records the initial cursor and scroll position of the offers
        startX = e.pageX;
        startScrollLeft = offers.scrollLeft;
    }
    
    const dragging = (e) => {
        if(!isDragging) return; // if isDragging is false return from here
        // Updates the scroll position of the offers based on the cursor movement
        offers.scrollLeft = startScrollLeft - (e.pageX - startX);
    }
    
    const dragStop = () => {
        isDragging = false;
        offers.classList.remove("dragging");
    }
    
    const infiniteScroll = () => {
        // If the offers is at the beginning, scroll to the end
        if(offers.scrollLeft === 0) {
            offers.classList.add("no-transition");
            offers.scrollLeft = offers.scrollWidth - (2 * offers.offsetWidth);
            offers.classList.remove("no-transition");
        }
        // If the offers is at the end, scroll to the beginning
        else if(Math.ceil(offers.scrollLeft) === offers.scrollWidth - offers.offsetWidth) {
            offers.classList.add("no-transition");
            offers.scrollLeft = offers.offsetWidth;
            offers.classList.remove("no-transition");
        }
    
        // Clear existing timeout & start autoplay if mouse is not hovering over offers
        clearTimeout(timeoutId);
        if(!offerWrap.matches(":hover")) autoPlay();
    }
    
    const autoPlay = () => {
        if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
        // Autoplay the offers after every 2500 ms
        timeoutId = setTimeout(() => offers.scrollLeft += firstCardWidth, 2500);
    }
    autoPlay();
    
    offers.addEventListener("mousedown", dragStart);
    offers.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    offers.addEventListener("scroll", infiniteScroll);
    offerWrap.addEventListener("mouseenter", () => clearTimeout(timeoutId));
    offerWrap.addEventListener("mouseleave", autoPlay);
}