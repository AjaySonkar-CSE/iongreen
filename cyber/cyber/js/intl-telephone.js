(function ($, Drupal, drupalSettings, once) {

  'use strict';

  async function getUserCountryCode() {
    try {
      const response = await fetch("https://ipinfo.io/json");
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      const data = await response.json();
      return data.country || "ae";
    } catch (e) {
      console.error("Error fetching country data:", e);
      return "ae";
    }
  }
  
  Drupal.webform = Drupal.webform || {};
  Drupal.webform.intlTelInput = Drupal.webform.intlTelInput || {};
  Drupal.webform.intlTelInput.options = Drupal.webform.intlTelInput.options || {};

  Drupal.behaviors.webformTelephoneInternational = {
    attach: function (context) {
      
      $(window).on('load', function () {
        $('input.js-webform-telephone-international').removeAttr('readonly');
      });

      if (!$.fn.intlTelInput) {
        return;
      }

      $(once('webform-telephone-international', 'input.js-webform-telephone-international:not(.enable-auto-country)', context)).each(function () {

        var $telephone = $(this);
        var full_number = "";
        var $error = $('<label class="error form-item--error-message">' + Drupal.t('Invalid phone number') + '</label>').hide();
        $telephone.closest('.js-form-item').append($error);
        var options = {
          separateDialCode: true,
          utilsScript: drupalSettings.webform.intlTelInput.utilsScript,
          nationalMode: false
        };

        if ($telephone.attr('data-webform-telephone-international-initial-country')) {
          options.initialCountry = $telephone.attr('data-webform-telephone-international-initial-country');
        }
        if ($telephone.attr('data-webform-telephone-international-preferred-countries')) {
          options.preferredCountries = JSON.parse($telephone.attr('data-webform-telephone-international-preferred-countries'));
        }

        if (drupalSettings.path.currentLanguage === 'ar' && window.Intl && typeof Intl.DisplayNames === 'function') {
          const displayNames = new Intl.DisplayNames(['ar'], { type: 'region' });
          const countries = window.intlTelInputGlobals.getCountryData();
          const localizedCountries = {};

          countries.forEach(function (country) {
            try {
              const name = displayNames.of(country.iso2.toUpperCase());
              if (name) {
                localizedCountries[country.iso2] = name;
              }
            } catch (e) {
              console.warn('Could not translate country: ', country.iso2);
            }
          });

          options.localizedCountries = localizedCountries;
        }

        options = $.extend(options, Drupal.webform.intlTelInput.options);
        $telephone.intlTelInput(options);

        var reset = function () {
          $telephone.removeClass('error');
          $error.hide();
        };

        var validate = function (thisRef) {
          reset();
          if ($.trim($telephone.val())) {
            
            if (!$telephone.intlTelInput('isValidNumber')) {
              $telephone.addClass('error');
              console.log("Phone number is invalid")
              var placeholder = $telephone.attr('placeholder');
              var message;
              if (placeholder) {
                message = Drupal.t('The phone number is not valid. (e.g. @example)', {'@example': placeholder});
                $telephone.after($error)//For email subscription form. Append is not working here.
              }
              else {
                message = Drupal.t('The phone number is not valid.');
              }
              $('.iti label:not(.form-item--error-message)').remove();
              $error.html(message).show();
              //alert('aa');
              var emptyCtr = 0;
              thisRef.closest('.webform-submission-form').find("input[required],select[required]").each(function(){
                  if($.trim($(this).val()) == ''){
                    emptyCtr++;
                  }
              });
              if(emptyCtr > 0){
                thisRef.closest('.webform-submission-form').find('.webform-button--submit').removeAttr('disabled');
              }
              else{
                thisRef.closest('.webform-submission-form').find('.webform-button--submit').attr('disabled','disabled');
              }
              
              return false;
            }else{
              console.log("Phone number is valid")
              full_number = $telephone.intlTelInput('getNumber');
              //full_number = $telephone.getNumber().replace('+'+$telephone.getSelectedCountryData().dialCode,''); 
              $telephone.val($.trim(full_number));
              thisRef.closest('.webform-submission-form').find('.webform-button--submit').removeAttr('disabled');
            }
          }
          else{
            
          }
          return true;
        };

        
        $('body').on('input', '.webform-submission-form input[required],.webform-submission-form select[required]', function () {
          validate($(this));
        });
        $telephone.on('input', function () {
          //reset();
          //
        });
        //$telephone.on('keyup change', reset);
        $(this).css('position','absolute');
        $(this).css('visibility','hidden');
        $(this).before("<input type='text' class='tmp-tel' placeholder='XX XXX XXXX' />");
        var cCode = $telephone.closest('.form-type-tel').find('.iti__selected-dial-code').text();
        if ($telephone.closest('.webform-submission-form').find('input[name="country_code"]').length > 0) {
          $telephone.closest('.webform-submission-form').find('input[name="country_code"]').val(cCode);
        } 
      });

      function initializeIntlTelephoneInputAutoCountry(userCountry) {
        var default_ctry = userCountry || 'ae';
        $(once('webform-telephone-international', 'input.js-webform-telephone-international.enable-auto-country', context)).each(function () {
          var $telephone = $(this);
          var full_number = "";
          var $error = $('<label class="error form-item--error-message">' + Drupal.t('Invalid phone number') + '</label>').hide();
          $telephone.closest('.js-form-item').append($error);
          var options = {
            separateDialCode: true,
            utilsScript: drupalSettings.webform.intlTelInput.utilsScript,
            nationalMode: false
          };
  
          if ($telephone.attr('data-webform-telephone-international-initial-country')) {
            options.initialCountry = $telephone.attr('data-webform-telephone-international-initial-country');
          }
          if ($telephone.attr('data-webform-telephone-international-preferred-countries')) {
            options.preferredCountries = JSON.parse($telephone.attr('data-webform-telephone-international-preferred-countries'));
          }
  
          if (drupalSettings.path.currentLanguage === 'ar' && window.Intl && typeof Intl.DisplayNames === 'function') {
            const displayNames = new Intl.DisplayNames(['ar'], { type: 'region' });
            const countries = window.intlTelInputGlobals.getCountryData();
            const localizedCountries = {};
  
            countries.forEach(function (country) {
              try {
                const name = displayNames.of(country.iso2.toUpperCase());
                if (name) {
                  localizedCountries[country.iso2] = name;
                }
              } catch (e) {
                console.warn('Could not translate country: ', country.iso2);
              }
            });
  
            options.localizedCountries = localizedCountries;
          }
  
          options = $.extend(options, Drupal.webform.intlTelInput.options);
          $telephone.intlTelInput(options);
  
          var reset = function () {
            $telephone.removeClass('error');
            $error.hide();
          };
  
          var validate = function (thisRef) {
            reset();
            if ($.trim($telephone.val())) {
              
              if (!$telephone.intlTelInput('isValidNumber')) {
                $telephone.addClass('error');
                console.log("Phone number is invalid")
                var placeholder = $telephone.attr('placeholder');
                var message;
                if (placeholder) {
                  message = Drupal.t('The phone number is not valid. (e.g. @example)', {'@example': placeholder});
                  $telephone.after($error)//For email subscription form. Append is not working here.
                }
                else {
                  message = Drupal.t('The phone number is not valid.');
                }
                $('.iti label:not(.form-item--error-message)').remove();
                $error.html(message).show();
                //alert('aa');
                var emptyCtr = 0;
                thisRef.closest('.webform-submission-form').find("input[required],select[required]").each(function(){
                    if($.trim($(this).val()) == ''){
                      emptyCtr++;
                    }
                });
                if(emptyCtr > 0){
                  thisRef.closest('.webform-submission-form').find('.webform-button--submit').removeAttr('disabled');
                }
                else{
                  thisRef.closest('.webform-submission-form').find('.webform-button--submit').attr('disabled','disabled');
                }
                
                return false;
              }else{
                console.log("Phone number is valid")
                full_number = $telephone.intlTelInput('getNumber');
                //full_number = $telephone.getNumber().replace('+'+$telephone.getSelectedCountryData().dialCode,''); 
                $telephone.val($.trim(full_number));
                thisRef.closest('.webform-submission-form').find('.webform-button--submit').removeAttr('disabled');
              }
            }
            else{
              
            }
            return true;
          };
  
          
          $('body').on('input', '.webform-submission-form input[required],.webform-submission-form select[required]', function () {
            validate($(this));
          });
          $telephone.on('input', function () {
            //reset();
            //
          });
          //$telephone.on('keyup change', reset);
          $(this).css('position','absolute');
          $(this).css('visibility','hidden');
          $(this).before("<input type='text' class='tmp-tel' placeholder='XX XXX XXXX' />");

          if (default_ctry != '') {
            var parentForm = $($telephone).closest('form');
            $telephone.intlTelInput("setCountry", default_ctry);
            var countryDropdownVal = default_ctry.toUpperCase();
            if ($(parentForm).find('select[name="country[country]"]').length > 0) {
              $(parentForm).find('select[name="country[country]"]').val(countryDropdownVal);
            }
          }

          var cCode = $telephone.closest('.form-type-tel').find('.iti__selected-dial-code').text();
          if ($telephone.closest('.webform-submission-form').find('input[name="country_code"]').length > 0) {
            $telephone.closest('.webform-submission-form').find('input[name="country_code"]').val(cCode);
          }
        });
      }


      var userCountry = "ae";
      if ($('input.js-webform-telephone-international.enable-auto-country').length > 0) {
        getUserCountryCode().then(countryCode => {
          userCountry = countryCode || "ae";
          initializeIntlTelephoneInputAutoCountry(userCountry);
        }).catch(error => {
          console.error("Error:", error); 
          initializeIntlTelephoneInputAutoCountry(userCountry);
        });
      }


        $('body').on('input', '.tmp-tel', function () {
          var tmpVal = $(this).val().replace(/^0/, '');
          $(this).val(tmpVal);

          $(this).closest('.form-item').find('.js-webform-telephone-international').val(tmpVal);
          $(this).closest('.form-item').find('.js-webform-telephone-international').trigger('input');
        });


        $('body').on('click', '.webform-submission-form li.iti__country', function () {
          var placeholdr = $(this).closest('.form-item').find('.js-webform-telephone-international').attr('placeholder');
          placeholdr = placeholdr.replace(/\d/g, 'X');
          $(this).closest('.form-item').find('.tmp-tel').attr('placeholder',placeholdr);
        });

    }
  };

})(jQuery, Drupal, drupalSettings, once);
