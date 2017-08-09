//jshint esversion: 6
module.exports = {
    command_parse: function(message, starting) {
        message = message.split(" ");

        if (message[0] !== starting) {
            return;

        } else {
            return message.slice(1);
        }
    },

    map_to_array: function(messages) {
        let result = [];

        messages.forEach( (item, key, map) => {

            result.push(item.toString());

        });

        return result;
    }
};
