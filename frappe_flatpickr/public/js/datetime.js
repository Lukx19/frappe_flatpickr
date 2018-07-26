frappe.provide("frappe.ui.form.datetime");


frappe.ui.form.ControlDatetime = frappe.ui.form.ControlData.extend({
    make_input: function () {
        console.log("make input datetime")
        this._super();
        this.flatpickr_config = this.create_configuration()
        $.extend(this.flatpickr_config, {
            'allowInput': true,
            'disableMobile': false,
            'time_24hr': true,
            'enableTime': true,
            'enableSeconds': true

        });
        this.flatpickr_config.dateFormat = this.flatpickr_config.dateFormat + " H:i:S"
        console.log(this.flatpickr_config)

        $(this.$input).flatpickr(this.flatpickr_config);
    },

    create_configuration: function () {


        let lang = frappe.boot.user.language || 'en';
        if (!$.fn.datepicker.language[lang]) {
            lang = 'en';
        }

        let sysdefaults = frappe.boot.sysdefaults;
        let date_format = sysdefaults && sysdefaults.date_format
            ? sysdefaults.date_format : 'yyyy-mm-dd';
        date_format = date_format.replace("yyyy", "Y")
        date_format = date_format.replace("mm", "m")
        date_format = date_format.replace("dd", "d")
        return {
            'allowInput': true,
            'dateFormat': date_format,
            'disableMobile': false

        }
    },

    set_description: function () {

        const { description } = this.df;
        const { time_zone } = frappe.sys_defaults;
        console.log("description " + description + "   " + time_zone + "  " + frappe.datetime.is_timezone_same())
        if (!frappe.datetime.is_timezone_same()) {
            if (!description) {
                this.df.description = time_zone;
            } else if (!description.includes(time_zone)) {
                this.df.description += '<br>' + time_zone;
            }
        }
        this._super();
        // const { description } = this.df;
        // const { time_zone } = frappe.sys_defaults;
        // console.log("description " + frappe.sys_defaults + "   " + this.df)
    },

    set_formatted_input: function (value) {
        console.log("set_formatted_input " + value)
        this._super(value);
    },
    parse: function (value) {
        // console.log("parse " + value + " -> " + frappe.datetime.user_to_str(value))
        if (value) {
            return frappe.datetime.user_to_str(value);
        }
    },
    format_for_input: function (value) {
        console.log("format_for_input " + value + " ->  " + frappe.datetime.str_to_user(value))
        if (value) {
            return frappe.datetime.str_to_user(value);
        }
        return "";
    },
    validate: function (value) {
        console.log("validate " + value)
        if (value && !frappe.datetime.validate(value)) {
            let sysdefaults = frappe.sys_defaults;
            let date_format = sysdefaults && sysdefaults.date_format
                ? sysdefaults.date_format : 'yyyy-mm-dd';
            frappe.msgprint(__("Date must be in format: {0}", [date_format]));
            return '';
        }
        return value;
    }

    // set_formatted_input: function (value) {
    //     console.log("set_formatted_input " + value)

    //     this._super(value.substring(0, value.length - 9));
    // },

    // parse: function (value) {
    //     console.log("parse " + value)
    //     if (value) {
    //         console.log("parse " + value + " -> " + frappe.datetime.user_to_str(value))
    //         return frappe.datetime.user_to_str(value);
    //     }
    //     console.log("parse " + value + " -> " + frappe.datetime.user_to_str("2018-07-02 10:00:00"))
    //     return "2018-07-02 10:00:00"
    // },
    // format_for_input: function (value) {
    //     console.log("format_for_input " + value + " ->  " + frappe.datetime.str_to_user(value))
    //     if (value) {
    //         return frappe.datetime.str_to_user(value);
    //     }
    //     return "";
    // },
    // validate: function (value) {
    //     console.log("validate " + value)
    //     // if (value && !frappe.datetime.validate(value)) {
    //     //     let sysdefaults = frappe.sys_defaults;
    //     //     let date_format = sysdefaults && sysdefaults.date_format
    //     //         ? sysdefaults.date_format : 'yyyy-mm-dd';
    //     //     frappe.msgprint(__("Date must be in format: {0}", [date_format]));
    //     //     return '';
    //     // }
    //     return value;
    // }
});

// frappe.ui.form.ControlDatetime = frappe.ui.form.ControlDate.extend({
//     set_date_options: function () {
//         this._super();
//         this.today_text = __("Now");
//         this.date_format = frappe.defaultDatetimeFormat;
//         $.extend(this.datepicker_options, {
//             timepicker: true,
//             timeFormat: "hh:ii:ss"
//         });
//     },
//     get_now_date: function () {
//         return frappe.datetime.now_datetime(true);
//     },
//     set_description: function () {
//         const { description } = this.df;
//         const { time_zone } = frappe.sys_defaults;
//         console.log("description " + description + "   " + time_zone + "  " + frappe.datetime.is_timezone_same())
//         if (!frappe.datetime.is_timezone_same()) {
//             if (!description) {
//                 this.df.description = time_zone;
//             } else if (!description.includes(time_zone)) {
//                 this.df.description += '<br>' + time_zone;
//             }
//         }
//         console.log("description " + this.df.description)
//         this._super();
//     }
// });
