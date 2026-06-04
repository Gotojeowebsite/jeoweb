$( ".morelinks" ).click(function() {
  $( "#morecategories" ).slideToggle( "fast" );
});

!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):(t=t||self).LazyLoad=n()}(this,(function(){"use strict";function t(){return(t=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i])}return t}).apply(this,arguments)}var n="undefined"!=typeof window,e=n&&!("onscroll"in window)||"undefined"!=typeof navigator&&/(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent),i=n&&"IntersectionObserver"in window,o=n&&"classList"in document.createElement("p"),a=n&&window.devicePixelRatio>1,r={elements_selector:"img",container:e||n?document:null,threshold:300,thresholds:null,data_src:"src",data_srcset:"srcset",data_sizes:"sizes",data_bg:"bg",data_bg_hidpi:"bg-hidpi",data_bg_multi:"bg-multi",data_bg_multi_hidpi:"bg-multi-hidpi",data_poster:"poster",class_applied:"applied",class_loading:"loading",class_loaded:"loaded",class_error:"error",unobserve_completed:!0,unobserve_entered:!1,cancel_on_exit:!1,callback_enter:null,callback_exit:null,callback_applied:null,callback_loading:null,callback_loaded:null,callback_error:null,callback_finish:null,callback_cancel:null,use_native:!1},c=function(n){return t({},r,n)},l=function(t,n){var e,i=new t(n);try{e=new CustomEvent("LazyLoad::Initialized",{detail:{instance:i}})}catch(t){(e=document.createEvent("CustomEvent")).initCustomEvent("LazyLoad::Initialized",!1,!1,{instance:i})}window.dispatchEvent(e)},s=function(t,n){return t.getAttribute("data-"+n)},u=function(t){return s(t,"ll-status")},d=function(t,n){return function(t,n,e){var i="data-"+n;null!==e?t.setAttribute(i,e):t.removeAttribute(i)}(t,"ll-status",n)},f=function(t){return d(t,null)},_=function(t){return null===u(t)},g=["loading","applied","loaded","error"],v=function(t,n,e,i){t&&(void 0===i?void 0===e?t(n):t(n,e):t(n,e,i))},p=function(t,n){o?t.classList.add(n):t.className+=(t.className?" ":"")+n},b=function(t,n){o?t.classList.remove(n):t.className=t.className.replace(new RegExp("(^|\\s+)"+n+"(\\s+|$)")," ").replace(/^\s+/,"").replace(/\s+$/,"")},m=function(t){return t.llTempImage},h=function(t,n){if(n){var e=n._observer;e&&e.unobserve(t)}},E=function(t,n){t&&(t.loadingCount+=n)},L=function(t,n){t&&(t.toLoadCount=n)},y=function(t){for(var n,e=[],i=0;n=t.children[i];i+=1)"SOURCE"===n.tagName&&e.push(n);return e},I=function(t,n,e){e&&t.setAttribute(n,e)},A=function(t,n){t.removeAttribute(n)},w=function(t){return!!t.llOriginalAttrs},k=function(t){if(!w(t)){var n={};n.src=t.getAttribute("src"),n.srcset=t.getAttribute("srcset"),n.sizes=t.getAttribute("sizes"),t.llOriginalAttrs=n}},z=function(t){if(w(t)){var n=t.llOriginalAttrs;I(t,"src",n.src),I(t,"srcset",n.srcset),I(t,"sizes",n.sizes)}},O=function(t,n){I(t,"sizes",s(t,n.data_sizes)),I(t,"srcset",s(t,n.data_srcset)),I(t,"src",s(t,n.data_src))},C=function(t){A(t,"src"),A(t,"srcset"),A(t,"sizes")},x=function(t,n){var e=t.parentNode;e&&"PICTURE"===e.tagName&&y(e).forEach(n)},N={IMG:function(t,n){x(t,(function(t){k(t),O(t,n)})),k(t),O(t,n)},IFRAME:function(t,n){I(t,"src",s(t,n.data_src))},VIDEO:function(t,n){y(t).forEach((function(t){I(t,"src",s(t,n.data_src))})),I(t,"poster",s(t,n.data_poster)),I(t,"src",s(t,n.data_src)),t.load()}},M=function(t,n,e){var i=N[t.tagName];i&&(i(t,n),E(e,1),p(t,n.class_loading),d(t,"loading"),v(n.callback_loading,t,e))},R=["IMG","IFRAME","VIDEO"],T=function(t,n){!n||function(t){return t.loadingCount>0}(n)||function(t){return t.toLoadCount>0}(n)||v(t.callback_finish,n)},G=function(t,n,e){t.addEventListener(n,e),t.llEvLisnrs[n]=e},j=function(t,n,e){t.removeEventListener(n,e)},D=function(t){return!!t.llEvLisnrs},F=function(t){if(D(t)){var n=t.llEvLisnrs;for(var e in n){var i=n[e];j(t,e,i)}delete t.llEvLisnrs}},P=function(t,n,e){!function(t){delete t.llTempImage}(t),E(e,-1),function(t){t&&(t.toLoadCount-=1)}(e),b(t,n.class_loading),n.unobserve_completed&&h(t,e)},S=function(t,n,e){var i=m(t)||t;if(!D(i)){!function(t,n,e){D(t)||(t.llEvLisnrs={}),G(t,"load",n),G(t,"error",e),"VIDEO"===t.tagName&&G(t,"loadeddata",n)}(i,(function(o){!function(t,n,e,i){P(n,e,i),p(n,e.class_loaded),d(n,"loaded"),v(e.callback_loaded,n,i),T(e,i)}(0,t,n,e),F(i)}),(function(o){!function(t,n,e,i){P(n,e,i),p(n,e.class_error),d(n,"error"),v(e.callback_error,n,i),T(e,i)}(0,t,n,e),F(i)}))}},V=function(t,n,e){!function(t){t.llTempImage=document.createElement("img")}(t),S(t,n,e),function(t,n,e){var i=s(t,n.data_bg),o=s(t,n.data_bg_hidpi),r=a&&o?o:i;r&&(t.style.backgroundImage='url("'.concat(r,'")'),m(t).setAttribute("src",r),E(e,1),p(t,n.class_loading),d(t,"loading"),v(n.callback_loading,t,e))}(t,n,e),function(t,n,e){var i=s(t,n.data_bg_multi),o=s(t,n.data_bg_multi_hidpi),r=a&&o?o:i;r&&(t.style.backgroundImage=r,p(t,n.class_applied),d(t,"applied"),v(n.callback_applied,t,e),n.unobserve_completed&&h(t,n))}(t,n,e)},U=function(t,n,e){!function(t){return R.indexOf(t.tagName)>-1}(t)?V(t,n,e):function(t,n,e){S(t,n,e),M(t,n,e)}(t,n,e),T(n,e)},$=function(t,n,e,i){"IMG"===t.tagName&&(F(t),function(t){x(t,(function(t){C(t)})),C(t)}(t),function(t){x(t,(function(t){z(t)})),z(t)}(t),b(t,e.class_loading),E(i,-1),v(e.callback_cancel,t,n,i),setTimeout((function(){f(t)}),0))},q=function(t,n,e,i){v(e.callback_enter,t,n,i),function(t){return g.indexOf(u(t))>-1}(t)||(e.unobserve_entered&&h(t,i),U(t,e,i))},H=function(t,n,e,i){_(t)||(e.cancel_on_exit&&function(t){return"loading"===u(t)}(t)&&$(t,n,e,i),v(e.callback_exit,t,n,i))},B=["IMG","IFRAME"],J=function(t){return t.use_native&&"loading"in HTMLImageElement.prototype},K=function(t,n,e){t.forEach((function(t){-1!==B.indexOf(t.tagName)&&(t.setAttribute("loading","lazy"),function(t,n,e){S(t,n,e),M(t,n,e),d(t,"native"),T(n,e)}(t,n,e))})),L(e,0)},Q=function(t,n){i&&!J(t)&&(n._observer=new IntersectionObserver((function(e){!function(t,n,e){t.forEach((function(t){return function(t){return t.isIntersecting||t.intersectionRatio>0}(t)?q(t.target,t,n,e):H(t.target,t,n,e)}))}(e,t,n)}),function(t){return{root:t.container===document?null:t.container,rootMargin:t.thresholds||t.threshold+"px"}}(t)))},W=function(t){return Array.prototype.slice.call(t)},X=function(t){return t.container.querySelectorAll(t.elements_selector)},Y=function(t){return function(t){return"error"===u(t)}(t)},Z=function(t,n){return function(t){return W(t).filter(_)}(t||X(n))},tt=function(t,n){var e;(e=X(t),W(e).filter(Y)).forEach((function(n){b(n,t.class_error),f(n)})),n.update()},nt=function(t,e){var i=c(t);this._settings=i,this.loadingCount=0,Q(i,this),function(t,e){n&&window.addEventListener("online",(function(){tt(t,e)}))}(i,this),this.update(e)};return nt.prototype={update:function(t){var n,o,a=this._settings,r=Z(t,a);(L(this,r.length),!e&&i)?J(a)?K(r,a,this):(n=this._observer,o=r,function(t){t.disconnect()}(n),function(t,n){n.forEach((function(n){t.observe(n)}))}(n,o)):this.loadAll(r)},destroy:function(){this._observer&&this._observer.disconnect(),delete this._observer,delete this._settings,delete this.loadingCount,delete this.toLoadCount},loadAll:function(t){var n=this,e=this._settings;Z(t,e).forEach((function(t){U(t,e,n)}))}},nt.load=function(t,n){var e=c(n);U(t,e)},nt.resetStatus=function(t){f(t)},n&&function(t,n){if(n)if(n.length)for(var e,i=0;e=n[i];i+=1)l(t,e);else l(t,n)}(nt,window.lazyLoadOptions),nt}));
  (function () {
var myLazyLoad = new LazyLoad({
    elements_selector: ".lazy",
    cancel_on_exit: true
});
 })();

