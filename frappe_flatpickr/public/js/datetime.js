
frappe.ui.form.ControlDatetime = frappe.ui.form.ControlDate.extend({
    modify_configuration(config){
         $.extend(config, {
            'time_24hr': true,
            'enableTime': true,
            'enableSeconds': false

        });
        config.dateFormat = config.dateFormat + " H:i:S"
        return config
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
