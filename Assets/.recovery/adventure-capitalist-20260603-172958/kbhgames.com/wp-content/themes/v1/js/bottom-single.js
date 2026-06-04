var wtilp = {
    "ajax_url": "\/\/kbhgames.com\/wp-admin\/admin-ajax.php",
    "redirect_url": "",
    "style": "style1"
};
jQuery(document).ready(function() {
    if (window.kbhPostId && kbhLikedHas(window.kbhPostId)) {
        jQuery('.score-button a.jlk[data-task="like"]').addClass('lbg-style1-active');
    }
    jQuery(".jlk").on("click", function(e) {
        e.preventDefault();
        var $clickedBtn = jQuery(this);
        var task = $clickedBtn.attr("data-task");
        var post_id = $clickedBtn.attr("data-post_id");
        var nonce = $clickedBtn.attr("data-nonce");
        if (task === "like" && kbhLikedNeedsSync()) {
            kbhLikedRefreshFromServer(post_id);
        }
        jQuery.ajax({
            type: "post",
            dataType: "json",
            url: wtilp.ajax_url,
            data: {
                action: "wti_like_post_process_vote",
                task: task,
                post_id: post_id,
                nonce: nonce
            },
    success: function(response) {
                if (response.msg === "Already Voted." || response.error === 0) {
                    var tooltipMessage = response.error === 0 ? "Thank You!" : response.msg;
                    var tooltipClass = response.error === 0 ? "vote-tooltip-success" : "vote-tooltip-error";

                    var tooltip = jQuery('<div class="vote-tooltip ' + tooltipClass + '">' + tooltipMessage + '</div>');
                    var $container = $clickedBtn.closest('.mobile-like-wrap');
                    if (!$container.length) $container = jQuery('.score-button');
                    $container.append(tooltip);

                    tooltip.fadeIn(200);

                    setTimeout(function() {
                        tooltip.fadeOut(400, function() {
                            jQuery(this).remove();
                        });
                    }, 2000);
                }

                if (response.error !== 1) {

                    jQuery.ajax({
                        url: wtilp.ajax_url,
                        type: 'post',
                        dataType: 'json',
                        data: { action: 'get_like_count', post_id: post_id }
                    }).done(function (res) {
                        if (res.success && res.data && res.data.formatted !== undefined) {
                            jQuery('.icon-thumbs-up div[style]').html(res.data.formatted);
                            jQuery('.mobile-like-wrap .icon-thumbs-up div[style]').html(res.data.formatted);
                        }
                    });
                    jQuery(".status-" + post_id).removeClass("loading-img").empty();

                    if (task == "like") {

                        document.querySelectorAll('.lottie-like dotlottie-wc').forEach(function(player) {
                            if (player.dotLottie) {
                                player.dotLottie.stop();
                                player.dotLottie.play();
                            }
                        });

                        var $countEl = jQuery(".icon-thumbs-up div[style]");
                        $countEl.removeClass("count-bump");
                        void $countEl[0].offsetWidth;
                        $countEl.addClass("count-bump");
                        setTimeout(function() { $countEl.removeClass("count-bump"); }, 500);
                    } else if (task == "unlike") {
                        jQuery(".icon-thumbs-down").css("color", "#696969");
                    }
                }
                if (task === "like" && post_id && (response.error === 0 || response.msg === "Already Voted.")) {
                    kbhLikedAdd(post_id);
                    jQuery('.score-button a.jlk[data-task="like"]').addClass('lbg-style1-active');
                    jQuery('.mobile-like-wrap a.jlk[data-task="like"]').addClass('lbg-style1-active');
                }
            }
        });
    });
    jQuery("span.wti-others-like").on("mouseover", function() {
        jQuery(this).children("span").show();
    });
    jQuery("span.wti-others-like").on("mouseout", function() {
        jQuery(this).children("span").hide();
    });

    (function initLottieLike() {
        var $actionLike = jQuery(".score-button .action-like").first();
        var $icon = $actionLike.find(".icon-thumbs-up").first();
        if ($actionLike.length && $icon.length) {
            $icon.addClass("lottie-active");
            $actionLike.append('<div class="lottie-like"><dotlottie-wc renderconfig=\'{"devicePixelRatio":2}\' src="https://kbhgames.com/wp-content/themes/v1/images/like.lottie"></dotlottie-wc></div>');
            function configPlayer(el) {
                if (el.dotLottie && (el.dotLottie.totalFrames || 0) > 0) {
                    el.dotLottie.setLoop(false);
                    if (window.kbhPostId && kbhLikedHas(window.kbhPostId)) {
                        el.dotLottie.setFrame(el.dotLottie.totalFrames - 1);
                    } else {
                        el.dotLottie.stop();
                    }
                } else {
                    setTimeout(function() { configPlayer(el); }, 100);
                }
            }
            setTimeout(function() {
                var player = $actionLike.find("dotlottie-wc")[0];
                if (player) configPlayer(player);
            }, 500);
        }
    })();
    var game_perc = $('.green-percent').attr('data-percent');
    $('.green-percent').css("width", game_perc + '%');
});
jQuery(document).ready(function($) {});

