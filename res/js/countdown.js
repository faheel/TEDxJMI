$('.countdown-timer').countdown({
    date: "June 12, 2022 10:00:00",

    render: function(data) {
        $(".days .value").html(this.leadingZeros(data.days, 2));
        $(".hours .value").html(this.leadingZeros(data.hours, 2));
        $(".minutes .value").html(this.leadingZeros(data.min, 2));
        $(".seconds .value").html(this.leadingZeros(data.sec, 2));
    }
});