!function(t){"use strict";var e=function(e,o){this.options=o,this.$element=t(e),this.$backdrop=this.isShown=null,this.options.remote&&this.$element.load(this.options.remote)};e.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},e.prototype.toggle=function(t){return this[this.isShown?"hide":"show"](t)},e.prototype.show=function(e){var o=this,n=t.Event("show.bs.mlmodal",{relatedTarget:e});this.$element.trigger(n),this.isShown||n.isDefaultPrevented()||(this.isShown=!0,this.escape(),this.$element.on("click.dismiss.mlmodal",'[data-dismiss="ml-modal"]',t.proxy(this.hide,this)),this.backdrop(function(){var n=t.support.transition&&o.$element.hasClass("ml-fade");o.$element.parent().length||o.$element.appendTo(document.body),o.$element.show(),n&&o.$element[0].offsetWidth,o.$element.addClass("ml-in").attr("aria-hidden",!1),o.enforceFocus();var i=t.Event("shown.bs.mlmodal",{relatedTarget:e});n?o.$element.find(".modal-login-dialog").one(t.support.transition.end,function(){o.$element.focus().trigger(i)}).emulateTransitionEnd(300):o.$element.focus().trigger(i)}))},e.prototype.hide=function(e){e&&e.preventDefault(),e=t.Event("hide.bs.mlmodal"),this.$element.trigger(e),this.isShown&&!e.isDefaultPrevented()&&(this.isShown=!1,this.escape(),t(document).off("focusin.bs.mlmodal"),this.$element.removeClass("ml-in").attr("aria-hidden",!0).off("click.dismiss.mlmodal"),t.support.transition&&this.$element.hasClass("ml-fade")?this.$element.one(t.support.transition.end,t.proxy(this.hideModal,this)).emulateTransitionEnd(300):this.hideModal())},e.prototype.enforceFocus=function(){t(document).off("focusin.bs.mlmodal").on("focusin.bs.mlmodal",t.proxy(function(t){this.$element[0]===t.target||this.$element.has(t.target).length||this.$element.focus()},this))},e.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keyup.dismiss.bs.mlmodal",t.proxy(function(t){27==t.which&&this.hide()},this)):this.isShown||this.$element.off("keyup.dismiss.bs.mlmodal")},e.prototype.hideModal=function(){var t=this;this.$element.hide(),this.backdrop(function(){t.removeBackdrop(),t.$element.trigger("hidden.bs.mlmodal")})},e.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},e.prototype.backdrop=function(e){var o=this.$element.hasClass("ml-fade")?"ml-fade":"";if(this.isShown&&this.options.backdrop){var n=t.support.transition&&o;if(this.$backdrop=t('<div class="paml-backdrop '+o+'" />').appendTo(document.body),this.$element.on("click.dismiss.mlmodal",t.proxy(function(t){t.target===t.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus.call(this.$element[0]):this.hide.call(this))},this)),n&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("ml-in"),!e)return;n?this.$backdrop.one(t.support.transition.end,e).emulateTransitionEnd(150):e()}else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("ml-in"),t.support.transition&&this.$element.hasClass("ml-fade")?this.$backdrop.one(t.support.transition.end,e).emulateTransitionEnd(150):e()):e&&e()};var o=t.fn.mlmodal;t.fn.mlmodal=function(o,n){return this.each(function(){var i=t(this),s=i.data("bs.mlmodal"),a=t.extend({},e.DEFAULTS,i.data(),"object"==typeof o&&o);s||i.data("bs.mlmodal",s=new e(this,a)),"string"==typeof o?s[o](n):a.show&&s.show(n)})},t.fn.mlmodal.Constructor=e,t.fn.mlmodal.noConflict=function(){return t.fn.mlmodal=o,this},t(document).on("click",'[data-toggle="ml-modal"]',function(e){var o=t(this),n=o.attr("href"),i=t(o.attr("data-target")||n&&n.replace(/.*(?=#[^\s]+$)/,"")),s=i.data("ml-modal")?"toggle":t.extend({remote:!/#/.test(n)&&n},i.data(),o.data());e.preventDefault(),i.mlmodal(s,this).one("hide",function(){o.is(":visible")&&o.focus()})}),t(document).on("show.bs.mlmodal",".ml-modal",function(){t(document.body).addClass("modal-open")}).on("hidden.bs.mlmodal",".ml-modal",function(){t(document.body).removeClass("modal-open")})}(window.jQuery),function(t){"use strict";t.fn.emulateTransitionEnd=function(e){var o=!1,n=this;t(this).one(t.support.transition.end,function(){o=!0});return setTimeout(function(){o||t(n).trigger(t.support.transition.end)},e),this},t(function(){t.support.transition=function(){var t=document.createElement("bootstrap"),e={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var o in e)if(void 0!==t.style[o])return{end:e[o]}}()})}(window.jQuery);