function wpfp_do_js(dhis, doAjax) {
    loadingImg = dhis.prev();
    loadingImg.show();
    beforeImg = dhis.prev().prev();
    beforeImg.hide();
    url = document.location.href.split('#')[0];
    var href = dhis.attr('href') || '';
    params = href.replace('?', '') + '&ajax=1';
    var clickedAction = href.indexOf('wpfpaction=remove') > -1 ? 'remove' : 'add';
    var newAction = clickedAction === 'add' ? 'remove' : 'add';
    var m = href.match(/postid=(\d+)/);
    var postId = m ? m[1] : '0';
    if (doAjax) {
        jQuery.get(url, params, function(data) {
            var wpfpSpan = dhis.parent();
            if (typeof data === 'string' && data.indexOf('registered') > -1 && data.indexOf('<!DOCTYPE') === -1 && data.indexOf('<html') === -1) {
                document.cookie = 'user_logged_in=; path=/; max-age=0';
                kbhFavoritesClear();
                loadingImg.hide();
                wpfpSpan.html("<a class='wpfp-link2' data-toggle='ml-modal' data-postid='" + postId + "' href='#modal-login' title='Add to Favorite' rel='nofollow'><div class='icon icon-heart'></div></a>");
                wpfpSpan.closest('.tooltip-wrap').attr('data-tooltip', 'Favorite It');
                injectFavLottie(wpfpSpan.find('.icon-heart'), false);
                wpfpSpan.find('.wpfp-link2')[0].click();
                return;
            }
            var heartClass = newAction === 'remove' ? 'red' : '';
            var heartTitle = newAction === 'remove' ? 'Remove from Favorite' : 'Add to Favorite';
            wpfpSpan.html("<a class='wpfp-link' href='?wpfpaction=" + newAction + "&postid=" + postId + "' title='" + heartTitle + "' rel='nofollow'><div class='icon icon-heart " + heartClass + "'></div></a>");
            var tooltipWrap = wpfpSpan.closest('.tooltip-wrap');
            if (tooltipWrap.length) {
                tooltipWrap.attr('data-tooltip', newAction === 'remove' ? 'Unfavorite' : 'Favorite It');
            }
            if (typeof wpfp_after_ajax == 'function') {
                wpfp_after_ajax(dhis);
            }
            var $newHeart = wpfpSpan.find('.icon-heart');
            injectFavLottie($newHeart, $newHeart.hasClass('red'));
            loadingImg.hide();
        });
    }
}

function fullscreenbutton() {
    var button = document.querySelector('#game .button');
    if (!button) return;
    button.addEventListener('click', fullscreen);
    document.addEventListener('webkitfullscreenchange', fullscreenChange);
    document.addEventListener('mozfullscreenchange', fullscreenChange);
    document.addEventListener('fullscreenchange', fullscreenChange);
    document.addEventListener('MSFullscreenChange', fullscreenChange);

    function fullscreen() {
        var target = document.getElementById('game');
        if (!target) return;
        if (target.requestFullscreen) target.requestFullscreen();
        else if (target.webkitRequestFullscreen) target.webkitRequestFullscreen();
        else if (target.mozRequestFullScreen) target.mozRequestFullScreen();
        else if (target.msRequestFullscreen) target.msRequestFullscreen();
    }

    function fullscreenChange() {
        if (document.fullscreenEnabled || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement) {
        } else {
        }
    }
}
$(document).ready(function() {
    $('ul.tabs li').click(function() {
        var tab_id = $(this).attr('data-tab');
        $('ul.tabs li').removeClass('current');
        $('.tab-content').removeClass('current');
        $(this).addClass('current');
        $("#" + tab_id).addClass('current');
    })
})

