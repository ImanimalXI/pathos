define(function(){



    return SETTINGS =

        {
            // THEME

            //Load random device on Load, set to random or the name of the device
            "DEVICE_LOAD": "random",

            "PAGE_RANDOM": "false",

            "PROJECTS_PATH": "frames/",

            //"LANGUAGE": "en",

            "SLIDESHOW" : {

                "INTERVAL" : "3000"
            },
            //toggle next prev page
            //"37" : "",
            //"38" : "",
            //"39" : "",

            //prev next device
            //"40" : "",
            /*left = 37
             up = 38
             right = 39
             down = 40*/


            "KEYS" : {

                "58" : { "key" : "0" , "cmd" : 'Pathos.showPage($(".list .frame")[9])', "description" : "Show Page 10"},
                "49" : { "key" : "1" , "cmd" : 'Pathos.showPage($(".list .frame")[0])', "description" : "Show Page 1"},
                "50" : { "key" : "2" , "cmd" : 'Pathos.showPage($(".list .frame")[1])', "description" : "Show Page 2"},
                "51" : { "key" : "3" , "cmd" : 'Pathos.showPage($(".list .frame")[2])', "description" : "Show Page 3"},
                "52" : { "key" : "4" , "cmd" : 'Pathos.showPage($(".list .frame")[3])', "description" : "Show Page 4"},
                "53" : { "key" : "5" , "cmd" : 'Pathos.showPage($(".list .frame")[4])', "description" : "Show Page 5"},
                "54" : { "key" : "6" , "cmd" : 'Pathos.showPage($(".list .frame")[5])', "description" : "Show Page 6"},
                "55" : { "key" : "7" , "cmd" : 'Pathos.showPage($(".list .frame")[6])', "description" : "Show Page 7"},
                "56" : { "key" : "8" , "cmd" : 'Pathos.showPage($(".list .frame")[7])', "description" : "Show Page 8"},
                "57" : { "key" : "9" , "cmd" : 'Pathos.showPage($(".list .frame")[8])', "description" : "Show Page 9"},

                "63" : { "key" : "?" , "cmd" : "Pathos.elements.KEY_COMMANDS.toggle()", "description" : "Toggle Key commandsr"},

                "67" : { "key" : "c" , "cmd" : "Pathos.toogleInspector()", "description" : "Toggle CSS Inspector"},
                "99" : { "key" : "C" , "cmd" : "Pathos.toogleInspector()", "description" : "Toggle CSS Inspector"},

                "100" : { "key" : "d" , "cmd" : "Pathos.randomDevice()", "description" : "Pick and display a random device"},

                "73" : { "key" : "i" , "cmd" : "Pathos.elements.INDEX_TOGGLE.trigger('click')", "description" : "Toggle Left side Index"},
                "105" : { "key" : "I" , "cmd" : "Pathos.elements.INDEX_TOGGLE.trigger('click')", "description" : "Toggle Left side Index"},

                "72" : { "key" : "h" , "cmd" : "Pathos.elements.INDEX_TOGGLE.trigger('click')", "description" : "Toggle device chrome"},
                "104" : { "key" : "H" , "cmd" : "Pathos.elements.INDEX_TOGGLE.trigger('click')", "description" : "Toggle device chrome"},

                "83" : { "key" : "s" , "cmd" : "Pathos.elements.SLIDESHOW_PLAY.trigger('click')", "description" : "Toggle slideshow"},
                "115" : { "key" : "S" , "cmd" : "Pathos.elements.SLIDESHOW_PLAY.trigger('click')", "description" : "Toggle slideshow"},

                "77" : { "key" : "m" , "cmd" : "Pathos.elements.COMMENTS_TOGGLE.trigger('click')", "description" : "Toggle Page Comments"},
                "109" : { "key" : "M" , "cmd" : "Pathos.elements.COMMENTS_TOGGLE.trigger('click')", "description" : "Toggle Page Comments"},

                "70" : { "key" : "f" , "cmd" : "Pathos.elements.META.toggle()", "description" : "Toggle project info"},
                "102" : { "key" : "F" , "cmd" : "Pathos.elements.META.toggle()", "description" : "Toggle project info"},

                "79" : { "key" : "o" , "cmd" : "Pathos.deviceRotate()", "description" : "Rotate device"},
                "111" : { "key" : "O" , "cmd" : "Pathos.deviceRotate()", "description" : "Toggle device"},

                "82" : { "key" : "r" , "cmd" : "Pathos.elements.RELEASE_LOG.toggle()", "description" : "Toggle Release Log"},
                "114" : { "key" : "R" , "cmd" : "Pathos.elements.RELEASE_LOG.toggle()", "description" : "Toggle Release Log"}

            }
        };



});