function main(){
    if(document.querySelector('.imageView')){
        const imageView = document.querySelectorAll('.imageView');
    
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                const img = entry.target;
                
                if (entry.isIntersecting) {
                    const realSrc = img.getAttribute("data-src");
                    if (realSrc) {
                        img.src = realSrc;
                    }
                    observer.unobserve(img);
                }
            });
        });

        imageView.forEach((img) => {
            if (!img.width) {
                const realImage = new Image();
                realImage.src = img.getAttribute("data-src");
                
                realImage.onload = () => {
                    img.width = realImage.width;
                };
            }

            observer.observe(img);
        });

        imageView.forEach( (image, index) => {
            image.addEventListener('click',()=>{
                const template = `
                    <div class="imageViewWrapper">
                        <div class="box">
                            <button class="previous button">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288 480 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-370.7 0 73.4-73.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-128 128z"/></svg>
                            </button>
                            <img class="imageDisplay" src="${image.getAttribute("data-src")}" alt="" index="${index}">
                            <button class="next button">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"/></svg>
                            </button>
                        </div>
                    </div>
                `
                document.body.insertAdjacentHTML('beforeend',template);
                if(index == 0) {
                    document.querySelector('.previous').classList.add('disabled'); 
                    document.querySelector('.previous').disabled = true;
                }
                if(index == imageView.length - 1){
                    document.querySelector('.next').classList.add('disabled'); 
                    document.querySelector('.next').disabled = true;
                }
            })
        })

    }

    document.body.addEventListener('click', (e) => {
        const imageView = document.querySelectorAll('.imageView');

        if(e.target && e.target.closest('.imageViewWrapper') === e.target){
            document.querySelector('.imageViewWrapper').remove();
        }

        if(e.target && e.target.closest('.button')){
            let imageDisplay = document.querySelector('.imageDisplay');

            if(e.target.closest('.button').classList.contains('previous')){ 
                imageDisplay.setAttribute('src',imageView[Number(imageDisplay.getAttribute('index')) - 1].getAttribute("data-src"))
                imageDisplay.setAttribute('index', Number(imageDisplay.getAttribute('index')) - 1)
            
                
            }

            if(e.target.closest('.button').classList.contains('next')){
                imageDisplay.setAttribute('src', imageView[Number(imageDisplay.getAttribute('index')) + 1].getAttribute("data-src"))
                imageDisplay.setAttribute('index', Number(imageDisplay.getAttribute('index')) + 1)

            }
            
            if(checkImageIndex(imageDisplay.getAttribute('index'))) {
                e.target.closest('.button').classList.add('disabled'); 
                e.target.closest('.button').disabled = true;
            }else{
                let disabledButton = document.querySelector('.button.disabled');
                if (disabledButton) {
                    disabledButton.classList.remove('disabled'); 
                    disabledButton.disabled = false;
                }
            }
        }

        if (e.target && e.target.closest('.open-info')) {
            document.querySelector('.info').style.display = "flex";
        }
        if (e.target && e.target.closest('.close-info')) {
            document.querySelector('.info').style.display = "none";
        }
    })

    function checkImageIndex(num) {
        const imageView = document.querySelectorAll('.imageView');
        num = Number(num);
        if(num == imageView.length - 1 || num == 0) return true;
        return false;
    }

    if(screen.width < 601 || screen.width < 801){
        document.querySelector('.info').style.display = "none";
    }
}
main();
const menuButton = document.querySelectorAll('.menuButton');
const content = document.querySelector('.content');
menuButton.forEach( (button) => {
    button.addEventListener('click', ()=>{
        let template;
        let title;
        if(button.getAttribute("data-page") == "home"){
            title = "Home";
            template = `
                <div class="item">
                    <h2 class="title">About <a>Me</a></h2>
                    <div class="text">
                        <div class="intro">
                            Welcome to my website. My name is Khang. I'm a senior student at FPT Polytechnic College in Da Nang City, majoring in Information Technology. Currently, I'm a back-end developer, and I'm doing my best to become a better developer. <br>
                            One of my favorite quotes is: <br>
                            <a>"If you want to, you'll find a way. If you don't, you'll find an excuse."</a>
                        </div>
                        <ul>
                            <li><a>Age</a> 21</li>
                            <li><a>Address</a> Nguyen Luong Bang, Lien Chieu, Da Nang</li>
                            <li><a>Email</a> vovankhang11102004@gmail.com</li>
                            <li><a>Phone</a> 0346074020</li>
                        </ul>
                    </div>
                </div>
                
                <div class="item">
                    <h2 class="title">What can <a>I do?</a></h2>
                    <div class="list">
                        <div class="item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#00c8e2" class="bi bi-window-dock" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M15 5H1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5zm0-1H1V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v1zm1-1a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3z"></path>
                                <path d="M3 11.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm4 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm4 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"></path>
                            </svg>
                            <h1>Web development</h1>
                            <p>I can develop websites implement application features, and integrate security.</p>
                        </div>
                        <div class="item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#00c8e2" class="bi bi-code-square" viewBox="0 0 16 16">
                                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
                                <path d="M6.854 4.646a.5.5 0 0 1 0 .708L4.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0zm2.292 0a.5.5 0 0 0 0 .708L11.793 8l-2.647 2.646a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708 0z"></path>
                            </svg>
                            <h1>Design Website</h1>
                            <p>I can design modern websites that meet customer requirements.</p>
                        </div>
                    </div>
                </div>
            `
        }else if(button.getAttribute("data-page") == "resume"){
            title = "Resume";
            template = `
                <div class="item">
                    <h2 class="title">My <span>Resume</span></h2>
                    <div class="resume">
                        <div class="left">
                            <div class="education">
                                <h3>Education</h3>
                                <p>
                                    <span>2024</span> <br>
                                    Currently, I'm a senior student at FPT Polytechnic College in Da Nang City, majoring in information technology.
                                </p>
                            </div>
                            <div class="codingSkills">
                                <h3>Coding <a>Skills</a></h3>
                                <div class="list">

                                    <div title="PHP">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#00c8e2" viewBox="0 0 640 512"><path d="M320 104.5c171.4 0 303.2 72.2 303.2 151.5S491.3 407.5 320 407.5c-171.4 0-303.2-72.2-303.2-151.5S148.7 104.5 320 104.5m0-16.8C143.3 87.7 0 163 0 256s143.3 168.3 320 168.3S640 349 640 256 496.7 87.7 320 87.7zM218.2 242.5c-7.9 40.5-35.8 36.3-70.1 36.3l13.7-70.6c38 0 63.8-4.1 56.4 34.3zM97.4 350.3h36.7l8.7-44.8c41.1 0 66.6 3 90.2-19.1 26.1-24 32.9-66.7 14.3-88.1-9.7-11.2-25.3-16.7-46.5-16.7h-70.7L97.4 350.3zm185.7-213.6h36.5l-8.7 44.8c31.5 0 60.7-2.3 74.8 10.7 14.8 13.6 7.7 31-8.3 113.1h-37c15.4-79.4 18.3-86 12.7-92-5.4-5.8-17.7-4.6-47.4-4.6l-18.8 96.6h-36.5l32.7-168.6zM505 242.5c-8 41.1-36.7 36.3-70.1 36.3l13.7-70.6c38.2 0 63.8-4.1 56.4 34.3zM384.2 350.3H421l8.7-44.8c43.2 0 67.1 2.5 90.2-19.1 26.1-24 32.9-66.7 14.3-88.1-9.7-11.2-25.3-16.7-46.5-16.7H417l-32.8 168.7z"/></svg>
                                    </div>
                                    <div title="Css">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#00c8e2" viewBox="0 0 384 512"><path d="M0 32l34.9 395.8L192 480l157.1-52.2L384 32H0zm313.1 80l-4.8 47.3L193 208.6l-.3 .1h111.5l-12.8 146.6-98.2 28.7-98.8-29.2-6.4-73.9h48.9l3.2 38.3 52.6 13.3 54.7-15.4 3.7-61.6-166.3-.5v-.1l-.2 .1-3.6-46.3L193.1 162l6.5-2.7H76.7L70.9 112h242.2z"/></svg>
                                    </div>
                                    <div title="Html">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#00c8e2" viewBox="0 0 384 512"><path d="M0 32l34.9 395.8L191.5 480l157.6-52.2L384 32H0zm308.2 127.9H124.4l4.1 49.4h175.6l-13.6 148.4-97.9 27v.3h-1.1l-98.7-27.3-6-75.8h47.7L138 320l53.5 14.5 53.7-14.5 6-62.2H84.3L71.5 112.2h241.1l-4.4 47.7z"/></svg>
                                    </div>
                                    <div title="Javascript">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="#00c8e2" viewBox="0 0 448 512"><path d="M0 32v448h448V32H0zm243.8 349.4c0 43.6-25.6 63.5-62.9 63.5-33.7 0-53.2-17.4-63.2-38.5l34.3-20.7c6.6 11.7 12.6 21.6 27.1 21.6 13.8 0 22.6-5.4 22.6-26.5V237.7h42.1v143.7zm99.6 63.5c-39.1 0-64.4-18.6-76.7-43l34.3-19.8c9 14.7 20.8 25.6 41.5 25.6 17.4 0 28.6-8.7 28.6-20.8 0-14.4-11.4-19.5-30.7-28l-10.5-4.5c-30.4-12.9-50.5-29.2-50.5-63.5 0-31.6 24.1-55.6 61.6-55.6 26.8 0 46 9.3 59.8 33.7L368 290c-7.2-12.9-15-18-27.1-18-12.3 0-20.1 7.8-20.1 18 0 12.6 7.8 17.7 25.9 25.6l10.5 4.5c35.8 15.3 55.9 31 55.9 66.2 0 37.8-29.8 58.6-69.7 58.6z"/></svg>
                                    </div>

                                </div>
                            </div>
                            <div class="libraries">
                                <h3>Libraries</h3>
                                <div class="list">

                                    <div title="React JS">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M418.2 177.2c-5.4-1.8-10.8-3.5-16.2-5.1 .9-3.7 1.7-7.4 2.5-11.1 12.3-59.6 4.2-107.5-23.1-123.3-26.3-15.1-69.2 .6-112.6 38.4-4.3 3.7-8.5 7.6-12.5 11.5-2.7-2.6-5.5-5.2-8.3-7.7-45.5-40.4-91.1-57.4-118.4-41.5-26.2 15.2-34 60.3-23 116.7 1.1 5.6 2.3 11.1 3.7 16.7-6.4 1.8-12.7 3.8-18.6 5.9C38.3 196.2 0 225.4 0 255.6c0 31.2 40.8 62.5 96.3 81.5 4.5 1.5 9 3 13.6 4.3-1.5 6-2.8 11.9-4 18-10.5 55.5-2.3 99.5 23.9 114.6 27 15.6 72.4-.4 116.6-39.1 3.5-3.1 7-6.3 10.5-9.7 4.4 4.3 9 8.4 13.6 12.4 42.8 36.8 85.1 51.7 111.2 36.6 27-15.6 35.8-62.9 24.4-120.5-.9-4.4-1.9-8.9-3-13.5 3.2-.9 6.3-1.9 9.4-2.9 57.7-19.1 99.5-50 99.5-81.7 0-30.3-39.4-59.7-93.8-78.4zM282.9 92.3c37.2-32.4 71.9-45.1 87.7-36 16.9 9.7 23.4 48.9 12.8 100.4-.7 3.4-1.4 6.7-2.3 10-22.2-5-44.7-8.6-67.3-10.6-13-18.6-27.2-36.4-42.6-53.1 3.9-3.7 7.7-7.2 11.7-10.7zM167.2 307.5c5.1 8.7 10.3 17.4 15.8 25.9-15.6-1.7-31.1-4.2-46.4-7.5 4.4-14.4 9.9-29.3 16.3-44.5 4.6 8.8 9.3 17.5 14.3 26.1zm-30.3-120.3c14.4-3.2 29.7-5.8 45.6-7.8-5.3 8.3-10.5 16.8-15.4 25.4-4.9 8.5-9.7 17.2-14.2 26-6.3-14.9-11.6-29.5-16-43.6zm27.4 68.9c6.6-13.8 13.8-27.3 21.4-40.6s15.8-26.2 24.4-38.9c15-1.1 30.3-1.7 45.9-1.7s31 .6 45.9 1.7c8.5 12.6 16.6 25.5 24.3 38.7s14.9 26.7 21.7 40.4c-6.7 13.8-13.9 27.4-21.6 40.8-7.6 13.3-15.7 26.2-24.2 39-14.9 1.1-30.4 1.6-46.1 1.6s-30.9-.5-45.6-1.4c-8.7-12.7-16.9-25.7-24.6-39s-14.8-26.8-21.5-40.6zm180.6 51.2c5.1-8.8 9.9-17.7 14.6-26.7 6.4 14.5 12 29.2 16.9 44.3-15.5 3.5-31.2 6.2-47 8 5.4-8.4 10.5-17 15.5-25.6zm14.4-76.5c-4.7-8.8-9.5-17.6-14.5-26.2-4.9-8.5-10-16.9-15.3-25.2 16.1 2 31.5 4.7 45.9 8-4.6 14.8-10 29.2-16.1 43.4zM256.2 118.3c10.5 11.4 20.4 23.4 29.6 35.8-19.8-.9-39.7-.9-59.5 0 9.8-12.9 19.9-24.9 29.9-35.8zM140.2 57c16.8-9.8 54.1 4.2 93.4 39 2.5 2.2 5 4.6 7.6 7-15.5 16.7-29.8 34.5-42.9 53.1-22.6 2-45 5.5-67.2 10.4-1.3-5.1-2.4-10.3-3.5-15.5-9.4-48.4-3.2-84.9 12.6-94zm-24.5 263.6c-4.2-1.2-8.3-2.5-12.4-3.9-21.3-6.7-45.5-17.3-63-31.2-10.1-7-16.9-17.8-18.8-29.9 0-18.3 31.6-41.7 77.2-57.6 5.7-2 11.5-3.8 17.3-5.5 6.8 21.7 15 43 24.5 63.6-9.6 20.9-17.9 42.5-24.8 64.5zm116.6 98c-16.5 15.1-35.6 27.1-56.4 35.3-11.1 5.3-23.9 5.8-35.3 1.3-15.9-9.2-22.5-44.5-13.5-92 1.1-5.6 2.3-11.2 3.7-16.7 22.4 4.8 45 8.1 67.9 9.8 13.2 18.7 27.7 36.6 43.2 53.4-3.2 3.1-6.4 6.1-9.6 8.9zm24.5-24.3c-10.2-11-20.4-23.2-30.3-36.3 9.6 .4 19.5 .6 29.5 .6 10.3 0 20.4-.2 30.4-.7-9.2 12.7-19.1 24.8-29.6 36.4zm130.7 30c-.9 12.2-6.9 23.6-16.5 31.3-15.9 9.2-49.8-2.8-86.4-34.2-4.2-3.6-8.4-7.5-12.7-11.5 15.3-16.9 29.4-34.8 42.2-53.6 22.9-1.9 45.7-5.4 68.2-10.5 1 4.1 1.9 8.2 2.7 12.2 4.9 21.6 5.7 44.1 2.5 66.3zm18.2-107.5c-2.8 .9-5.6 1.8-8.5 2.6-7-21.8-15.6-43.1-25.5-63.8 9.6-20.4 17.7-41.4 24.5-62.9 5.2 1.5 10.2 3.1 15 4.7 46.6 16 79.3 39.8 79.3 58 0 19.6-34.9 44.9-84.8 61.4zm-149.7-15c25.3 0 45.8-20.5 45.8-45.8s-20.5-45.8-45.8-45.8c-25.3 0-45.8 20.5-45.8 45.8s20.5 45.8 45.8 45.8z"/></svg>                                    
                                    </div>
                                    <div title="Laravel">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M107.2 0c2.5 0 4.7 .8 6.7 2l94.3 54.1c2.7 1.5 4.5 3.5 5.4 5.9c.9 2.2 .9 4.3 .9 5.6l0 193.4 69.2-39.7 0-100.3c0-2.6 .6-5 2.2-7.2c1.5-2.1 3.5-3.6 5.7-4.8c0 0 0 0 0 0l94-54c1.6-.9 3.4-1.6 5.5-1.6s4 .7 5.6 1.6l95.8 55.1c2.3 1.3 3.9 3 4.9 5.3c.9 2.1 .9 4.2 .9 5.8l0 107.2c0 2-.2 4.3-1.4 6.4c-1.2 2.2-3 3.7-5.1 4.9l-.1 .1-88 50.5 0 100c0 2.3-.3 4.8-1.6 7c-1.3 2.2-3.3 3.7-5.3 4.9c0 0 0 0-.1 0L208.7 510c-2.2 1.2-4.5 2-7.1 2s-4.9-.9-7.1-2l-.1-.1L7.1 402l-.5-.3c-1.1-.7-2.6-1.7-3.8-2.9C.9 396.9 0 394.6 0 391.6L0 65.9c0-4.8 3-7.9 5.5-9.3L100.5 2c2-1.2 4.3-2 6.8-2zM38.1 67.1l69 39.9 69.2-39.9L107.1 27.4l-69 39.7zm353 93.2l69-39.7-69-39.7-69.1 39.7 69.1 39.7zM189.2 89L120 128.8l0 186.4 69.2-39.9 0-186.4zM94.5 128.9L25.2 89.1l0 294.2 164 94.2 0-79.4-87.3-49.3-.2-.1c-1.3-.8-3.2-1.9-4.6-3.7c-1.7-2.1-2.5-4.7-2.5-7.7l0-208.5zm214.7 92.4l69.3 39.6 0-78.5-69.3-39.9 0 78.8zm94.5 39.6L473 221.2l0-78.8-69.3 39.9 0 78.5zM201.6 376.1l163.8-93.2-69-39.9L133 337.1l68.6 38.9zm12.9 101.5l164-94.2 0-78.8-164 93.6 0 79.4z"/></svg>                                    
                                    </div>
                                    <div title="Bootstrap">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M333.5 201.4c0-22.1-15.6-34.3-43-34.3h-50.4v71.2h42.5C315.4 238.2 333.5 225 333.5 201.4zM517 188.6c-9.5-30.9-10.9-68.8-9.8-98.1c1.1-30.5-22.7-58.5-54.7-58.5H123.7c-32.1 0-55.8 28.1-54.7 58.5c1 29.3-.3 67.2-9.8 98.1c-9.6 31-25.7 50.6-52.2 53.1v28.5c26.4 2.5 42.6 22.1 52.2 53.1c9.5 30.9 10.9 68.8 9.8 98.1c-1.1 30.5 22.7 58.5 54.7 58.5h328.7c32.1 0 55.8-28.1 54.7-58.5c-1-29.3 .3-67.2 9.8-98.1c9.6-31 25.7-50.6 52.1-53.1v-28.5C542.7 239.2 526.5 219.6 517 188.6zM300.2 375.1h-97.9V136.8h97.4c43.3 0 71.7 23.4 71.7 59.4c0 25.3-19.1 47.9-43.5 51.8v1.3c33.2 3.6 55.5 26.6 55.5 58.3C383.4 349.7 352.1 375.1 300.2 375.1zM290.2 266.4h-50.1v78.4h52.3c34.2 0 52.3-13.7 52.3-39.5C344.7 279.6 326.1 266.4 290.2 266.4z"/></svg>                                    
                                    </div>
                                    <div title="Angular JS">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M185.7 268.1h76.2l-38.1-91.6-38.1 91.6zM223.8 32L16 106.4l31.8 275.7 176 97.9 176-97.9 31.8-275.7zM354 373.8h-48.6l-26.2-65.4H168.6l-26.2 65.4H93.7L223.8 81.5z"/></svg>                                    
                                    </div>

                                </div>
                            </div>
                            <div class="otherSkills">
                                <h3>Other <a>Skills</a></h3>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>Mysql</td>
                                            <td>SQL Server</td>
                                            <td>MVC</td>
                                            <td>PHP OOP</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="knowledge">
                                <h3>Knowledge</h3>
                                <table>
                                    <tr>
                                        <td>Photoshop</td>
                                        <td>Github</td>
                                        <td>Figma</td>
                                    </tr>
                                </table>
                            </div>
                        </div>

                        <div class="right">
                            <h3>Experience</h3>
                            <div class="list">
                                <div class="project">
                                    <span>7 - 2023</span> <br>
                                    <a target="_blank" href="https://github.com/Vo-Van-Khang/Electronics.git">Electronics Website</a> <br>
                                    <ul>
                                        <li>Database design</li>
                                        <li>Build front-end website</li>
                                        <li>Build back-end website</li>
                                        <li>Build a complete website</li>
                                    </ul>
                                </div>
                                <div class="project">
                                    <span>8 - 2023</span> <br>
                                    <a target="_blank" href="https://github.com/Vo-Van-Khang/Selling-snacks.git">Website selling snacks</a> <br>
                                    <ul>
                                        <li>Database design</li>
                                        <li>Build front-end website</li>
                                        <li>Build back-end website</li>
                                        <li>Build a complete website</li>
                                    </ul>
                                </div>
                                <div class="project">
                                    <span>1 - 2024</span> <br>
                                    <a target="_blank" href="https://github.com/Vo-Van-Khang/Milk-tea.git">Milk tea website</a> <br>
                                    <ul>
                                        <li>Database design</li>
                                        <li>Build front-end website</li>
                                        <li>Build back-end website</li>
                                        <li>Build a complete website</li>
                                    </ul>
                                </div>
                                <div class="project">
                                    <span>4 - 2024</span> <br>
                                    <a target="_blank" href="https://github.com/Vo-Van-Khang/News.git">News website</a> <br>
                                    <ul>
                                        <li>Database design</li>
                                        <li>Build front-end website</li>
                                        <li>Build back-end website</li>
                                        <li>Build a complete website</li>
                                    </ul>
                                </div>
                                <div class="project">
                                    <span>7 - 2024</span> <br>
                                    <a target="_blank" href="https://github.com/Vo-Van-Khang/DuAnTotNghiep.git">Online Movie website - Graduation Project</a> <br>
                                    <ul>
                                        <li>Database design</li>
                                        <li>Developed video streaming and uploading via Amazon S3</li>
                                        <li>Integrated a payment system for secure transactions</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
        }else{
            title = "Photos"
            template = `
                <div class="item">
                    <h2 class="title">My <a>Photos</a></h2>
                    <div class="photos">
                        <img class="imageView" src="./photos/lazy_image.svg" data-src="./photos/anh (1).jpg" alt="">
                        <img class="imageView" src="./photos/lazy_image.svg" data-src="./photos/anh (2).jpg" alt="">
                        <img class="imageView" src="./photos/lazy_image.svg" data-src="./photos/anh (3).jpg" alt="">
                        <img class="imageView" src="./photos/lazy_image.svg" data-src="./photos/anh (4).jpg" alt="">
                        <img class="imageView" src="./photos/lazy_image.svg" data-src="./photos/anh (5).jpg" alt="">
                        <img class="imageView" src="./photos/lazy_image.svg" data-src="./photos/anh (6).jpg" alt="">
                        <img class="imageView" src="./photos/lazy_image.svg" data-src="./photos/anh (7).jpg" alt="">
                        <img class="imageView" src="./photos/lazy_image.svg" data-src="./photos/anh (8).jpg" alt="">
                        <img class="imageView" src="./photos/lazy_image.svg" data-src="./photos/anh (9).jpg" alt="">
                        <img class="imageView" src="./photos/lazy_image.svg" data-src="./photos/anh (10).jpg" alt="">
                    </div>
                </div>  
            `
        }
        content.innerHTML = "";
        content.scrollTop;
        document.title = title;
        content.insertAdjacentHTML('beforeend', template);
        main();
    })
})