function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};
var KBH_FAV_KEY = 'kbh_favorites';
var KBH_LIKED_KEY = 'kbh_liked_posts';
var KBH_LIKED_DEFAULT_INTERVAL = 604800;

function kbhLikedGetRaw() {
    try {
        var raw = localStorage.getItem(KBH_LIKED_KEY);
        if (raw === null) return null;
        var obj = JSON.parse(raw);
        if (obj && typeof obj === 'object' && Array.isArray(obj.posts)) {
            return {
                lastSync: Number(obj.lastSync) || 0,
                syncInterval: Number(obj.syncInterval) || KBH_LIKED_DEFAULT_INTERVAL,
                posts: obj.posts.map(String)
            };
        }
        return null;
    } catch (e) { return null; }
}

function kbhLikedSetRaw(data) {
    try { localStorage.setItem(KBH_LIKED_KEY, JSON.stringify(data)); } catch (e) {}
}

function kbhLikedHas(postId) {
    var data = kbhLikedGetRaw();
    if (!data) return false;
    return data.posts.indexOf(String(postId)) !== -1;
}

function kbhLikedAdd(postId) {
    var data = kbhLikedGetRaw() || { lastSync: 0, syncInterval: KBH_LIKED_DEFAULT_INTERVAL, posts: [] };
    postId = String(postId);
    if (data.posts.indexOf(postId) === -1) {
        data.posts.push(postId);
        kbhLikedSetRaw(data);
    }
}

function kbhLikedNeedsSync() {
    var data = kbhLikedGetRaw();
    if (!data || !data.lastSync) return true;
    var now = Math.floor(Date.now() / 1000);
    return (now - data.lastSync) >= data.syncInterval;
}

function kbhLikedRefreshFromServer(votingOnPostId) {
    var snapshot = (kbhLikedGetRaw() || { posts: [] }).posts.slice();
    if (votingOnPostId) {
        var voteId = String(votingOnPostId);
        snapshot = snapshot.filter(function(p) { return p !== voteId; });
    }

    jQuery.ajax({
        url: '//kbhgames.com/wp-admin/admin-ajax.php',
        type: 'post',
        dataType: 'json',
        data: { action: 'kbh_get_my_likes' }
    }).done(function (res) {
        if (res && res.success && res.data && Array.isArray(res.data.posts)) {
            var serverPosts = res.data.posts.map(String);
            var current = (kbhLikedGetRaw() || { posts: [] }).posts;
            var addedDuringRefresh = current.filter(function(p) {
                return snapshot.indexOf(p) === -1;
            });
            var finalPosts = serverPosts.slice();
            addedDuringRefresh.forEach(function(p) {
                if (finalPosts.indexOf(p) === -1) finalPosts.push(p);
            });
            kbhLikedSetRaw({
                lastSync: Math.floor(Date.now() / 1000),
                syncInterval: Number(res.data.syncInterval) || KBH_LIKED_DEFAULT_INTERVAL,
                posts: finalPosts
            });
        }
    });
}

function kbhFavoritesGet() {
    try {
        var raw = localStorage.getItem(KBH_FAV_KEY);
        if (raw === null) return null;
        var arr = JSON.parse(raw);
        return Array.isArray(arr) ? arr.map(String) : null;
    } catch (e) { return null; }
}

function kbhFavoritesSet(arr) {
    try { localStorage.setItem(KBH_FAV_KEY, JSON.stringify(arr.map(String))); } catch (e) {}
}

function kbhFavoritesClear() {
    try { localStorage.removeItem(KBH_FAV_KEY); } catch (e) {}
}

function kbhFavoritesFetch(callback) {
    jQuery.post('//kbhgames.com/wp-admin/admin-ajax.php', { action: 'wpfp_get_favorites' }, function(response) {
        var favs = (response.success && Array.isArray(response.data)) ? response.data.map(String) : [];
        kbhFavoritesSet(favs);
        if (callback) callback(favs);
    }, 'json').fail(function() { if (callback) callback([]); });
}

