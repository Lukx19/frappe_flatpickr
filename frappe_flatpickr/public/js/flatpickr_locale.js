; (function ($) {
    flatpickr.l10ns.default = {
        weekdays: {
            shorthand: [__('Sun'), __('Mon'), __('Tue'), __('Wed'), __('Thu'), __('Fri'), __('Sat')],
            longhand: [__('Sunday'), __('Monday'), __('Tuesday'), __('Wednesday'), __('Thursday'), __('Friday'), __('Saturday')]
        },
        months: {
            shorthand: [__('Jan'), __('Feb'), __('Mar'), __('Apr'), __('May'), __('Jun'), __('Jul'), __('Aug'), __('Sep'), __('Oct'), __('Nov'), __('Dec')],
            longhand: [__('January'), __('February'), __('March'), __('April'), __('May'), __('June'), __('July'), __('August'), __('September'), __('October'), __('November'), __('December')]
        },
        daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        firstDayOfWeek: 1,
        rangeSeparator: __(' to '),
        weekAbbreviation: __('Wk'),
        scrollTitle: __('Scroll to increment'),
        toggleTitle: __('Click to toggle'),
        amPM: ['AM', 'PM'],
        yearAriaLabel: __('Year')
    }
})(jQuery)

flatpickr.l10ns.sk = {
        weekdays: {
            shorthand: ["Ned", "Pon", "Ut", "Str", "Štv", "Pia", "Sob"],
            longhand: ["Nedeľa", "Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota"]
        },
        months: {
            shorthand: ["Jan", "Feb", "Mar", "Apr", "Máj", "Jún", "Júl", "Aug", "Sep", "Okt", "Nov", "Dec"],
            longhand: ["Január", "Február", "Marec", "Apríl", "Máj", "Jún", "Júl", "August", "September", "Október", "November", "December"]
        },
        firstDayOfWeek: 1,
        rangeSeparator: " do ",
        ordinal: function ordinal() {
            return ".";
        }
};

flatpickr.locale_list = ['sk']

flatpickr.switch_locale = function (config, locale) {
    if (flatpickr.locale_list.includes(locale))
    {
        return $.extend(config, {
            locale: flatpickr.l10ns.sk
        })
    }
    return config
}
