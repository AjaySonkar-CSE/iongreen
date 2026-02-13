(function ($, Drupal) {
    $(document).ready(function () {

        // Function to get query parameters from the current URL
        function getQueryParams() {
            var params = {};
            window.location.search.substring(1).split('&').forEach(function (param) {
                var paramParts = param.split('=');
                if (paramParts.length === 2) {
                    params[paramParts[0]] = paramParts[1];
                }
            });
            // console.log(params);
            return params;
        }

        // Function to append UTM parameters to all internal links
        function appendOrReplaceUTMToLinks() {
            var queryParams = getQueryParams();
            var utmParams = {};
            // Extract UTM and additional parameters to propagate
            var keysToPropagate = [
                'gclid',
                'dclid',
                'fbclid',
                'msclkid',
                'licid',
                'twclid',
                'ttclid',
                'scid',
                'uclid',
                'glid',
                'gad_source'
            ];
            for (var key in queryParams) {
                if (queryParams.hasOwnProperty(key) &&
                    (key.toLowerCase().startsWith('utm_') || keysToPropagate.includes(key.toLowerCase()))) {
                    utmParams[key] = queryParams[key];
                }
            }

            var utmQueryString = $.param(utmParams);

            if (utmQueryString) {
                $('a').each(function () {
                    var $link = $(this);
                    var href = $link.attr('href');

                    // Ensure the link is internal and not a file, anchor, or external link
                    if (href &&
                        href.indexOf('#') === -1 &&
                        href.indexOf('mailto:') === -1 &&
                        href.indexOf('javascript:') === -1) {

                        var separator = href.indexOf('?') === -1 ? '?' : '&';

                        // Remove any existing UTM parameters before appending the new ones
                        href = href.replace(/([&?]utm_[^&]+)/g, '');

                        // Append the UTM parameters
                        $link.attr('href', href + separator + utmQueryString);
                    } else if (href == '/contact-us/#contact') {
                        var splitter = '#contact';
                        var hrefParts = href.split(splitter)
                        var hrefPart1 = hrefParts[0];
                        var separator = href.indexOf('?') === -1 ? '?' : '&';
                        var fullUrlWithUTM = hrefPart1 + separator + utmQueryString + splitter;
                        $link.attr('href', fullUrlWithUTM)
                    }
                });
            }
        }

        // Append UTM parameters to the search form action
        function appendUTMToSearchFormAction() {
            var queryParams = getQueryParams();
            var utmParams = {};
            for (var key in queryParams) {
                if (queryParams.hasOwnProperty(key) && key.startsWith('utm_')) {
                    utmParams[key] = queryParams[key];
                }
            }

            var utmQueryString = $.param(utmParams); // Convert UTM params to query string

            var $searchForm = $('#sarchform');
            var currentAction = $searchForm.attr('action').split('?')[0];

            // Construct the new action URL with UTM parameters
            var newAction = currentAction;

            if (utmQueryString) {
                newAction += '?' + utmQueryString;
            }
            // Remove any trailing duplicate query params
            newAction = newAction.replace(/\?([^?]*)\?/, '?$1&'); // Replace the second "?" with "&"
            // Update the form action with the new URL
            $searchForm.attr('action', newAction);
        }

        // Append or replace UTM parameters in internal links
        appendOrReplaceUTMToLinks();
        // Append or replace UTM parameters in the search form action
        appendUTMToSearchFormAction();
    });
})(jQuery, Drupal);