function injectFavLottie($heart, playToEnd) {
    if (!$heart.length) return;
    $heart.addClass('lottie-active');
    $heart.append('<div class="lottie-fav"><dotlottie-wc src="https://kbhgames.com/wp-content/themes/v1/images/fav3.lottie"></dotlottie-wc></div>');
    setTimeout(function() {
        $heart.each(function() {
            var player = $(this).find('dotlottie-wc')[0];
            if (player) {
                (function config(el, play) {
                    if (el.dotLottie) {
                        el.dotLottie.setLoop(false);
                        el.dotLottie.setSpeed(2);
                        if (play) { el.dotLottie.play(); } else { el.dotLottie.stop(); }
                    } else {
                        setTimeout(function() { config(el, play); }, 100);
                    }
                })(player, playToEnd);
            }
        });
    }, 500);
}

function kbhRenderFavButton(postId, favorites) {
    postId = String(postId);
    if (favorites.indexOf(postId) === -1) {
        $(".wpfp-span").append("<a class='wpfp-link' href='?wpfpaction=add&amp;postid=" + postId + "' title='Add to Favorite' rel='nofollow'><div class='icon icon-heart'></div></a>");
        $(".wpfp-span").closest('.tooltip-wrap').attr('data-tooltip', 'Favorite It');
    } else {
        $(".wpfp-span").append("<a class='wpfp-link' href='?wpfpaction=remove&amp;postid=" + postId + "' title='Remove from Favorite' rel='nofollow'><div class='icon icon-heart red'></div></a>");
        $(".wpfp-span").closest('.tooltip-wrap').attr('data-tooltip', 'Unfavorite');
    }
    $(".wpfp-span .icon-heart").each(function() {
        injectFavLottie($(this), $(this).hasClass('red'));
    });
}

function wpfp_after_ajax(dhis) {
    var href = dhis.attr('href') || '';
    var m = href.match(/postid=(\d+)/);
    if (!m) return;
    var postId = m[1];
    var favs = kbhFavoritesGet() || [];
    if (href.indexOf('wpfpaction=add') > -1) {
        if (favs.indexOf(postId) === -1) favs.push(postId);
    } else if (href.indexOf('wpfpaction=remove') > -1) {
        favs = favs.filter(function(id) { return id !== postId; });
    }
    kbhFavoritesSet(favs);
}

jQuery(document).ready(function() {
    if (document.cookie.indexOf("user_logged_in") === -1) { kbhFavoritesClear(); }

    function wpfp($post_id) {
        $('.wpfp-span').on('click', '.wpfp-link', function(e) {
            e.preventDefault();
            dhis = $(this);
            wpfp_do_js(dhis, 1);
            if (dhis.hasClass('remove-parent')) { dhis.parent("li").fadeOut(); }
            return false;
        });
        var current_post_id = $post_id;

        if (document.cookie.indexOf("user_logged_in") == -1) {
            $(".wpfp-span").append("<a class='wpfp-link2' data-toggle='ml-modal' data-postid='" + current_post_id + "' href='#modal-login' title='Add to Favorite' rel='nofollow'><div class='icon icon-heart'></div></a>");
            $(".wpfp-span").closest('.tooltip-wrap').attr('data-tooltip', 'Favorite It');
            injectFavLottie($(".wpfp-span .icon-heart"), false);
        } else {
            var favorites = kbhFavoritesGet();
            if (favorites === null) {
                kbhFavoritesFetch(function(favs) { kbhRenderFavButton(current_post_id, favs); });
            } else {
                kbhRenderFavButton(current_post_id, favorites);
            }
        }
    }

    if (window.kbhPostId) {
        wpfp(window.kbhPostId);
        fullscreenbutton();
    }

    $(document).on('click', '.wpfp-link2', function(e) {
        e.preventDefault();
        var postId = parseInt($(this).data('postid'), 10);
        if (isNaN(postId) || postId <= 0) return;
        localStorage.setItem('wpfpPendingFavorite', postId);

        setTimeout(function() {
            var pendingFavorite = parseInt(localStorage.getItem('wpfpPendingFavorite'), 10);
            if (pendingFavorite && !isNaN(pendingFavorite) && pendingFavorite > 0) {
                $('#form-login').off('submit').on('submit', function(e) {
                    e.preventDefault();

                    var $form = $(this);

                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        url: "//kbhgames.com/wp-admin/admin-ajax.php",
                        data: {
                            action: "ajaxlogin",
                            username: $form.find("#login_user").val(),
                            password: $form.find("#login_pass").val(),
                            rememberme: $form.find("#rememberme").is(":checked") ? "TRUE" : "FALSE",
                            login: $form.find('input[name="login"]').val(),
                            security: $form.find("#security-login").val()
                        },
                        beforeSend: function() {
                            $(".ml-modal").addClass("is-active");
                        },
                        success: function(response) {
                            if (response.loggedin === true) {
                                localStorage.removeItem('wpfpPendingFavorite');

                                document.cookie = "user_logged_in=1; path=/; max-age=1209600";

                                $('.profile-btn').attr('href', 'https://kbhgames.com/favorite')
                                                 .removeAttr('data-toggle')
                                                 .removeAttr('rel')
                                                 .attr('title', 'Favorites')
                                                 .attr('aria-label', 'Favorites');

                                $.get(window.location.href.split('#')[0],
                                    'wpfpaction=add&postid=' + pendingFavorite + '&ajax=1',
                                    function(data) {
                                        var wpfpSpan = $('.wpfp-span');

                                        wpfpSpan.html("<a class='wpfp-link' href='?wpfpaction=remove&postid=" + pendingFavorite + "' title='Remove from Favorite' rel='nofollow'><div class='icon icon-heart red'></div></a>");
                                        injectFavLottie(wpfpSpan.find('.icon-heart'), true);

                                        var tooltipWrap = wpfpSpan.closest('.tooltip-wrap');
                                        if (tooltipWrap.length) {
                                            tooltipWrap.attr('data-tooltip', 'Unfavorite');
                                        }

                                        $('.ml-modal').removeClass('is-visible').hide();
                                        $('.modal-login-dialog').hide();
                                        $('.paml-backdrop').remove();
                                        $('#modal-login').empty().hide();
                                        $('body').removeClass('modal-open');
                                        kbhFavoritesFetch(null);
                                    }
                                );
                            } else {
                                $(".modal-login-content > p.message").remove();
                                $(".modal-login-content > h2").after('<p class="message error"></p>');
                                $(".modal-login-content > p.message").text(response.message).show();
                            }
                        },
                        complete: function() {
                            $(".ml-modal").removeClass("is-active");
                        }
                    });

                    return false;
                });
            }
        }, 500);
    });

    $("#review").on("click", ".login", function() {
        $("#modal-login").load("/wp-admin/admin-ajax.php?action=load_login_modal");
    });

