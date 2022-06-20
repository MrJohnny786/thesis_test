$(document).ready(function() {
    $('.effectsForm').hide(); // Hide effects checkboxes
    $('.showForm').on('click', function() {
        $('.effectsForm').toggle()
    })

    const greekNames = {
        stomach_bowel: {
            baseName: 'Στομαχι/Εντερο',
            effects: {
                stomachache: {
                    type: 'Boolean',
                    name: 'Πονο στο στομαχι',
                    required: true,
                    default: false
                },
                cramps: {
                    type: 'Boolean',
                    name: 'Κραμπες',
                    required: true,
                    default: false
                },
                stomachBurn: {
                    type: 'Boolean',
                    name: 'Καψιμο στο στομαχι',
                    required: true,
                    default: false
                },
                acid_reflux: {
                    type: 'Boolean',
                    name: 'Καουρες',
                    required: true,
                    default: false
                },
                indigestion: {
                    type: 'Boolean',
                    name: 'Δυσπεψία',
                    required: true,
                    default: false
                },
                nausea: {
                    type: 'Boolean',
                    name: 'Ναυτια',
                    required: true,
                    default: false
                },
                diarrhea: {
                    type: 'Boolean',
                    name: 'Διαρροια',
                    required: true,
                    default: false
                }
            }
        },
        lungs: {
            baseName: 'Πνευμονες',
            effects: {
                cough1: {
                    type: 'Boolean',
                    name: 'Βηχα με η χωρις φλεματα',
                    required: true,
                    default: false
                },
                cough2: {
                    type: 'Boolean',
                    name: 'Βηχα διαφορετικο απο οτι συνηθως',
                    required: true,
                    default: false
                },
                cough3: {
                    type: 'Boolean',
                    name: 'Βηχα με η χωρις πυρετο',
                    required: true,
                    default: false
                },
                shortOfBreath: {
                    type: 'Boolean',
                    name: 'Δύσπνοια',
                    required: true,
                    default: false
                }
            }
        },
        skin: {
            baseName: 'Δερμα',
            effects: {
                rash: {
                    type: 'Boolean',
                    name: 'Εξανθηματα',
                    required: true,
                    default: false
                },
                itch_skin: {
                    type: 'Boolean',
                    name: 'Φαγούρα',
                    required: true,
                    default: false
                },
                blister: {
                    type: 'Boolean',
                    name: 'Φουσκάλες',
                    required: true,
                    default: false
                },
                dryness: {
                    type: 'Boolean',
                    name: 'Ξηρότητα',
                    required: true,
                    default: false
                },
                sensitivityToLightSkin: {
                    type: 'Boolean',
                    name: 'Ευαισθησια στο ηλιακο φως',
                    required: true,
                    default: false
                }
            }
        },
        muscle: {
            baseName: 'Μυς/Αρθρωσεις/Νευρα',
            effects: {
                pain_discomfort: {
                    type: 'Boolean',
                    name: 'Πονους και ενοχλησεις',
                    required: true,
                    default: false
                },
                tingle_numb: {
                    type: 'Boolean',
                    name: 'Μουδιασμα η μυρμιγκιασμα στα ακρα',
                    required: true,
                    default: false
                },
                muscle_weakness: {
                    type: 'Boolean',
                    name: 'Σoβαρη μυικη αδυναμια/εξαντληση',
                    required: true,
                    default: false
                }
            }
        },
        eyesight: {
            baseName: 'Οραση',
            effects: {
                burn_pain_eye: {
                    type: 'Boolean',
                    name: 'Καψιμο/πονο',
                    required: true,
                    default: false
                },
                red_eyes: {
                    type: 'Boolean',
                    name: 'Κοκκινισμα στα ματια',
                    required: true,
                    default: false
                },
                cloudy_eyesight: {
                    type: 'Boolean',
                    name: 'Θολεροτητα στην οραση',
                    required: true,
                    default: false
                },
                discharge: {
                    type: 'Boolean',
                    name: 'Εκκρισεις',
                    required: true,
                    default: false
                },
                irritation_eyes: {
                    type: 'Boolean',
                    name: 'Ερεθισμο στα ματια',
                    required: true,
                    default: false
                },
                itch_eye: {
                    type: 'Boolean',
                    name: 'Κνησμο',
                    required: true,
                    default: false
                },
                sensitivityToLight: {
                    type: 'Boolean',
                    name: 'Ευαισθησια στο φως',
                    required: true,
                    default: false
                }
            }
        },
        pancreas: {
            baseName: 'Ενδοκρινεις αδενες/ Παγκρεας',
            effects: {
                headache_p: {
                    type: 'Boolean',
                    name: 'Επιμονη/Ασυνηθιστη κεφαλαλγια',
                    required: true,
                    default: false
                },
                exhastion: {
                    type: 'Boolean',
                    name: 'Υπερκόπωση',
                    required: true,
                    default: false
                },
                weight_fluctuation: {
                    type: 'Boolean',
                    name: 'Αυξηση/απωλεια βαρους',
                    required: true,
                    default: false
                },
                tachycardia: {
                    type: 'Boolean',
                    name: 'Ταχυκαρδια',
                    required: true,
                    default: false
                },
                hair_loss: {
                    type: 'Boolean',
                    name: 'Απωλεια μαλλιων',
                    required: true,
                    default: false
                },
                constipation: {
                    type: 'Boolean',
                    name: 'Δυσκοιλιότητα',
                    required: true,
                    default: false
                },
                nauseus_fainting: {
                    type: 'Boolean',
                    name: 'Ναυτια / λιποθυμικη ταση',
                    required: true,
                    default: false
                }
            }
        }
    }

    const idata = {}
    const p_id = $('#patient').val()
    const d_id = $('#diagnose').val()
    const t_id = $('#treatment').val()
    console.log('t_id', t_id)
    const e_id = $('#e_id').val()

    idata.patient = p_id
    idata.diagnose = d_id
    idata.treatment = t_id
    console.log('idata', idata)

    /**
     * @param  {} names The whole category object of the side-effects.
     * @param  {} t_id The treatment id so we can get all the side-effects in our DB.
     * Creates div for every side effect found of the treatment that we chose.
     */
    function getdata(names, t_id) {

        $.ajax({
            url: '/effects/geteffects/' + t_id,
            method: 'get',
            dataType: 'json',
            success: function(response) {
                // e.preventDefault();
                console.log('mpes t_id', t_id)
                if (response.msg == 'success') {
                    $.each(response.data, function(index, data) {
                        let daty
                        if (data.date) {
                            daty = data.date.split('T', 1)
                        } else {
                            daty = '21/10/1996'
                        }
                        $('.mygrid').append('<div class="col-sm-2 mt-2"> <table class="table-responsive-sm "> <thead class="col-sm"> <tr class="col-sm text-nowrap"><th class="col-sm" scope="col">' + daty + ' <a class="btn btn-sm btn-outline-success " href="/effects/' + data._id + '/edit">Ε</a><a class="btn btn-sm btn-outline-danger deletus" data-id=' + data._id + ' href="/effects/removeEffect">Δ</a></th> </tr> </thead><tbody class="col-sm addTr' + index + '"></tbody> </div>')

                        for (const [key, value] of Object.entries(data)) {
                            if (typeof value === 'object' && value != null && (value.hasOwnProperty('effects'))) {
                                for (const [key1, value1] of Object.entries(value.effects)) {
                                    if (value1) {
                                        const cc = '.addTr'.concat(index)
                                        $(cc).append('<tr class="col-sm"><td class="col-sm">' + names[key].effects[key1].name + '</td></tr>')
                                    } else {
                                        continue
                                    }
                                }
                            } else {
                                continue
                            }
                        }
                    })
                }
            },
            error: function(response) {
                console.log('mpes t_id11111', t_id)
                alert('server error')
            }
        })
    }

    /**
     * Makes the side-effect of the checkbox's value true.
     * @param  {} data
     */
    function addEffect(data) {
        idata[data.name] = true
    }

    function removeEffect(data) {
        idata[data.name] = false
    }

    $('.checkers').click(function() {
        if ($(this).prop('checked') === true) {
            addEffect(this)
        } else if ($(this).prop('checked') === false) {
            removeEffect(this)
        }
    })


    $('.addbtn1').click(function(e) {
        // e.preventDefault();
        idata.treatment = $(this).attr("data-id")
        var dateClass = '.' + idata.treatment + "Date"
        const datepick = $(dateClass).val()
        idata.date = datepick
        $.ajax({
            url: '/effects/add',
            method: 'post',
            dataType: 'json',
            data: { data: idata },
            success: function(response) {
                if (response.msg === 'success' && response.redirect === true) {
                    console.log('posting ', idata)
                    getdata(greekNames, idata.treatment)
                    window.location.reload();

                } else {
                    alert('some error occurred try again')
                }
            },
            error: function(response) {
                alert('server error occured')
            }
        })
    })

    $('.putbtn').click(function(e) {
        // e.preventDefault();
        $.ajax({
            url: '/effects/' + e_id,
            method: 'PUT',
            dataType: 'json',
            data: { data: idata },
            success: function(response) {
                if (response.msg === 'success' && response.redirect === true) {
                    window.location.href = response.url
                } else {
                    alert('some error occurred try again')
                }
            },
            error: function(response) {
                alert('server error occured')
            }
        })
    })

    $(document).on('click', 'a.deletus', function(e) {
        const $target = $(e.target)
        const id = $target.attr('data-id')
        $.ajax({
            url: '/effects/removeEffect',
            method: 'delete',
            dataType: 'json',
            data: { id: id },
            success: function(response) {
                if (response.msg === 'success') {
                    getdata(greekNames, t_id)
                    window.location = '/patients/' + p_id + '/diagnoses/' + t_id + '/treatments/' + t_id
                } else {
                    alert('did not get deleted')
                }
            },
            error: function(response) {
                alert('server error')
            }
        })
    })

    getdata(greekNames, t_id)
    var last = $.cookie('activeAccordionGroup');
    if (last != null) {
        //remove default collapse settings
        $("#accordionExample .collapse").removeClass('in');
        //show the last visible group
        $("#" + last).collapse("show");
    }
    $("#accordionExample").bind('shown', function() {
        var active = $("#accordionExample .in").attr('id');
        $.cookie('activeAccordionGroup', active)
    });
})