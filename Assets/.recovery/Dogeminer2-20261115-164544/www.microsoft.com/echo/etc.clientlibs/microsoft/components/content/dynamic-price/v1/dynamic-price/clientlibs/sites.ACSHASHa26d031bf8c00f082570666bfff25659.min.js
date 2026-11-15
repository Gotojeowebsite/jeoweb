
/**
 * @file update-oneds.js
 * Update 1ds telemetry elements after <dynamic-price> pulls in the price data
 * 
 * @eventhandler DYNAMIC-PRICE-UPDATED
 * Event name is set in dynamic-price web component
 * 
 * Depends on the heading of the AEM component to have the class "component-heading"
 */

    document?.addEventListener("DYNAMIC-PRICE-UPDATED", function (e) {
        if (!e.detail?.priceText) return;

        setTimeout(() => {
            const $cta = $(e.target.closest('.link-group>*'));
            const priceText = $cta.get(0)?.textContent?.replaceAll(/(\s)+/g, ' ');
            if (!$cta.length) return;
            if (priceText) {
                ['data-bi-cn', 'data-bi-ecn'].forEach(tag => {
                    if ($cta.data('originalText')?.includes('dynamic-price'))
                        $cta.attr(tag, priceText);
                });
            }
            const heading = $cta.closest('[data-componentname], .card').find('.component-heading').get(0)?.textContent?.replaceAll(/(\s)+/g, ' ');
            ['data-bi-hn', 'data-bi-ehn'].forEach(tag => {
                if ($cta.attr(tag)?.includes('dynamic-price'))
                    $cta.attr(tag, heading);
            });
        }, 1500);
    });