window.addEventListener('pageshow', function(e) {
    if (e.persisted) window.playNowClicked = false;
});

if (isMobileDevice() && window.location.search.match(/[?&]fs(?:=|&|$)/)) {
    $(function() { $('.playnowtext').first().trigger('click'); });
}

$(document).on('click', '.playnowtext', function (e) {
    if (this.tagName === 'A' && this.getAttribute('href')) return;
    e.preventDefault();
    if (window.playNowClicked) return;
    window.playNowClicked = true;

    const post_id = $(this).data('id');
    const html5game = $(".playnowtext").data("html5game") !== undefined;
    const isGodat = $(this).data("godat") !== undefined;

    if (isMobileDevice() && html5game && !window.location.search.match(/[?&]fs(?:=|&|$)/)) {

        window.location.href = window.location.pathname + '?fs';
        return;
    }

    $.ajax({
        url: '//kbhgames.com/wp-admin/admin-ajax.php',
        type: 'post',
        dataType: 'json',
        data: { action: 'get_like_count', post_id: post_id }
    }).done(function (res) {
        if (res.success && res.data && res.data.formatted !== undefined) {
            $('.icon-thumbs-up div[style]').html(res.data.formatted);
            $('.mobile-like-wrap .icon-thumbs-up div[style]').html(res.data.formatted);
        }
    });

    var tpl = document.getElementById('kbh-game-embed');
    var response = tpl ? tpl.innerHTML : '';
        if (isMobileDevice() && html5game) {
            const match = response.match(/src="(.*?)"/);
            if (match && match[1]) {
                var srcUrl = match[1].replace(/&amp;/g, '&');
                var canonical = window.location.origin + window.location.pathname;
                var wMatch = response.match(/width="(\d+)"/i);
                var hMatch = response.match(/height="(\d+)"/i);
                var gameW = wMatch ? wMatch[1] : '';
                var gameH = hMatch ? hMatch[1] : '';
                const iframeSrc = '//kbhgames.com/wp-content/themes/v1/embed.php?url=' + encodeURIComponent(srcUrl) + '&canonical=' + encodeURIComponent(canonical) + (gameW ? '&w=' + gameW : '') + (gameH ? '&h=' + gameH : '') + (isGodat ? '&engine=godat' : '') + (window.kbhDisableAd ? '&noad=1' : '') + (window.kbhPostId ? '&pid=' + window.kbhPostId : '');

                $('#sidebar, #overlay, .main-content, .mobile-search-overlay, .search-dropdown, .search-dimmer, #toggle-btn, #desktop-search, .profile-btn, .pwa-nav-btn').hide();
                $('#search-icon-btn').css('cssText', 'display:none !important');
                var navH = 40;
                $('.top-nav').css('height', navH + 'px');
                $('.nav-right').append('<button id="exit-game-btn" onclick="window.location.href=window.location.pathname" style="background:#222;border:1px solid #444;color:#fff;font-size:0.85rem;cursor:pointer;padding:6px 16px;border-radius:20px;font-family:sans-serif;letter-spacing:0.5px;">Exit ✕</button>');

                var $likeBtn = $('.score-button a.jlk[data-task="like"]').first().clone(true);
                if ($likeBtn.length) {

                    $likeBtn.find('.lottie-like').remove();
                    var $mobileIcon = $likeBtn.find('.icon-thumbs-up');
                    var $mobileActionLike = $likeBtn.find('.action-like');
                    $mobileIcon.addClass('lottie-active');
                    $mobileActionLike.css('position', 'relative');
                    $mobileActionLike.append('<div class="lottie-like"><dotlottie-wc renderconfig=\'{"devicePixelRatio":2}\' src="https://kbhgames.com/wp-content/themes/v1/images/like.lottie"></dotlottie-wc></div>');
                    var $likeWrap = $('<div class="mobile-like-wrap"></div>').append($likeBtn);
                    $likeWrap.insertBefore('#exit-game-btn');
                    setTimeout(function() {
                        var mobilePlayer = $likeWrap.find('dotlottie-wc')[0];
                        if (mobilePlayer) {
                            (function configMobile(el) {
                                if (el.dotLottie && (el.dotLottie.totalFrames || 0) > 0) {
                                    el.dotLottie.setLoop(false);
                                    if (window.kbhPostId && kbhLikedHas(window.kbhPostId)) {
                                        el.dotLottie.setFrame(el.dotLottie.totalFrames - 1);
                                    } else {
                                        el.dotLottie.stop();
                                    }
                                } else {
                                    setTimeout(function() { configMobile(el); }, 100);
                                }
                            })(mobilePlayer);
                        }
                    }, 500);
                }

                var $existingFav = $('#useful-buttons .wpfp-span').first().clone(true);
                $existingFav.find('.lottie-fav').remove();
                var $favWrap = $('<div class="mobile-fav-wrap"></div>').append($existingFav);
                $favWrap.insertBefore('#exit-game-btn');
                setTimeout(function () {
                    $existingFav.find('.icon-heart').each(function () {
                        injectFavLottie($(this), $(this).hasClass('red'));
                    });
                }, 500);

                document.body.style.overflow = 'hidden';
                window.addEventListener('scroll', function() { window.scrollTo(0, 0); });

                function updateGameLayout() {
                    var vh = window.innerHeight;
                    var vw = window.innerWidth;
                    var scaleY = (vh - navH) / vh;
                    var frame = document.getElementById('gameframe');
                    if (frame) {
                        frame.style.width = vw + 'px';
                        frame.style.height = vh + 'px';
                        frame.style.transform = 'scaleY(' + scaleY + ')';
                    }
                }

                $('body').append(
                    '<iframe id="gameframe" src="' + iframeSrc + '"' +
                    ' onload="this.contentWindow.focus()"' +
                    ' scrolling="no"' +
                    ' allow="autoplay; fullscreen; microphone;' + (isGodat ? ' cross-origin-isolated;' : '') + '"' +
                    ' allowfullscreen' +
                    ' style="position:fixed;overflow:hidden;background:#000;touch-action:none;' +
                    'top:' + navH + 'px;left:0;z-index:999;border:none;' +
                    'transform-origin:top left;">' +
                    '</iframe>'
                );

                updateGameLayout();

                var resizeTimer;
                $(window).on('resize orientationchange', function() {
                    updateGameLayout();
                    clearTimeout(resizeTimer);
                    resizeTimer = setTimeout(updateGameLayout, 100);
                    setTimeout(updateGameLayout, 300);
                    setTimeout(updateGameLayout, 500);
                });

                if (window.visualViewport) {
                    window.visualViewport.addEventListener('resize', updateGameLayout);
                }
            }
        } else if (isMobileDevice() && !html5game) {
            $("#game").html(`
                <p style='color:red;padding:10px;background:#2e2e2e;'>
                    Sorry,<br>this is NOT a mobile compatible game, it can only be played on a Computer.
                </p>
                <p style='color:white;background:#2e2e2e;padding:10px;'>
                    Play our <u><a style='color:#fff;' href='https://kbhgames.com/engine/html5'>Mobile Games</a></u>. They'll work.
                </p>
            `);
        } else if ($(".playnowtext").data("extlink") === "yes") {
        } else {
            $("#playgame").css("margin", "15px 0px 15px");

            var canonical = window.location.origin + window.location.pathname;
            var dWMatch = response.match(/width="(\d+)"/i);
            var dHMatch = response.match(/height="(\d+)"/i);
            var dW = dWMatch ? dWMatch[1] : '';
            var dH = dHMatch ? dHMatch[1] : '';
            response = response.replace(
                /(<iframe[^>]*?\ssrc=")([^"]+)(")/i,
                function(match, pre, url, post) {
                    var srcUrl = url.replace(/&amp;/g, '&');
                    return pre + '//kbhgames.com/wp-content/themes/v1/embed.php?url=' + encodeURIComponent(srcUrl) + '&canonical=' + encodeURIComponent(canonical) + (dW ? '&w=' + dW : '') + (dH ? '&h=' + dH : '') + (isGodat ? '&engine=godat' : '') + (window.kbhDisableAd ? '&noad=1' : '') + (window.kbhPostId ? '&pid=' + window.kbhPostId : '') + post;
                }
            );

            $('#game .playbutton').replaceWith(response);
        }
});

    $('.show-walkthrough').on('click', function(e) {
        e.preventDefault();
        var $btn = $(this);
        var $content = $('#walkthrough');

        $btn.toggleClass('active');
        $content.toggleClass('open');

        if ($content.hasClass('open') && $content.html().trim() === '') {
            var post_id = $btn.data('id');
            $content.html('<p style="text-align:center;padding:20px;">Loading...</p>');
            jQuery.ajax({
                url: '//kbhgames.com/wp-admin/admin-ajax.php',
                type: 'post',
                data: {
                    action: 'display_walkthrough',
                    post_id: post_id
                },
                success: function(response) {
                    $content.html(response);
                }
            });
        }
    });
});

