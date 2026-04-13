const notImg = RegExp('blank|null|1x1');

const frameLayout = myFT.instantAds.frame_layout.toLowerCase().split('|').map(e => e.trim());;
// console.log(frameLayout);

myFT.on("instantads", function(e) {
    init();
    preload()
    createAd();

    myFT.applyClickTag(main, 1, variables.clicktag_url);

    document.fonts.ready.then(() => {
        fontsLoaded = true;
        if (allImagesLoaded) {
            setTimeout(startAnimation, 250);
        }
    })
});


function createAd() {
    let bgExists = false;

    let logo1Css = variables.logo1_width_xy.split('||');
    logo1Css.forEach((wxy,i) => setLogo($(`#logo_${i+1}1`), wxy));
    
    let logo2Css = variables.logo2_width_xy.split('||');
    logo2Css.forEach((wxy,i) => setLogo($(`#logo_${i+1}2`), wxy));

    // setLogo(logo_12, variables.logo2_width_xy);

    setText(club_location_txt, variables.club_location_txt, variables.clublocation_face_size_hex_alignment_xy)
    for (let i = 1; i <= 4; i++) {
        setText(document.getElementById('f' + i + '_headline_txt'), variables['f' + i + '_headline_txt'], variables['f' + i + 'headline_face_size_hex_alignment_xy'], frameLayout[i-1]);
        setText(document.getElementById('f' + i + '_subheadline_txt'), variables['f' + i + '_subheadline_txt'], variables['f' + i + 'subheadline_face_size_hex_alignment_xy'],frameLayout[i-1]);
        bgExists = bgExists || !notImg.test(variables['background_' + i + '_img'])
    }
    const footerStyles = variables.footer_hex_xy.split('|');
    footer.style.backgroundColor = footerStyles[0];
    setXY(footer, footerStyles[1]);
    setAdditionalCss(footer, footerStyles, 2)

    const ctaStyles = variables.cta_txt_face_size_hex_hexHover_alignment_xy.split('|');
    const buttonStyles = variables.cta_outlineHex_bgHex_bgHexHover.split('|');
    cta.innerHTML = variables.cta_text;

    cta.style.fontFamily = ctaStyles[0];
    cta.style.fontSize = ctaStyles[1] + 'px';
    cta.style.textAlign = ctaStyles[4];
    cta.style.borderColor = buttonStyles[0];

    frameLayout.forEach(e => {
        if(e.indexOf('cta') > -1) ctaContainer.classList.add(e)
    });
   

    setXY(ctaContainer, ctaStyles[5]);
    setAdditionalCss(ctaContainer, buttonStyles, 3);
    setAdditionalCss(cta, ctaStyles, 6);
    setCtaColor(ctaStyles[2], buttonStyles[1]);
    cta.addEventListener('mouseover', () => setCtaColor(ctaStyles[3], buttonStyles[2]));
    cta.addEventListener('mouseout', () => setCtaColor(ctaStyles[2], buttonStyles[1]));


    if (bgExists) {
        videoContainer.style.display = 'none';
    } else {
        myFT.insertVideo({
            video: "background_vid",
            parent: videoContainer,
            autoplay: true,
            controls: false,
            muted: true,
            width: adWidth,
            height: adHeight,
        });
    }
}

function setLogo(element, style, ) {
    const styleList = style.split('|');
    element.style.width = styleList[0] + 'px';
    setXY(element, styleList[1]);

    // setAdditionalCss(element, styleList, 2);
}


function setText(element, text, styles, frmLayout) {
    //f1headline_face_size_hex_alignment_xy
    // element.classList.add(checkPlatform(0), checkPlatform(1))

    const styleList = styles.split('|');
    text.trim() ? element.innerHTML = text : null;
    
    if(frmLayout) element.classList.add(frmLayout);
    element.style.fontFamily = styleList[0];
    element.style.fontSize = styleList[1] + 'px';
    element.style.color = styleList[2];
    element.style.textAlign = styleList[3];
    element.style.justifyContent = styleList[3];

    setXY(element, styleList[4]);
    setAdditionalCss(element, styleList, 5)

}
for (let i = 1; i <= 4; i++) {
    let wrapperdiv = document.getElementById('textWrap' + i);
    if (i <= frameLayout.length) {
        wrapperdiv.classList.add(frameLayout[i - 1]);
    }
}
// let wrapperClass = document.getElementById("textWrap");
// console.log(wrapperClass);
// wrapperClass.classList.add(frameLayout[0]);

