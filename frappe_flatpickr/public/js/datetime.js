// frappe.provide("frappe.ui.form.datetime");


frappe.ui.form.ControlDatetime = frappe.ui.form.ControlDate.extend({
    make_input: function () {
        this._super();
        $.extend(this.flatpickr_config, {
            'time_24hr': true,
            'enableTime': true,
            'enableSeconds': false

        });
        this.flatpickr_config.dateFormat = this.flatpickr_config.dateFormat + " H:i:S"
    },


    set_description: function () {

        const { description } = this.df;
        const { time_zone } = frappe.sys_defaults;
        if (!frappe.datetime.is_timezone_same()) {
            if (!description) {
                this.df.description = time_zone;
            } else if (!description.includes(time_zone)) {
                this.df.description += '<br>' + time_zone;
            }
        }
        this._super();
    },

    get_current_date: function () {
        return frappe.datetime.now_datetime(false)
    },
});
