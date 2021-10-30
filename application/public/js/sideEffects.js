$(document).ready(function() {
    // $('#effectsForm').hide();  Hide effects checkboxes
    $(".showForm").on('click', function() {
        $('#effectsForm').toggle();
    })

    // $('.$init').hide();

    var greekNames = {
        "stomach_bowel": {
            "baseName": "Στομαχι/Εντερο",
            "effects": {
                "stomachache": {
                    "type": "Boolean",
                    "name": "Πονο στο στομαχι",
                    "required": true,
                    "default": false
                },
                "cramps": {
                    "type": "Boolean",
                    "name": "Κραμπες",
                    "required": true,
                    "default": false
                },
                "stomachBurn": {
                    "type": "Boolean",
                    "name": "Καψιμο στο στομαχι",
                    "required": true,
                    "default": false
                },
                "acid_reflux": {
                    "type": "Boolean",
                    "name": "Καουρες",
                    "required": true,
                    "default": false
                },
                "indigestion": {
                    "type": "Boolean",
                    "name": "Δυσπεψία",
                    "required": true,
                    "default": false
                },
                "nausea": {
                    "type": "Boolean",
                    "name": "Ναυτια",
                    "required": true,
                    "default": false
                },
                "diarrhea": {
                    "type": "Boolean",
                    "name": "Διαρροια",
                    "required": true,
                    "default": false
                }
            }
        },
        "lungs": {
            "baseName": "Πνευμονες",
            "effects": {
                "cough1": {
                    "type": "Boolean",
                    "name": "Βηχα με η χωρις φλεματα",
                    "required": true,
                    "default": false
                },
                "cough2": {
                    "type": "Boolean",
                    "name": "Βηχα διαφορετικο απο οτι συνηθως",
                    "required": true,
                    "default": false
                },
                "cough3": {
                    "type": "Boolean",
                    "name": "Βηχα με η χωρις πυρετο",
                    "required": true,
                    "default": false
                },
                "shortOfBreath": {
                    "type": "Boolean",
                    "name": "Δύσπνοια",
                    "required": true,
                    "default": false
                }
            }
        },
        "skin": {
            "baseName": "Δερμα",
            "effects": {
                "rash": {
                    "type": "Boolean",
                    "name": "Εξανθηματα",
                    "required": true,
                    "default": false
                },
                "itch_skin": {
                    "type": "Boolean",
                    "name": "Φαγούρα",
                    "required": true,
                    "default": false
                },
                "blister": {
                    "type": "Boolean",
                    "name": "Φουσκάλες",
                    "required": true,
                    "default": false
                },
                "dryness": {
                    "type": "Boolean",
                    "name": "Ξηρότητα",
                    "required": true,
                    "default": false
                },
                "sensitivityToLightSkin": {
                    "type": "Boolean",
                    "name": "Ευαισθησια στο ηλιακο φως",
                    "required": true,
                    "default": false
                }
            }
        },
        "muscle": {
            "baseName": "Μυς/Αρθρωσεις/Νευρα",
            "effects": {
                "pain_discomfort": {
                    "type": "Boolean",
                    "name": "Πονους και ενοχλησεις",
                    "required": true,
                    "default": false
                },
                "tingle_numb": {
                    "type": "Boolean",
                    "name": "Μουδιασμα η μυρμιγκιασμα στα ακρα",
                    "required": true,
                    "default": false
                },
                "muscle_weakness": {
                    "type": "Boolean",
                    "name": "Σoβαρη μυικη αδυναμια/εξαντληση",
                    "required": true,
                    "default": false
                }
            }
        },
        "eyesight": {
            "baseName": "Οραση",
            "effects": {
                "burn_pain_eye": {
                    "type": "Boolean",
                    "name": "Καψιμο/πονο",
                    "required": true,
                    "default": false
                },
                "red_eyes": {
                    "type": "Boolean",
                    "name": "Κοκκινισμα στα ματια",
                    "required": true,
                    "default": false
                },
                "cloudy_eyesight": {
                    "type": "Boolean",
                    "name": "Θολεροτητα στην οραση",
                    "required": true,
                    "default": false
                },
                "discharge": {
                    "type": "Boolean",
                    "name": "Εκκρισεις",
                    "required": true,
                    "default": false
                },
                "irritation_eyes": {
                    "type": "Boolean",
                    "name": "Ερεθισμο στα ματια",
                    "required": true,
                    "default": false
                },
                "itch_eye": {
                    "type": "Boolean",
                    "name": "Κνησμο",
                    "required": true,
                    "default": false
                },
                "sensitivityToLight": {
                    "type": "Boolean",
                    "name": "Ευαισθησια στο φως",
                    "required": true,
                    "default": false
                }
            }
        },
        "pancreas": {
            "baseName": "Ενδοκρινεις αδενες/ Παγκρεας",
            "effects": {
                "headache_p": {
                    "type": "Boolean",
                    "name": "Επιμονη/Ασυνηθιστη κεφαλαλγια",
                    "required": true,
                    "default": false
                },
                "exhastion": {
                    "type": "Boolean",
                    "name": "Υπερκόπωση",
                    "required": true,
                    "default": false
                },
                "weight_fluctuation": {
                    "type": "Boolean",
                    "name": "Αυξηση/απωλεια βαρους",
                    "required": true,
                    "default": false
                },
                "tachycardia": {
                    "type": "Boolean",
                    "name": "Ταχυκαρδια",
                    "required": true,
                    "default": false
                },
                "hair_loss": {
                    "type": "Boolean",
                    "name": "Απωλεια μαλλιων",
                    "required": true,
                    "default": false
                },
                "constipation": {
                    "type": "Boolean",
                    "name": "Δυσκοιλιότητα",
                    "required": true,
                    "default": false
                },
                "nauseus_fainting": {
                    "type": "Boolean",
                    "name": "Ναυτια / λιποθυμικη ταση",
                    "required": true,
                    "default": false
                }
            }
        }
    }

    var idata = {}
    var p_id = $('#patient').val();
    var d_id = $('#diagnose').val();
    var t_id = $('#treatment').val();
    var e_id = $('#e_id').val();


    function getdata(names, t_id) {
        $.ajax({
            url: '/effects/geteffects/' + t_id,
            method: 'get',
            dataType: 'json',
            success: function(response) {
                // e.preventDefault();
                if (response.msg == 'success') {
                    // console.log(response, 'here')
                    $.each(response.data, function(index, data) {
                        // console.log(data)
                        var daty;
                        if (data.date) {
                            daty = data.date.split('T', 1)
                        } else {
                            daty = '21/10/1996'
                        }

                        $('.mygrid').append('<div class="col-sm-2 mt-2"> <table class="table-responsive-sm "> <thead class="col-sm"> <tr class="col-sm"><th class="col-sm" scope="col"><a class="btn btn-warning btn-large" href="/effects/' + data._id + '/edit">Επεξεργασία </a></th> </tr> </thead><tbody class="col-sm addTr' + index + '"></tbody> </div>')

                        for (const [key, value] of Object.entries(data)) {
                            //console.log('value', value)
                            if (typeof value === 'object' && value != null && (value.hasOwnProperty("effects"))) {
                                for (const [key1, value1] of Object.entries(value.effects)) {
                                    if (value1) {
                                        var cc = '.addTr'.concat(index)
                                            // console.log(key, key1)
                                        $(cc).append('<tr class="col-sm"><td class="col-sm">' + names[key]['effects'][key1]["name"] + '</td></tr>')
                                    } else {
                                        continue;
                                    }
                                }
                            } else {
                                continue;
                            }
                        }
                    })
                }

            },
            error: function(response) {
                alert('server error');
            }
        });
    }



    // var datepick = $('.effectdate').val();
    idata['patient'] = p_id;
    idata['diagnose'] = d_id;
    idata['treatment'] = t_id;
    // idata['date'] = datepick;

    function addEffect(data) {
        idata[data.name] = true
    }

    function removeEffect(data) {
        idata[data.name] = false
    }

    $(".checkers").click(function() {
            if ($(this).prop("checked") == true) {
                addEffect(this)
            } else if ($(this).prop("checked") == false) {
                removeEffect(this)
            }
        })
        // $(".checkers", function() {
        //     if ($(this).prop("checked") == true) {
        //         addEffect(this)
        //     } else if ($(this).prop("checked") == false) {
        //         removeEffect(this)
        //     }
        // })



    $('.addbtn1').click(function(e) {
        // e.preventDefault();
        // var datepick = $('#datepicker').val();
        var datepick = $('.effectdate').val();
        idata['date'] = datepick;
        $.ajax({
            url: '/effects/add',
            method: 'post',
            dataType: 'json',
            data: { 'data': idata },
            success: function(response) {
                if (response.msg == 'success') {
                    getdata(greekNames, t_id);
                } else {
                    alert('some error occurred try again');
                }
            },
            error: function(response) {
                alert('server error occured')
            }
        });
    });

    $('.putbtn').click(function(e) {
        // e.preventDefault();
        // var datepick = $('#datepicker').val();
        // var datepick = $('.effectdate').val();
        $.ajax({
            url: '/effects/' + e_id,
            method: 'PUT',
            dataType: 'json',
            data: { 'data': idata },
            success: function(response) {
                if (response.msg == 'success') {
                    getdata(greekNames, t_id);
                } else {
                    alert('some error occurred try again');
                }
            },
            error: function(response) {
                alert('server error occured')
            }
        });
    });
    getdata(greekNames, t_id);


});