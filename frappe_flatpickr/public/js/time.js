frappe.provide("frappe.ui.form.time");


frappe.ui.form.ControlTime = frappe.ui.form.ControlData.extend({
    make_input: function () {
        this._super();
        this.flatpickr_config= {
            'time_24hr': true,
            'enableTime': true,
            'enableSeconds': false,
            'allowInput': true,
            'noCalendar': true,
            'dateFormat': "H:i:S",
            'disableMobile': false,
        }
        this.flatpickr_init = true
    },

    set_input: function (value) {
        if (this.flatpickr_init) {
            if (value) {
                var date_obj = frappe.datetime.moment_to_date_obj(moment(value, 'HH:mm:ss'))
                // var date_obj = moment(value, 'HH:mm:ss')
            } else {
                var date_obj = frappe.datetime.now_time(false);
            }
            this.flatpickr_config.defaultDate = date_obj
            $(this.$input).flatpickr(this.flatpickr_config);
            this.flatpickr_init = false
        }
        this._super(value);
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
    }
});