window.addEventListener('beforeunload', function (e) {

  delete e['returnValue'];
});

function isMobile() {
  try{ document.createEvent("TouchEvent"); return true; }
  catch(e){ return false; }
}
function closeNav2() {
  document.getElementById("mySidebar").style.display = "none";
    document.getElementById("topnav").style.marginLeft = "0";
  document.getElementById("content").style.marginLeft = "0";
    document.getElementById("show-sidebar").style.display = "block";
}

var nav = true;
$( "#show-sidebar" ).on( "click", function() {
    if(nav == true){
		  document.getElementById("mySidebar").style.display = "block";
    document.getElementById("topnav").style.marginLeft = "180px";
  document.getElementById("content").style.marginLeft = "180px";
  nav = false;
	}else if(nav == false){
		  document.getElementById("mySidebar").style.display = "none";
    document.getElementById("topnav").style.marginLeft = "0";
  document.getElementById("content").style.marginLeft = "0";
    document.getElementById("show-sidebar").style.display = "block";
    nav = true;
	}

});

(function () {
	var dd = document.getElementById('profile-dropdown');
	var btn = document.querySelector('.profile-btn');
	var dropdownClickHandler = null;
	var outsideClickHandler = null;
	var escHandler = null;
	var logoutClickHandler = null;
	var logoutNonce = null;

	function resetTopnav() {
		$('#topnav .login').remove();
		$('.profile-btn')
			.attr('href', 'https://kbhgames.com/favorite')
			.removeAttr('data-toggle')
			.removeAttr('rel')
			.attr('title', 'Favorites')
			.attr('aria-label', 'Favorites');
		if (dd) dd.hidden = true;
		if (dropdownClickHandler && btn) btn.removeEventListener('click', dropdownClickHandler);
		if (outsideClickHandler) document.removeEventListener('click', outsideClickHandler);
		if (escHandler) document.removeEventListener('keydown', escHandler);
		if (logoutClickHandler && dd) {
			var oldLogout = dd.querySelector('[data-slot="logout"]');
			if (oldLogout) oldLogout.removeEventListener('click', logoutClickHandler);
		}
		dropdownClickHandler = outsideClickHandler = escHandler = logoutClickHandler = null;
		logoutNonce = null;
	}

	function wireTopnav(data) {
		resetTopnav();
		if (data && data.logged_in) {
			$('.fav').css('display', 'block');
			if (!dd || !btn) return;
			logoutNonce = data.logout_nonce || null;
			var avatar = dd.querySelector('.profile-dropdown-avatar');
			if (data.avatar_url) avatar.src = data.avatar_url;
			dd.querySelector('.profile-dropdown-name').textContent = data.display_name || '';
			dd.querySelector('[data-slot="profile"]').href   = data.profile_url || '#';
			dd.querySelector('[data-slot="favorites"]').href = data.favorites_url || '#';
			var logoutLink = dd.querySelector('[data-slot="logout"]');
			logoutLink.href = data.logout_url || '#';

			dropdownClickHandler = function (e) {
				e.preventDefault();
				dd.hidden = !dd.hidden;
			};
			btn.addEventListener('click', dropdownClickHandler);

			outsideClickHandler = function (e) {
				if (!dd.hidden && !dd.contains(e.target) && !btn.contains(e.target)) {
					dd.hidden = true;
				}
			};
			document.addEventListener('click', outsideClickHandler);

			escHandler = function (e) {
				if (e.key === 'Escape' && !dd.hidden) dd.hidden = true;
			};
			document.addEventListener('keydown', escHandler);

			logoutClickHandler = function (e) {
				if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
				e.preventDefault();
				if (!logoutNonce) { location.href = logoutLink.href; return; }
				logoutLink.style.pointerEvents = 'none';
				logoutLink.style.opacity = '0.6';
				var body = 'action=kbh_logout&_ajax_nonce=' + encodeURIComponent(logoutNonce);
				fetch('/wp-admin/admin-ajax.php', {
					method: 'POST',
					credentials: 'same-origin',
					cache: 'no-store',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
					body: body
				})
				.then(function () { location.reload(); })
				.catch(function () { location.href = logoutLink.href; });
			};
			logoutLink.addEventListener('click', logoutClickHandler);
		} else {
			$('#topnav').append('<a class="login" data-toggle="ml-modal" href="#modal-login" rel="nofollow">Login</a>');
			$('.profile-btn')
				.attr('href', '#modal-login')
				.attr('data-toggle', 'ml-modal')
				.attr('rel', 'nofollow')
				.attr('title', 'Login')
				.attr('aria-label', 'Login');
		}
	}

	function fetchAuthAndWire() {
		return fetch('/wp-admin/admin-ajax.php?action=kbh_auth_status', {
			credentials: 'same-origin',
			cache: 'no-store'
		})
		.then(function (r) { return r.json(); })
		.then(wireTopnav)
		.catch(function () {});
	}

	fetchAuthAndWire();

	$(document).ajaxSuccess(function (event, xhr, settings) {
		try {
			if (!settings || !settings.url || settings.url.indexOf('admin-ajax.php') === -1) return;
			var resp = JSON.parse(xhr.responseText);
			if (resp && resp.loggedin === true) {
				setTimeout(fetchAuthAndWire, 100);
			}
		} catch (e) {}
	});
})();

$(document).ready(function(){
    $('.navbar-toggler').click(function(){
        $('.navbar-collapse').slideToggle(300);
    });

    smallScreenMenu();
    let temp;
    function resizeEnd(){
        smallScreenMenu();
    }

    $(window).resize(function(){
        clearTimeout(temp);
        temp = setTimeout(resizeEnd, 100);
        resetMenu();
    });
});

const subMenus = $('.sub-menu');
const menuLinks = $('.menu-link');

function smallScreenMenu(){
    if($(window).innerWidth() <= 992){
        menuLinks.each(function(item){
            $(this).click(function(){
                $(this).next().slideToggle();
            });
        });

    } else {
        menuLinks.each(function(item){
            $(this).off('click');

        });

    }
}

function resetMenu(){
    if($(window).innerWidth() > 992){
        subMenus.each(function(item){
            $(this).css('display', 'none');
        });

    }
}

