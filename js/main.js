requirejs.config({
    baseUrl: 'js/'
});

requirejs(["jquery","deviceData","projects","lang/en"], function ($, devices, projects, LANG) {


    $(function() {

        'use strict';

        var Pathos = {

            SETTINGS_PROJECTS_PATH : 'frames/',
            
            currentProject: null,
            selectors: null,
            slideshowTime: 3000,

            init: function() {
                Pathos.setSelectors();
                Pathos.activateButtons();
                Pathos.getDevices();
                Pathos.setDevice();
                Pathos.getProjects();
                Pathos.getProject();
                Pathos.toogleInspector();
            },

            setSelectors: function() {
               Pathos.elements =
                   {
                       "INDEX": $('.index'),
                       "INDEX_TOGGLE": $('.index .toggle'),
                       "IFRAME": $('iframe'),
                       "FRAME_PAGE": $('iframe'),
                       "FRAME_DEVICE": $('.device'),
                       "FRAME_LABEL":  $('.section .label'),
                       "DEVICES": $(".index .list.devices"),
                       "DEVICE": $(".list.devices a"),
                       "PROJECTS":  $(".index .list.projects"),
                       "SECTION":  $(".device"),
                       "META":  $(".meta"),
                       "NOTIFICATION":  $(".notification"),
                       "PROJECTS_LIST_ITEMS":  (".list.projects li"),
                       "PROJECT":  $(".list.projects a"),
                       "INPUT_EXTERNAL_URL":  $("input.external"),
                       "LOAD_EXTERNAL_URL":  $(".load"),
                       "UPLOAD_FILE_SUBMIT":  $("form input[type=submit]"),
                       "CLIENT_LABEL": $('h2.client'),
                       "INSPECTOR": $(".inspector"),
                       "INSPECTOR_TOOGLE": $(".list .css"),
                       "INSPECTOR_RULES": $(".inspector .rules"),
                       "INSPECTOR_FILTER": $(".inspector .filter"),
                       "COMMENTS": $(".comment"),
                       "CHROME_TOOGLE": $(".list .chrome"),
                       "COMMENTS_TOGGLE": $(".list .comments"),
                       "SLIDESHOW_PLAY": $(".list .play"),
                       "SHOW_ALL": $(".list .all"),
                       "SHOW_FRAME": $(".list .frame")
                   };
            },

            hidePages: function() {
                Pathos.elements.IFRAME.contents().find("[data-frame]").hide();
            },

            getDevices: function() {
                var device;
                var list = Pathos.elements.DEVICES;
                list.innerHTML='';
                for(var i=0; i<devices.length; i++) {
                    device = devices[i];

                    if(device) {
                        list.append('<li><a href="#" class="link chrome" data-target="'+device.name+'">'+device.name+'</a></li>');
                    }

                }
            },

            setDevice: function(device) {

                if(!device) {
                    //device=Page.elements.PROJECTS_LIST_ITEMS.first().text();
                }

                for(var i=0; i<devices.length; i++) {

                    if(device ===  devices[i].name) {
                        Pathos.elements.SECTION.hide();
                        Pathos.elements.SECTION.css({'width':devices[i].chrome.width,'height':devices[i].chrome.height});
                        Pathos.elements.IFRAME.css({'width':devices[i].viewport.width,'height':devices[i].viewport.height,'top':devices[i].viewport.top,'left':devices[i].viewport.left});
                        Pathos.elements.SECTION.css({'background':'url('+devices[i].img+')'}).show();
                    }

                }

            },

            getProjects: function() {
                var project;
                var list = Pathos.elements.PROJECTS;
                list.innerHTML='';
                for(var i=0; i<projects.length; i++) {
                    project = projects[i];

                    if(project) {
                        list.append('<li><a href="#" class="link project" data-project=' + JSON.stringify(project) + ' >'+project.name+'</a></li>');
                    }

                }
            },

            getProject: function(element) {
                if(!element) {
                    var project = {'name':'','external':'','location':''};
                    project.name=$(Pathos.elements.PROJECTS_LIST_ITEMS).first().text();
                    project.external="false";
                    project.location= Pathos.SETTINGS_PROJECTS_PATH + project.name;
                } else {
                    var project = element.data('project');
                }

                if (project && project.external==="false" ) {
                    //TODO don't load if current project
                    try
                    {
                        $.getJSON( Pathos.SETTINGS_PROJECTS_PATH + project.name + "/package.json", function () {
                        })
                            .success(function (data) {
                                if (data) {
                                    //Page.elements.CLIENT_LABEL.text(data.name);
                                    Pathos.setMeta(data);
                                }
                                Pathos.elements.IFRAME.attr('src', Pathos.SETTINGS_PROJECTS_PATH + project.name + '/index.html');
                                window.setTimeout(function(){
                                    Pathos.elements.IFRAME.load( Pathos.SETTINGS_PROJECTS_PATH + project.name + '/index.html', function(){
                                        Pathos.getPages();
                                        Pathos.hidePages();
                                        Pathos.elements.IFRAME.contents().find("[data-frame]").first().show();
                                        Pathos.getCss();
                                    });
                                }, 1000 );
                                Pathos.currentProject = project;
                            });
                    }
                    catch(err)
                    {
                        Pathos.showError(err.message);
                    }

                } else if(project.external) {
                    Pathos.getFromUrl(project.location);
                } else {
                    Pathos.showError(LANG[0].ERROR_LOAD);
                }

            },

            showAllPages: function() {
                Pathos.elements.IFRAME.contents().find("[data-frame]").show();
            },

            showError: function(err) {
                Pathos.elements.NOTIFICATION.text(err).show(200).delay(5000).hide(50);
            },

            showPage: function(el) {
                var page = el.data('target');
                if(page) {
                    Pathos.elements.IFRAME.contents().find("[data-frame]").each(function(index) {
                            var data = $(this).data('frame');
                            if(page === data.title) {
                                $(this).slideDown(200);
                                Pathos.elements.FRAME_LABEL.text(data.title);
                                Pathos.showComment(data.comment);
                            } else {
                                $(this).hide();
                            }

                        }
                    );
                }
            },

            setMeta: function(data) {
                var text = '';
                Pathos.elements.META.text('').hide();
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        if(typeof data[key] !== 'object' ) {
                            text += '<strong>' + key + "</strong>: " + data[key] + '<br>';
                        } else {
                            for (var key2 in data[key]) {
                                text += '<strong>' + key2 + "</strong>: " + eval("data[key]."+ key2) + '<br>';
                            }
                        }

                    }
                }

                if(text!=='') {
                    Pathos.elements.META.html(text).show();
                }
            },

            showComment: function(comment) {
                if(comment && comment!=='') {
                    Pathos.elements.COMMENTS.text(comment).show();
                } else {
                    Pathos.elements.COMMENTS.hide(100);
                }
            },

            toogleInspector: function() {
                Pathos.elements.INSPECTOR.toggle();
            },

            toogleComments: function() {
                Pathos.elements.COMMENTS.toggle();
            },

            getPages: function() {
                var pages =Pathos.elements.IFRAME.contents().find("[data-frame]");
                var list = $(".index .list.pages");

                list.empty();
                Pathos.elements.IFRAME.contents().find("[data-frame]").each(function(index) {
                    var data = $(this).data('frame');
                    if(data) {
                        list.append('<li><a href="#" class="link frame" data-target="'+data.title+'">'+data.title+'</a></li>');
                    }

                });
            },

           /* getProjectData: function(url) {
                if( (url && url.length>3) && url!=='http://') {

                    window.setTimeout(function(){
                    },2000);
                }
            },*/

            getFromUrl: function(url) {
                if( (url && url.length>3) && url!=='http://') {
                    Pathos.elements.IFRAME.attr('src',url);
                    window.setTimeout(function(){
                        Pathos.elements.IFRAME.load( url, function(){
                            Pathos.getPages();
                            Pathos.hidePages();
                            Pathos.getCss();
                            Pathos.currentProject = url;
                            Pathos.elements.IFRAME.contents().find("[data-frame]").first().show();
                            /*$.getJSON(project.location +"/package.json", function () {
                             })
                             .success(function (data) {
                             if (data) {
                             //Page.elements.CLIENT_LABEL.text(data.name);
                             Page.setMeta(data);
                             }

                             });*/

                        });
                    },1000);
                }
            },

            filterCss: function(value) {
                var css  = Pathos.elements.IFRAME.contents().get(0),
                    selector = '',
                    element = '';

                if(value.length>1) {
                    //$('.rule').hide();
                    $.each(css.styleSheets, function(sheetIndex, sheet) {
                        $.each(sheet.cssRules || sheet.rules, function(ruleIndex, rule) {
                            selector = rule.selectorText;
                            element = $("[data-rule='"+ selector +"']");
                            if(rule.selectorText) {
                                if(rule.selectorText.indexOf(value) > -1  ) {
                                    //if(element.is(":hidden")) {
                                    if(element.css("display") === 'none' ) {
                                        element.show(100);
                                    }
                                } else {
                                    element.hide(100);
                                }
                            }



                        });
                    });
                } else {
                    $('.rule').show(150);
                }
            },

            getCss: function() {
                var css  = Pathos.elements.IFRAME.contents().get(0),
                    cssData = '';

                $.each(css.styleSheets, function(sheetIndex, sheet) {

                    $.each(sheet.cssRules || sheet.rules, function(ruleIndex, rule) {
                        cssData+="<div class='rule' data-rule='" + rule.selectorText + "'>"+rule.cssText.split(";").join(";<br>").split("{").join("{<br>") + "</div><br><br>";
                    });
                    document.querySelector('.inspector .rules').innerHTML=cssData;
                });
            },

            play: function() {
                Pathos.elements.INDEX.addClass('hidden');
                Pathos.play=setInterval(function() {
                    Pathos.next();
                }, Pathos.slideshowTime);
            },

            stop: function() {
                if(Pathos.play)  {
                    clearInterval(Pathos.play);
                };
            },

            next: function() {
                var section = Pathos.elements.IFRAME.contents().find(".selected[data-frame]"),
                    next = Pathos.elements.IFRAME.contents().find(".selected[data-frame]").next();

                if(next.length>0) {
                    section.removeClass('selected').hide(50).next().show(100).addClass('selected');
                } else {
                    Pathos.elements.IFRAME.contents().find("[data-frame]").hide().first().show().addClass('selected');
                }
            },

            activateButtons: function() {

                Pathos.elements.DEVICE.live("click", function(e) {
                    e.preventDefault();
                    Pathos.setDevice($(this).text());
                });

                Pathos.elements.PROJECT.live("click", function(e) {
                    e.preventDefault();
                    Pathos.getProject($(this));
                });

                Pathos.elements.SHOW_ALL.bind("click", function(e) {
                    e.preventDefault();
                    Pathos.showAllPages();
                });

                Pathos.elements.INSPECTOR_TOOGLE.bind("click", function(e) {
                    e.preventDefault();
                    Pathos.toogleInspector();
                });

                Pathos.elements.COMMENTS_TOGGLE.bind("click", function(e) {
                    e.preventDefault();
                    Pathos.toogleComments();
                    if(this.innerHTML===LANG[0].COMMENTS_SHOW) {
                        this.innerHTML=LANG[0].COMMENTS_HIDE;
                    } else {
                        this.innerHTML=LANG[0].COMMENTS_SHOW;
                    }
                });

                Pathos.elements.INDEX_TOGGLE.bind("click", function(e) {
                    e.preventDefault();
                    if(Pathos.elements.INDEX.hasClass('hidden')) {
                        Pathos.elements.INDEX.removeClass('hidden');
                    } else {
                        Pathos.elements.INDEX.addClass('hidden');
                    }
                });

                Pathos.elements.IFRAME.bind("click", function(e) {
                    e.preventDefault();
                    //update inspector with css info
                });

                Pathos.elements.LOAD_EXTERNAL_URL.bind("click", function(e) {
                    e.preventDefault();
                    Pathos.getFromUrl(Pathos.elements.INPUT_EXTERNAL_URL.val());
                    //update inspector with css info
                });

                /*Page.elements.UPLOAD_FILE_SUBMIT.on('click', function(ev) {
                    var form = $('form')[0];
                    var fd = new FormData(form);
                    var xhr = new XMLHttpRequest();
                    xhr.open(form.method, form.action, true);
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4 && xhr.status == 200) {
                            // handle success case
                            //Page.getPages();
                            //Page.hidePages();
                            //Page.getCss();
                        }
                    };
                    xhr.send(fd);
                    return false;
                });*/

                Pathos.elements.CHROME_TOOGLE.bind("click", function(e) {
                    e.preventDefault();
                    if(Pathos.elements.FRAME_DEVICE.hasClass('hide')){
                        Pathos.elements.FRAME_DEVICE.removeClass('hide');
                        Pathos.elements.IFRAME.removeClass('chrome');
                    } else {
                        Pathos.elements.IFRAME.addClass('chrome');
                        Pathos.elements.FRAME_DEVICE.addClass('hide');
                    }
                });

               /* Page.elements.INDEX_TOOGLE.bind("click", function(e) {
                    e.preventDefault();
                    if($('.device').hasClass('hide')){
                        $('.device').removeClass('hide');
                    } else {
                        $('.device').addClass('hide');
                    }
                });*/

                Pathos.elements.SHOW_FRAME.live("click", function(e) {
                    e.preventDefault();
                    Pathos.hidePages();
                    Pathos.showPage($(this));
                });

                Pathos.elements.INSPECTOR_FILTER.bind("keyup", function(e) {
                    e.preventDefault();
                    Pathos.filterCss($(this).val());
                });

                Pathos.elements.SLIDESHOW_PLAY.bind("click", function(e) {
                    e.preventDefault();
                    $(".section").hide().first().show().addClass('selected');

                    if(this.innerHTML===LANG[0].SLIDESHOW_PLAY) {
                        Pathos.play();
                        this.innerHTML=LANG[0].SLIDESHOW_STOP;
                    } else {
                        Pathos.stop();
                        this.innerHTML=LANG[0].SLIDESHOW_PLAY;
                    }
                });
            }

        }

        Pathos.init();
    });
});


