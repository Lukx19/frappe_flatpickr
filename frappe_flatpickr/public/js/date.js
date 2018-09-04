
frappe.ui.form.ControlDate = frappe.ui.form.ControlData.extend({
    make_input: function () {
        this._super();
        this.flatpickr_config = this.create_configuration()
        this.flatpickr_config = this.modify_configuration(this.flatpickr_config)

        let language = frappe.boot.user.language || frappe.boot.lang
        this.flatpickr_config = flatpickr.switch_locale(this.flatpickr_config, language)

        this.fp = $(this.$input).flatpickr(this.flatpickr_config);
        // this.fp.mobileFormatStr = this.flatpickr_config.dateFormat
        console.log(this.fp)
    },

    create_configuration: function () {
        console.log("config")
        let sysdefaults = frappe.boot.sysdefaults;
        let date_format = sysdefaults && sysdefaults.date_format
            ? sysdefaults.date_format : 'yyyy-mm-dd';
        date_format = date_format.replace("yyyy", "Y")
        date_format = date_format.replace("mm", "m")
        date_format = date_format.replace("dd", "d")
        return {
            'allowInput': true,
            'dateFormat': date_format,
            'disableMobile': false,
            "defaultDate": frappe.datetime.str_to_user(this.get_current_date()),
        }
    },
    modify_configuration: function (config) {
        return config
    },
    get_current_date: function () {
        return frappe.datetime.now_date(true);
    },
    set_formatted_input: function (value) {
        console.log("set_formatted_input")

        console.log("before super value" + $(this.$input).val())
        this._super(value);
        if (this.get_input_value()) {
            console.log("jumping")
            this.fp.setDate(this.get_input_value())
        }
        console.log("after super value" + $(this.$input).val())
    },
    parse: function (value) {
        if (value) {
            return frappe.datetime.user_to_str(value);
        }
    },
    format_for_input: function (value) {
        if (value) {
            return frappe.datetime.str_to_user(value);
        }
        return "";
    },
    validate: function (value) {
        if (value && !frappe.datetime.validate(value)) {
            let sysdefaults = frappe.sys_defaults;
            let date_format = sysdefaults && sysdefaults.date_format
                ? sysdefaults.date_format : 'yyyy-mm-dd';
            frappe.msgprint(__("Date must be in format: {0}", [date_format]));
            return '';
        }
        return value;
    }
});
