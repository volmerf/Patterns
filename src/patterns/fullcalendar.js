define([
    'require',
    '../lib/jquery',
    '../lib/fullcalendar'
], function(require) {
    var fullcalendar = {
        initContent: function(root) {
            $(root).find('.full-calendar').each(function() {
                var $this = $(this),
                    $calendar = $('<div class="calendar">\n</div>')
                        .insertAfter(this),
                    events = fullcalendar.parseEvents(root);
                $this.css('display', 'None');
                $calendar.fullCalendar({
                    events: events
                });
            });
        },
        parseEvents: function(root) {
            var events = $('.event', root).map(function(idx, event) {
                var ev = {
                    title: $('.title', event).html().trim(),
                    start: $('.start', event).attr('datetime'),
                    end: $('.end', event).attr('datetime'),
                    allDay: $(event).hasClass('all-day'),
                    url: $('a', event).attr('href')
                };
                if (!ev.title) console.error('No event title for:', event);
                if (!ev.start) console.error('No event start for:', event);
                if (!ev.url) console.error('No event url for:', event);
                return ev;
            }).toArray();
            return events;
        }
        // XXX: pimp fullcalendar to set further attributes
        // XXX: initContent on whatever fullcalendar creates
        // XXX: support update if original container changes
        // XXX: make hiding of original optional
        // XXX: provide solgemafullcalendar as alternative, use fullcalendar as fallback or sth like that
    };
    return fullcalendar;
});