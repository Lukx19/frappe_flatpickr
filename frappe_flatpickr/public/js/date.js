// frappe.provide("frappe.ui.form.date");


frappe.ui.form.ControlDate = frappe.ui.form.ControlData.extend({
    make_input: function () {
        this._super();
        this.flatpickr_config = this.create_configuration()
        this.flatpickr_init = true

    },

    create_configuration: function () {

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
        }
    },
    get_current_date: function () {
        return frappe.datetime.now_date(true);
    },
    set_formatted_input: function (value) {
        if (this.flatpickr_init) {
            if (value) {
                this.flatpickr_config.defaultDate = frappe.datetime.str_to_user(value)
            } else {
                this.flatpickr_config.defaultDate = frappe.datetime.str_to_user(this.get_current_date())
            }
            $(this.$input).flatpickr(this.flatpickr_config);
            this.flatpickr_init = false;
        }
        this._super(value);
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