performslide('related', 1, 212);

var newGamesCount = $('#new-games .boxInner2').length;
if (newGamesCount > 0) {
    performslide('new-games', 1, 196, newGamesCount * 210);
}
var popularCount = $('#popular .boxInner2').length;
if (popularCount > 0) {
    performslide('popular', 1, 196, popularCount * 210);
}

function performslide(ID, column, extra, extra2 = 1) {
    if ($('#' + ID).scrollLeft() < 20) {
        $('.left-button').css("display", "none");
    }
    var containerid_right = $('#' + ID + ' .right-button');
    var containerid_left = $('#' + ID + ' .left-button');
    if (extra2 !== 1) {
        var slider_total_width_not_hidden = extra2;
    } else {
        var slider_total_width_not_hidden = ((($('#' + ID).children('div').length) * extra) / column);
    }
    if (slider_total_width_not_hidden - 400 < $('.tag-carousel').width()) {
        containerid_left.css("display", "none");
        containerid_right.css("display", "none");
        $('#' + ID + '.slider2').css("flex-direction", "unset");
        return;
    }
    containerid_right.css("display", "block");
    containerid_right.click(function() {
        var silderwidth = $('#' + ID).width();
        var sliderwidth80 = $('#' + ID).width() * .8;
        var p = $('#' + ID);
        containerid_left.css("display", "block");
        if (p.scrollLeft() + silderwidth * 2 > slider_total_width_not_hidden) {
            containerid_right.css("display", "none");
        }
        $('#' + ID).animate({
            scrollLeft: "+=" + sliderwidth80 + "px"
        }, 300);
    });
    containerid_left.click(function() {
        var sliderwidth80 = $('#' + ID).width() * .8;
        var silderwidth = $('#' + ID).width();
        var p = $('#' + ID);
        if (p.scrollLeft() < silderwidth - extra) {
            containerid_left.css("display", "none");
        }
        var p = $('#' + ID);
        containerid_right.css("display", "block");
        $('#' + ID).animate({
            scrollLeft: "-=" + sliderwidth80 + "px"
        }, 300);
    });
}