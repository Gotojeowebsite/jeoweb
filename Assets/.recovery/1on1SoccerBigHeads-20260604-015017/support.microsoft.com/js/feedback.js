/*! Copyright (C) Microsoft. All rights reserved. */

(function ($) {
	'use strict';
	(function smartFeedback() {
		var activatedStarRatingValue = null;
		var activatedStarRatingLabel = null;
		var userSelectionIsInfoHelpful = null;

		var checkBoxSelected = false;
		var starRatingSelected = false;
		var verbatimEntered = false;
		var $spanDisplayElementsForStarCheckbox = $(".translationRatingStar, .checkboxTick");
		var $extendedFeedbackStarCheckboxElements = $(".translationRatingStar, .articleExperienceOptionsCheckbox");

		var $extendedFeedback = $("#extendedFeedback");
		var $extendedFeedbackForm = $("#extendedFeedbackForm");
		var $feedbackWrapper = $('#supWrapperToPreventFeedbackFlickering');
		var $starRatingDescription = $("#starRatingDescription");
		var $supDisableStickyFeedbackButton = $("#supDisableStickyFeedbackButton");
		var isEnableStarRating = $feedbackWrapper.data("enableStarRating") ? $feedbackWrapper.data("enableStarRating").toLowerCase() === "true" : false;
		var starRatingQuestion = $("#extendedFeedbackStarRating").data("starRatingQuestion");

		function applyActionCardTags(element, tags) {
			var actionCardId = element.closest('div.card').data('assetid');
			if (actionCardId) {
				tags['ms.actioncardid'] = actionCardId;
				tags['ms.svi'] = '300';
			}
		}

		$('#ocButtonSendNoComment').removeClass('ocHidden');

		var smartFeedbackTextAreaAriaLabel = $('.ocSmartFeedbackTextArea').attr('aria-label');

		$('.smartFeedbackForm').on('change', '.ocSmartFeedbackTextArea', function resetAriaLabel() {
			var $this = $(this);
			if ($this[0].value === '') {
				$this.attr('aria-label', smartFeedbackTextAreaAriaLabel);
			}
			else {
				$this.attr('aria-label', '');
			}
		});

		/* Making the two display only elements (span on checkbox and star rating) space (keyCode 13) and enter (keyCode 32) accessbile */
		$spanDisplayElementsForStarCheckbox.on('keypress', function (e) {
			if (e.keyCode === 13 || e.keyCode === 32) {
				if ($(this).hasClass("checkboxTick")) {
					$(this).siblings(".articleExperienceOptionsCheckbox")[0].click();
				}
				else if ($(this).hasClass("translationRatingStar")) {
					$(this)[0].click();
				}
				/* Preventing keypress from scrolling to bottom of the page */
				e.preventDefault();
			}
		});

		$extendedFeedbackStarCheckboxElements.on('click', function () {
			var $this = $(this);
			if ($this.hasClass("articleExperienceOptionsCheckbox")) {
				checkBoxSelected = $('.articleExperienceOptionsCheckbox:checked').length > 0;
				$this.siblings(".checkboxTick").attr("aria-checked", $this[0].checked);
			}
			else if ($this.hasClass("translationRatingStar")) {
				starRatingSelected = true;
			}

			updateExtendedFeedbackSubmitButtonState();
		});

		$('.ocSmartFeedbackTextArea').on('keyup', function () {
			var $this = $(this);
			if ($this.hasClass("ocSmartFeedbackTextArea")) {
				verbatimEntered = $this[0].value.length > 0;
			}

			updateExtendedFeedbackSubmitButtonState();
		})

		/* Submit button for extended feedback is enabled when user interacts with either star rating or translation quality (where applicable) or when verbatim text area is populated. */
		function updateExtendedFeedbackSubmitButtonState() {
			$("#buttonFeedbackVerbatimSubmit").prop("disabled", !starRatingSelected && !checkBoxSelected && !verbatimEntered);
		}

		$('.smartFeedbackForm').on('click', '.feedbackSelection', function handleYesOrNoSelection() {
			var $this = $(this);
			var $parent = $this.closest('.ocFB');

			// Tracking user selection to log it along with extended feedback options.
			userSelectionIsInfoHelpful = $(this).attr('data-bi-id');

			var tags = {
				'ms.interactiontype': occe.constants.wedcs.interactionType.completedFinalStepInSeries,
				'ms.ea_action': 'FeedbackControlRate',
				'ms.svq': '1',
				'wcs.cot': '1',
				'wcs.et': '2',
				'wcs.cn': $this[0].innerText || ''
			};

			applyActionCardTags($this, tags);

			if ($this.attr('name') === 'buttonYes') {
				$parent.find('.ocFeedbackHeaderIfArticleHelpful').removeClass('ocHidden');
				tags['ms.sva'] = '100';
			} else {
				$parent.find('.ocFeedbackHeaderIfArticleNotHelpful').removeClass('ocHidden');
				tags['ms.sva'] = '0';
			}

			sendAwaLoggingDataForRatingsAndFeedbackButton(tags, $(this));
			switchToFullTextFeedback($parent);
		}).submit(function handleFullTextFeedbackSubmission(e) {
			e.preventDefault();
			var $this = $(this);
			var $parent = $this.closest('.ocFB');
			$this.addClass('ocHidden');
			var feedbackText = $parent.find('.ocSmartFeedbackTextArea').val();

			/* For control where star rating and article experience aren't presented to the user, null values will be logged. */
			var articleExperienceOptions = [];
			$("input:checkbox:checked").each(function () {
				articleExperienceOptions.push($(this).val());
			});

			var tags = {
				'ms.interactiontype': occe.constants.wedcs.interactionType.formSubmit,
				'ms.ea_action': 'Comment',
				'ms.svq': '2',
				'ms.svv': feedbackText,
				'ms.infoHelpful': userSelectionIsInfoHelpful
			};

			if ($("#extendedFeedbackForm").length > 0) {
				tags['ms.articleExp'] = articleExperienceOptions.length > 0 ? articleExperienceOptions.toString() : "";

				if ($feedbackWrapper.data("enableStarRating").toLowerCase() === "true") {
					tags['ms.starRating'] = activatedStarRatingValue != null ? (activatedStarRatingValue + 1) : "";
				}
			}

			applyActionCardTags($this, tags);
			switchToFinalThankYouMessage($parent);
			sendAwaLoggingDataForRatingsAndFeedbackForm(tags);
		});

		function logContentUpdateTelemetry(awaTag, behavior) {
			if (typeof window.top.analytics === 'object') {
				awaTag['behavior'] = window.top.oneDS.Behavior[behavior];
				window.top.analytics.captureContentUpdate(awaTag);
			};
		}

		function switchToFullTextFeedback($parent) {
			$parent.find('.ocSmartFeedbackBegin').hide();
			$parent.find('.ocSmartFeedbackReply').removeClass('ocHidden');
			$feedbackWrapper.addClass('supFeedbackFullTextIsOpen');

			// Event logged to indicate that user has seen the verbatim feedback area for both control and treatment
			// This will be used as a denominator to compute the engagement rate
			var vbtmFeedbackMetaTags = {
				actionType: 'A',
				content: {
					contentId: 'userSeenVbtmFeedbackArea',
					fbnm: 'Feedback',
					fbid: 2,
					areaName: 'Feedback'
				}
			};
			logContentUpdateTelemetry(vbtmFeedbackMetaTags, "SURVEYCHECKPOINT");

			var $verbatimFeedbackHeaderElem = null;
			var elementToFocusOnLoad = null;
			occe.Controls.Feedback.setExtendedFeedbackHeight();

			$(".prrFeedbackWrapper").css("height", "inherit");
			// Computed to make the grey line show (as a distinction between feedback and link farm - when extended feedback is open)
			$(".prrColumnWrapper").css("height", "94.5%");
			$verbatimFeedbackHeaderElem = $("#extendedFeedbackHeader");
			if (isEnableStarRating) {
				elementToFocusOnLoad = "#rating_0";
			}
			else {
				// Focus on the checkbox ID based on Yes (buttonYes) or No (buttonNo) selection
				// Logged with previous selection button ID for tracking through workflow, on #83
				// buttonYes/ buttonNo are data bi IDs logged in the view
				elementToFocusOnLoad = (userSelectionIsInfoHelpful === "buttonYes") ? "#helpful_0" : "#notHelpful_0";
			}

			$('#ocHelp').css('padding-bottom', $('#ocFooterWrapper').height());
			$parent.find(elementToFocusOnLoad).focus();
			$verbatimFeedbackHeaderElem.get(0).scrollIntoView();
			setAlertAnnouncementOnDisplay($verbatimFeedbackHeaderElem);
			$parent.find('.ocButtonSendComment')[0].scrollIntoView(false);
		}

		function switchToFinalThankYouMessage($parent) {
			$parent.find('.ocFeedbackFinalThankYouMessage').removeClass('ocHidden');
			$feedbackWrapper.removeClass('supFeedbackFullTextIsOpen');

			$extendedFeedback.addClass("ocHidden");
			$feedbackWrapper.css("height", "auto");
			$(".prrColumnWrapper").css("height", "inherit");

			$('#ocHelp').css('padding-bottom', $('#ocFooterWrapper').height() + 'px');

			var thankYouElement = '.feedbackThankYou';
			setAlertAnnouncementOnDisplay($(thankYouElement));
			$parent.find(thankYouElement).focus();
		}

		function setAlertAnnouncementOnDisplay($elem) {
			$elem.attr("aria-label", $elem[0].innerText.trim());
			$elem.attr("role", "alert");
		}

		// Begin - Star rating for translation functionality
		function fillStarRating(elementId) {
			$(elementId).addClass("glyph-favorite-star-fill");
			$(elementId).addClass("starRatingFillBlue");
		}

		function emptyStarRating(elementId) {
			$(elementId).removeClass("starRatingFillBlue");
			$(elementId).removeClass("glyph-favorite-star-fill");
		}

		$('.translationRatingStar').on('click', function (e) {
			var currentSelectionIndex = $(this).data("startindex");
			var currentStarDescription = $(this).data("stardescription");

			$starRatingDescription.text(currentStarDescription);
			$starRatingDescription.removeClass("ocHidden");

			for (var i = 0; i < 5; ++i) {
				var elementId = "#rating_" + i;
				if (i <= currentSelectionIndex) {
					fillStarRating(elementId);
				}
				else {
					emptyStarRating(elementId);
				}
			}

			activatedStarRatingValue = currentSelectionIndex;
			activatedStarRatingLabel = currentStarDescription;

			// To stop mouseleave event from getting triggered. When user moves mouse away after click, selected star rating/ description shouldn't be erased from the viewport. 
			$(".translationRatingStar").off("mouseleave");
		});

		$('.translationRatingStar').mouseenter(function () {
			$(".translationRatingStar").on("mouseleave", starRatingMouseLeave);

			var currentHoveredIndex = $(this).data("startindex");
			for (var i = 0; i < 5; ++i) {
				var elementId = "#rating_" + i;
				if (i <= currentHoveredIndex) {
					fillStarRating(elementId);
				}
				else {
					emptyStarRating(elementId);
				}
			}

			$starRatingDescription.text($(this).data("stardescription"));
			$starRatingDescription.removeClass("ocHidden");
		});

		function starRatingMouseLeave() {
			for (var i = 0; i < 5; ++i) {
				var elementId = "#rating_" + i;
				if (activatedStarRatingValue != null && i <= activatedStarRatingValue) {
					fillStarRating(elementId);
				}
				else {
					emptyStarRating(elementId);
				}
			}

			/* Populate with the previously selected value - prior to hover*/
			if (activatedStarRatingLabel != null) {
				$starRatingDescription.text(activatedStarRatingLabel);
				$starRatingDescription.removeClass("ocHidden");

			}
			else {
				$starRatingDescription.addClass("ocHidden");
			}
		}

		// End - Star rating for translation functionality

		$('.smartFeedbackForm').on('click', '.ocButtonSendNoComment', function () {
			var $parent = $(this).closest('.ocFB');
			$parent.find('.smartFeedbackForm').addClass('ocHidden');
			switchToFinalThankYouMessage($parent);
			var tags = {
				'ms.interactiontype': occe.constants.wedcs.interactionType.formSubmit,
				'ms.ea_action': 'Comment',
				'ms.svq': '2',
				'ms.svv': ''
			};

			applyActionCardTags($(this), tags);
			sendAwaLoggingDataForRatingsAndFeedbackButton(tags, $(this));
		});

		$supDisableStickyFeedbackButton.click(function () {
			if ($extendedFeedbackForm.css("visibility") === undefined
				|| ($extendedFeedbackForm.css("visibility") === "visible" && $(".ocSmartFeedbackBegin").is(":visible"))
				|| ($extendedFeedbackForm.css("visibility") === "visible") && $(".ocFeedbackFinalThankYouMessage").hasClass("ocHidden") === false) {
				occe.SetCookie(occe.Controls.Feedback.userHasDisabledFeedbackStickinessCookieName, 'true');
				occe.Controls.Feedback.setUserHasDisabledFeedbackStickiness(true);
				occe.Controls.Feedback.attachFeedbackAboveUniversalFooter();
			}
			else if ($extendedFeedbackForm.css("visibility") === "visible" && $extendedFeedback.hasClass("ocHidden") === false) {
				/* If extended feedback form is visible, clicking 'X' should show Thank you message and not remove stickiness */
				$(".smartFeedbackForm").addClass('ocHidden');
				$supDisableStickyFeedbackButton.removeClass('ocHidden');
				var $parent = $(".ocFB");
				switchToFinalThankYouMessage($parent);
				var tags = {
					'ms.interactiontype': occe.constants.wedcs.interactionType.formSubmit,
					'ms.ea_action': 'Comment',
					'ms.svq': '2',
					'ms.svv': ''
				};
				applyActionCardTags($(this), tags);
				sendAwaLoggingDataForRatingsAndFeedbackButton(tags, $(this));
			}
		});

		function sendAwaLoggingDataForRatingsAndFeedbackButton(wedcsTags, $feedbackControl) {
			if (typeof window.analytics === 'object') {
				var awaData = {
					behavior: typeof window.oneDS === 'object' ? window.oneDS.Behavior.VOTE : '140',
					actionType: 'CL',
					contentTags: {
						sat: wedcsTags['ms.sva'],
						fbnm: 'Feedback',
						fbid: 1,
						areaName: 'Feedback'
					}
				};

				checkForActionCardAndSendAwaData($feedbackControl, awaData);
				window.analytics.capturePageAction($feedbackControl[0], awaData, null);
			};
		}

		function sendAwaLoggingDataForRatingsAndFeedbackForm(wedcsTags) {
			if (typeof window.analytics === 'object') {
				var $feedbackControl = $('[name="feedbackText"]');
				var awaData = {
					behavior: typeof window.oneDS === 'object' ? window.oneDS.Behavior.SURVEYCOMPLETE : '142',
					actionType: 'CL',
					contentTags: {
						contentId: 'buttonFeedbackVerbatimSubmit',
						fbnm: 'Feedback',
						fbid: 2,
						areaName: 'Feedback',
						vtbm: wedcsTags['ms.svv'],
						infoHelpful: wedcsTags['ms.infoHelpful'],
						articleExperience: wedcsTags['ms.articleExp']
					}
				};

				if ($feedbackWrapper.data("enableStarRating").toLowerCase() === "true") {
					awaData.contentTags.starRating = wedcsTags['ms.starRating'];
					awaData.contentTags.starRatingQuestion = starRatingQuestion;
				}

				checkForActionCardAndSendAwaData($feedbackControl, awaData);
				window.analytics.capturePageAction($feedbackControl[0], awaData, null);
			}
		}

		function checkForActionCardAndSendAwaData($feedbackControl, awaData) {
			var actionCardId = $feedbackControl.closest('.card').data('assetid');
			if (actionCardId !== null) {
				awaData.contentTags['compID'] = actionCardId;
			}
		}

	})();

	$(function () {
		occe.Controls = occe.Controls || {};
		occe.Controls.Feedback = (function () {

			function initializeControl() {
				$universalFooter = $('#footerArea');
				$articleElement = $('#ocArticle');
				$supFeedbackWrapper = $('#supFeedbackWrapper');
				$supDisableStickyFeedbackButton = $("#supDisableStickyFeedbackButton");

				initializeDeterminantsOfStickiness();

				$window.on('scroll resize', function () {
					userHasSeenOneFourthOfArticle = hasUserSeenOneFourthOfArticle();
					windowTooTightForStickiness = isWindowTooTightForStickiness();
					universalFooterInViewport = isUniversalFooterInViewPort();
					$('#livefyre').length && (articleTooShortForStickiness = isArticleTooShortForStickiness());
					updateFeedbackStickiness();
				});

				$articleElement.click(function handleArticleHeightChange() {
					universalFooterInViewport = isUniversalFooterInViewPort();
					updateFeedbackStickiness();
				});
			}

			var $universalFooter;
			var $articleElement = "hello";
			var $supFeedbackWrapper;
			var $supDisableStickyFeedbackButton;
			var $window = $(window);
			var $extendedFeedback = $("#extendedFeedback");

			var userHasDisabledFeedbackStickinessCookieName = 'userHasDisabledFeedbackStickiness';

			var userHasDisabledFeedbackStickiness;
			var windowTooTightForStickiness;
			var articleTooShortForStickiness;
			var userHasSeenOneFourthOfArticle;
			var universalFooterInViewport;

			function initializeDeterminantsOfStickiness() {
				userHasDisabledFeedbackStickiness = hasUserDisabledFeedbackStickiness();
				windowTooTightForStickiness = isWindowTooTightForStickiness();
				articleTooShortForStickiness = isArticleTooShortForStickiness();
				userHasSeenOneFourthOfArticle = hasUserSeenOneFourthOfArticle();
				universalFooterInViewport = isUniversalFooterInViewPort();
			}

			function hasUserDisabledFeedbackStickiness() {
				return occe.GetCookie(userHasDisabledFeedbackStickinessCookieName) === 'true';
			}

			function isWindowTooTightForStickiness() {
				return occe.windowIsTabletSizeOrSmaller();
			}

			function isArticleTooShortForStickiness() {
				return $universalFooter.offset().top - $(window).height() <= 200;
			}

			function attachFeedbackAboveUniversalFooter() {
				$supFeedbackWrapper.removeClass('supStickyFeedback');

				/* If extended full text feedback is open, 'X' should continue being shown, when feedback is attached to UHF, as it serves as the cancel button in this case.
				 * In both sticky and non sticky state (above UHF) - when extended feedback is open, 'X' should be shown */
				if ($("#extendedFeedbackForm").css("visibility") === "visible" && $extendedFeedback.hasClass("ocHidden") === false) {
					$supDisableStickyFeedbackButton.removeClass('ocHidden');
					$supDisableStickyFeedbackButton.css("top", $("#supWrapperToPreventFeedbackFlickering").position().top);
				}
				else {
					$supDisableStickyFeedbackButton.addClass('ocHidden');
				}
			}

			function updateFeedbackStickiness() {
				var shouldFeedbackBeSticky =
					!universalFooterInViewport
					&& !userHasDisabledFeedbackStickiness
					&& !windowTooTightForStickiness
					&& userHasSeenOneFourthOfArticle
					&& !articleTooShortForStickiness;

				if (shouldFeedbackBeSticky) {
					makeFeedbackSticky();
				} else {
					if ($("#supWrapperToPreventFeedbackFlickering").hasClass("supFeedbackFullTextIsOpen")) {
						if ($extendedFeedback.css("visibility") === "visible") {
							setExtendedFeedbackHeight();
						}
						$('#ocHelp').css('padding-bottom', $('#ocFooterWrapper').height());
					}
					attachFeedbackAboveUniversalFooter();
				}
			}

			function setExtendedFeedbackHeight() {
				var extendedFeedbackHeaderHeight = $("#extendedFeedbackHeader").css("visibility") == 'visible' ? $("#extendedFeedbackHeader").height() : 0;
				var extendedFeedbackStarRatingHeight = $("#extendedFeedbackStarRating").css("visibility") == 'visible' ? $("#extendedFeedbackStarRating").height() : 0;
				var extendedFeedbackArticleExperienceHeight = $("#extendedFeedbackArticleExperience").css("visibility") == 'visible' ? $("#extendedFeedbackArticleExperience").height() : 0;
				var extendedFeedbackVerbatimHeight = $("#extendedFeedbackVerbatim").css("visibility") == 'visible' ? $("#extendedFeedbackVerbatim").height() : 0;
				var extendedFeedbackFormSubmitHeight = $("#extendedFeedbackFormSubmit").css("visibility") == 'visible' ? $("#extendedFeedbackFormSubmit").height() : 0;
				var privacyStatementHeight = $("#privacyStatement").css("visibility") == 'visible' ? $("#privacyStatement").height() : 0;
				var spacingBottomMargin = extendedFeedbackStarRatingHeight == 0 ? 90 : 110;
				var extendedFeedbackHeight = extendedFeedbackHeaderHeight + extendedFeedbackStarRatingHeight + extendedFeedbackArticleExperienceHeight + extendedFeedbackVerbatimHeight + extendedFeedbackFormSubmitHeight + privacyStatementHeight + spacingBottomMargin;
				$(".supFeedbackFullTextIsOpen").css("height", extendedFeedbackHeight + "px");
			}

			function isUniversalFooterInViewPort() {
				return $window.scrollTop() + $window.height() > $universalFooter.offset().top;
			}

			function makeFeedbackSticky() {
				$supFeedbackWrapper.addClass('supStickyFeedback');
				$supDisableStickyFeedbackButton.css("top", "0");
				$supDisableStickyFeedbackButton.removeClass('ocHidden');
			}

			function hasUserSeenOneFourthOfArticle() {
				if (userHasSeenOneFourthOfArticle) {
					return true;
				}
				var currentScrollTop = $window.scrollTop();
				var yCoordinateOfTopOfArticle = $articleElement.offset().top;
				var oneFourthOfArticleHeight = $articleElement.height() / 4;

				return currentScrollTop > yCoordinateOfTopOfArticle + oneFourthOfArticleHeight;
			}

			return {
				initializeControl: initializeControl,
				attachFeedbackAboveUniversalFooter: attachFeedbackAboveUniversalFooter,
				makeFeedbackSticky: makeFeedbackSticky,
				hasUserDisabledFeedbackStickiness: hasUserDisabledFeedbackStickiness,
				hasUserSeenOneFourthOfArticle: hasUserSeenOneFourthOfArticle,
				updateFeedbackStickiness: updateFeedbackStickiness,
				isUniversalFooterVisible: isUniversalFooterInViewPort,
				setExtendedFeedbackHeight: setExtendedFeedbackHeight,
				userHasDisabledFeedbackStickinessCookieName: userHasDisabledFeedbackStickinessCookieName,

				setUserHasDisabledFeedbackStickiness: function (value) {
					userHasDisabledFeedbackStickiness = value;
				},
				setUniversalFooterInViewport: function (value) {
					universalFooterInViewport = value;
				},
				setWindowTooTightForStickiness: function (value) {
					windowTooTightForStickiness = value;
				},
				setArticleTooShortForStickiness: function (value) {
					articleTooShortForStickiness = value;
				},
				setUserHasSeenOneFourthOfArticle: function (value) {
					userHasSeenOneFourthOfArticle = value;
				}
			};
		})();
	});
})(jQuery),
	function (n) {
		"use strict";
		n(function () {
			occe.Controls.Feedback.initializeControl()
		})
	}(jQuery);
