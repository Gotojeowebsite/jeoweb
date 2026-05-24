(function ($) {
  $('.video-transcription').each(function (i) {
    var btn = $(this).find('.js-accordion-btn');
    var content = $(this).find('.js-accordion-content');
    var id = 'videoTranscriptionContent' + i;
    var labelId = 'videoTranscriptionLabel' + i;
    var videoCtr = $(this).prev('.video_ctr');
    var figCaption = $(this).next('figcaption');

    if (btn.length) {
      btn.attr({
        'id': labelId,
        'aria-controls': id
      });

      content.attr({
        'id': id,
        'aria-labelledby': labelId
      });
    }

    if (figCaption) {
      btn.appendTo(videoCtr);
      figCaption.insertBefore(btn);
    }
  });

  $('.js-accordion-btn').on('click', function () {
    var accordionContent = $('#' + $(this).attr('aria-controls'));
    if ($(this).attr('aria-expanded') === 'true') {
      $(this).attr('aria-expanded', 'false');
      accordionContent.slideUp();
    } else {
      $(this).attr('aria-expanded', 'true');
      accordionContent.slideDown();
    }
  });

  $('span.js-accordion-btn').on('keydown', function (e) {
    if (e.keyCode === 13) {
      $(this).click();
    }
  });
})(jQuery);