function setCtaColor(text, bg) {
    cta.style.color = text;
    cta.style.backgroundColor = bg;
}

function preload() {
    // const varImages = myFT.manifestProperties.instantAds
    //     .filter(e => e.type == 'image')
    //     .map(e => e.name);
    const varImages =  ['background_1_img', 'background_2_img', 'background_3_img', 'background_4_img'];
    
    const imageCount = varImages.length + 8;
    let imageLoaded = 0;

    varImages.forEach(e => {
        const currentImage = document.getElementById(e);
        currentImage.src = variables[e];
        currentImage.addEventListener('load', iLoad, false);
    });

    for (let i = 1; i <= 4; i++) {
        let logoImg1 = document.getElementById(`logo_${i}1`);
        logoImg1.classList.add(frameLayout[i-1]);
        logoImg1.src = variables['logo_1'];
        logoImg1.addEventListener('load', iLoad, false);

        let logoImg2 = document.getElementById(`logo_${i}2`);
        logoImg2.classList.add(frameLayout[i-1]);
        logoImg2.src = variables['logo_2'];
        logoImg2.addEventListener('load', iLoad, false);
    }

    

    function iLoad() {
        // trace(imageLoaded)
        imageLoaded++;
        if (imageLoaded == imageCount) {
            trace('preload done');
            allImagesLoaded = true;
            if (fontsLoaded) {
                setTimeout(startAnimation, 250);
            }
        }
    }
}

function startAnimation() {
    const frameCount = parseInt(variables.frame_count);
    if (!frameCount) {
        frameCount = 1;
    }
    const logo2Endframe = variables.logo2_endframeOff.trim().toLowerCase();
    const ease = "power4.out", imageTransition = 1;
    let label;

    const tl = gsap.timeline();
    tl.set('.bg', { y: adHeight });
    tl.set(background_1_img, { y: 0 });
    tl.set([main, '#logo_11','#logo_12'], { opacity: 1, delay: .25 });
    tl.set(['#club_location_txt'], { opacity: 1 });
    if(frameLayout[0]=='footer') tl.set(['#footer'], { opacity: 1 });
    if(frameLayout[0].indexOf('cta') > -1) tl.set(['#cta'], { opacity: 1 });

    tl.to([f1_headline_txt, f1_subheadline_txt], .3, { opacity: 1, delay: .3 })
    for (let i = 1; i <= frameCount - 1; i++) {
        label = 'f' + i; 
        tl.addLabel(label, '+=2');
        tl.to([
            '#f' + i + '_headline_txt', '#f' + i + '_subheadline_txt', '#logo_' + i + '1', '#logo_' + i + '2','#club_location_txt','#footer','#cta' 
        ], .7, { opacity: 0 }, label);
        tl.to('#background_' + i + '_img', imageTransition, { y: -adHeight}, label);
        tl.to('#background_' + (i + 1) + '_img', imageTransition, { y: 0, ease }, label);
        tl.to(['#f' + (i + 1) + '_headline_txt', '#f' + (i + 1) + '_subheadline_txt', '#logo_'+(i+1)+'1', '#logo_'+(i+1)+'2'], 1, { opacity: 1}, label);
        
        tl.to(['#club_location_txt'], imageTransition, { opacity: 1}, label);    
        if(frameLayout[i]=='footer') tl.to(['#footer'], imageTransition, { opacity: 1}, label);    
        if(frameLayout[i].indexOf('cta') > -1) tl.to(['#cta'], imageTransition, { opacity: 1}, label);    
    }

    if (frameCount == 4) {
        // tl.to(cta, .5, { opacity: 1, delay: -1 });
        if (logo2Endframe == 'yes' || logo2Endframe == 'true') {
            tl.to(logo_2, .5, { opacity: 0, delay: -1.5 });
        }
    }

    trace(tl.duration());
}