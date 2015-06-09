(function (compId) {

    "use strict";
    var im='images/',
        aud='media/',
        vid='media/',
        js='js/',
        fonts = {
        },
        opts = {
            'gAudioPreloadPreference': 'auto',
            'gVideoPreloadPreference': 'auto'
        },
        resources = [
        ],
        scripts = [
            js+"jquery-2.0.3.min.js",
            "http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/utils/Draggable.min.js",
            "http://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"
        ],
        symbols = {
            "stage": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "both",
                centerStage: "both",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            id: 'imageSymbolViewPort',
                            type: 'group',
                            rect: ['62', '28', '900', '556', 'auto', 'auto'],
                            overflow: 'visible',
                            opacity: '1',
                            c: [
                            {
                                id: 'imageSymbolContainer',
                                type: 'rect',
                                rect: ['0', '0', '900', '556', 'auto', 'auto'],
                                overflow: 'hidden',
                                borderRadius: ["0px 0px", "0px 0px", "0px 0px", "0px 0px"],
                                fill: ["rgba(18,18,18,0.00)"],
                                stroke: [0,"rgb(0, 0, 0)","none"]
                            }]
                        },
                        {
                            id: 'dialGroup',
                            type: 'group',
                            rect: ['302', '330', '412', '449', 'auto', 'auto'],
                            c: [
                            {
                                id: 'dialShadow',
                                type: 'image',
                                rect: ['0', '377', '412', '55', 'auto', 'auto'],
                                opacity: '0',
                                fill: ["rgba(0,0,0,0)",im+"dialShadow.png",'0px','0px']
                            },
                            {
                                id: 'ring',
                                display: 'block',
                                type: 'ellipse',
                                rect: ['-13', '-24', '341', '341', 'auto', 'auto'],
                                clip: 'rect(0px 437.7190856933594px 285.6741638183594px 0px)',
                                borderRadius: ["50%", "50%", "50%", "50%"],
                                opacity: '0',
                                fill: ["rgba(208,216,221,0.00)"],
                                stroke: [48,"rgba(234,239,240,1.00)","solid"],
                                transform: [[],[],[],['0.89','0.89']]
                            },
                            {
                                id: 'blueDialBg',
                                type: 'image',
                                rect: ['24', '17', '371px', '360px', 'auto', 'auto'],
                                borderRadius: ["50px 50px", "50px 50px", "50px 50px", "50px 50px"],
                                opacity: '0',
                                fill: ["rgba(0,0,0,0)",im+"dial.png",'0px','0px']
                            },
                            {
                                id: 'whiteTopDial',
                                type: 'image',
                                rect: ['105', '84', '208px', '226px', 'auto', 'auto'],
                                opacity: '0',
                                fill: ["rgba(0,0,0,0)",im+"topDial.png",'0px','0px']
                            },
                            {
                                id: 'dial',
                                type: 'ellipse',
                                rect: ['35', '23', '341', '341', 'auto', 'auto'],
                                borderRadius: ["50%", "50%", "50%", "50%"],
                                opacity: '1',
                                fill: ["rgba(222,230,231,0.00)"],
                                stroke: [0,"rgba(192,192,192,1.00)","solid"]
                            },
                            {
                                id: 'titleViewPort',
                                type: 'group',
                                rect: ['119', '182', '180', '36', 'auto', 'auto'],
                                overflow: 'hidden',
                                opacity: '0',
                                c: [
                                {
                                    id: 'titleContainer',
                                    type: 'rect',
                                    rect: ['0', '0', '180', '36', 'auto', 'auto'],
                                    overflow: 'visible',
                                    borderRadius: ["0px", "0px", "0px 0px", "0px 0px"],
                                    fill: ["rgba(208,216,221,0.00)"],
                                    stroke: [0,"rgb(0, 0, 0)","none"]
                                }]
                            }]
                        }
                    ],
                    style: {
                        '${Stage}': {
                            isStage: true,
                            rect: ['null', 'null', '1024', '768', 'auto', 'auto'],
                            sizeRange: ['null','1024px','undefined','undefined'],
                            overflow: 'hidden',
                            fill: ["rgba(234,239,240,1.00)"]
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: false,
                    data: [

                    ]
                }
            },
            "ImageSymbol0": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            type: 'rect',
                            borderRadius: ['48px 48px', '48px 48px', '48px 48px', '48px 48px'],
                            id: 'outline',
                            opacity: '1',
                            rect: ['0px', '0px', 896, 552, 'auto', 'auto'],
                            overflow: 'hidden',
                            stroke: ['2px', 'rgba(208,216,221,1.00)', 'solid'],
                            fill: ['rgba(208,216,221,1.00)'],
                            c: [
                            {
                                rect: [-4, -4, '900px', '556px', 'auto', 'auto'],
                                id: 'grass',
                                opacity: '1',
                                type: 'image',
                                fill: ['rgba(0,0,0,0)', 'images/grass.jpg', '0px', '0px']
                            },
                            {
                                type: 'text',
                                opacity: '0',
                                rect: [-58, 102, 'auto', 'auto', 'auto', 'auto'],
                                id: 'Text2',
                                text: 'GREEN',
                                align: 'center',
                                font: ['Arial, Helvetica, sans-serif', [278, 'px'], 'rgba(254,246,233,1.00)', '900', 'none', 'normal', '', 'nowrap']
                            },
                            {
                                type: 'text',
                                opacity: '0',
                                rect: [-58, 294, 'auto', 'auto', 'auto', 'auto'],
                                id: 'Text2Copy',
                                text: 'GREEN',
                                align: 'center',
                                font: ['Arial, Helvetica, sans-serif', [278, 'px'], 'rgba(254,246,233,1.00)', '900', 'none', 'normal', '', 'nowrap']
                            },
                            {
                                type: 'text',
                                opacity: '0',
                                rect: [41, 216, 790, 97, 'auto', 'auto'],
                                id: 'Text2Copy2',
                                text: 'Interact by either dragging the images or spinning the dial.',
                                align: 'center',
                                font: ['Arial, Helvetica, sans-serif', [36, 'px'], 'rgba(253,254,246,1.00)', '700', 'none', 'normal']
                            }]
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            overflow: 'hidden',
                            rect: [null, null, 900, 556]
                        }
                    }
                },
                timeline: {
                    duration: 1575,
                    autoPlay: false,
                    data: [
                        [
                            "eid1815",
                            "color",
                            1575,
                            0,
                            "easeOutQuart",
                            "${Text2Copy2}",
                            'rgba(253,254,246,1.00)',
                            'rgba(253,254,246,1.00)'
                        ],
                        [
                            "eid1806",
                            "top",
                            575,
                            1000,
                            "easeOutBack",
                            "${Text2Copy2}",
                            '216px',
                            '186px'
                        ],
                        [
                            "eid1809",
                            "opacity",
                            575,
                            1000,
                            "easeOutBack",
                            "${Text2Copy2}",
                            '0',
                            '1'
                        ]
                    ]
                }
            },
            "ImageSymbol1": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            type: 'rect',
                            borderRadius: ['48px 48px', '48px 48px', '48px 48px', '48px 48px'],
                            id: 'outline',
                            opacity: '1',
                            rect: ['0px', '0px', 896, 552, 'auto', 'auto'],
                            overflow: 'hidden',
                            stroke: ['2px', 'rgb(208, 216, 221)', 'solid'],
                            fill: ['rgba(179,43,115,1)'],
                            c: [
                            {
                                id: 'leaves',
                                type: 'image',
                                rect: [-2, -2, '900px', '556px', 'auto', 'auto'],
                                fill: ['rgba(0,0,0,0)', 'images/leaves.jpg', '0px', '0px']
                            }]
                        },
                        {
                            rect: [665, 216, 194, 349, 'auto', 'auto'],
                            opacity: '0',
                            font: ['Arial, Helvetica, sans-serif', [36, 'px'], 'rgba(253,254,246,1.00)', '700', 'none', 'normal'],
                            id: 'Text2Copy3',
                            text: 'You can edit the icons &amp; titles on the dial and have as many as you want.',
                            align: 'right',
                            type: 'text'
                        }
                    ],
                    style: {
                        '${startQuizBtnTextCopy}': {
                            font: 'Arial, Helvetica, sans-serif{:}22px{:}rgba(167,0,71,1){:}300{:}{:}{:}{:}',
                            rect: [0, 8, 268, 27]
                        },
                        '${startQuizBtnText}': {
                            font: 'Arial, Helvetica, sans-serif{:}22px{:}rgba(255,255,255,1){:}300{:}{:}{:}{:}',
                            rect: [0, 9, 268, 27]
                        },
                        '${symbolSelector}': {
                            overflow: 'hidden',
                            rect: [null, null, 900, 556]
                        }
                    }
                },
                timeline: {
                    duration: 1000,
                    autoPlay: false,
                    data: [
                        [
                            "eid1818",
                            "color",
                            1000,
                            0,
                            "easeOutQuart",
                            "${Text2Copy3}",
                            'rgba(253,254,246,1.00)',
                            'rgba(253,254,246,1.00)'
                        ],
                        [
                            "eid1819",
                            "opacity",
                            0,
                            1000,
                            "easeOutBack",
                            "${Text2Copy3}",
                            '0',
                            '1'
                        ],
                        [
                            "eid1820",
                            "top",
                            0,
                            1000,
                            "easeOutBack",
                            "${Text2Copy3}",
                            '216px',
                            '88px'
                        ]
                    ]
                }
            },
            "ImageSymbol2": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            type: 'rect',
                            borderRadius: ['48px 48px', '48px 48px', '48px 48px', '48px 48px'],
                            id: 'outline',
                            opacity: '1',
                            rect: ['0px', '0px', 896, 552, 'auto', 'auto'],
                            overflow: 'hidden',
                            stroke: ['2px', 'rgb(208, 216, 221)', 'solid'],
                            fill: ['rgba(179,43,115,1)'],
                            c: [
                            {
                                id: 'petals',
                                type: 'image',
                                rect: [-2, -2, '900px', '556px', 'auto', 'auto'],
                                fill: ['rgba(0,0,0,0)', 'images/petals.jpg', '0px', '0px']
                            }]
                        },
                        {
                            rect: [38, 216, 277, 169, 'auto', 'auto'],
                            opacity: '0',
                            font: ['Arial, Helvetica, sans-serif', [36, 'px'], 'rgba(31,53,66,1.00)', '700', 'none', 'normal'],
                            id: 'Text2Copy4',
                            text: 'You can choose whether to retrigger this animation every time you visit this page',
                            align: 'left',
                            type: 'text'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            overflow: 'hidden',
                            rect: [null, null, 900, 556]
                        }
                    }
                },
                timeline: {
                    duration: 1000,
                    autoPlay: false,
                    data: [
                        [
                            "eid1854",
                            "width",
                            1000,
                            0,
                            "easeInQuad",
                            "${Text2Copy4}",
                            '277px',
                            '277px'
                        ],
                        [
                            "eid1823",
                            "top",
                            0,
                            1000,
                            "easeOutBack",
                            "${Text2Copy4}",
                            '216px',
                            '32px'
                        ],
                        [
                            "eid1821",
                            "color",
                            1000,
                            0,
                            "easeOutQuart",
                            "${Text2Copy4}",
                            'rgba(31,53,66,1.00)',
                            'rgba(31,53,66,1.00)'
                        ],
                        [
                            "eid1822",
                            "opacity",
                            0,
                            1000,
                            "easeOutBack",
                            "${Text2Copy4}",
                            '0',
                            '1'
                        ]
                    ]
                }
            },
            "ImageSymbol3": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            type: 'rect',
                            borderRadius: ['48px 48px', '48px 48px', '48px 48px', '48px 48px'],
                            id: 'outline',
                            opacity: '1',
                            rect: ['0px', '0px', 896, 552, 'auto', 'auto'],
                            overflow: 'hidden',
                            stroke: ['2px', 'rgb(208, 216, 221)', 'solid'],
                            fill: ['rgba(179,43,115,1)'],
                            c: [
                            {
                                id: 'heather',
                                type: 'image',
                                rect: [-2, -2, '900px', '556px', 'auto', 'auto'],
                                fill: ['rgba(0,0,0,0)', 'images/heather.jpg', '0px', '0px']
                            }]
                        },
                        {
                            opacity: '0',
                            rect: [71, 21, 426, 188, 'auto', 'auto'],
                            transform: [[0, 0, 0], ['-37', 0, 0], [0, 0], [1, 1, 1], ['50%', '50%']],
                            font: ['Arial, Helvetica, sans-serif', [36, 'px'], 'rgba(50,50,50,1.00)', '700', 'none', 'normal'],
                            id: 'Text2Copy5',
                            text: 'You can change the perspective, the number of images (and the images too)',
                            align: 'center',
                            type: 'text'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            overflow: 'hidden',
                            rect: [null, null, 900, 556]
                        }
                    }
                },
                timeline: {
                    duration: 1000,
                    autoPlay: false,
                    data: [
                        [
                            "eid1825",
                            "opacity",
                            0,
                            1000,
                            "easeOutBack",
                            "${Text2Copy5}",
                            '0',
                            '1'
                        ],
                        [
                            "eid1838",
                            "left",
                            1000,
                            0,
                            "easeOutBack",
                            "${Text2Copy5}",
                            '71px',
                            '71px'
                        ],
                        [
                            "eid1837",
                            "height",
                            1000,
                            0,
                            "easeOutBack",
                            "${Text2Copy5}",
                            '188px',
                            '188px'
                        ],
                        [
                            "eid1841",
                            "rotateZ",
                            0,
                            1000,
                            "easeOutBack",
                            "${Text2Copy5}",
                            '-37deg',
                            '0deg'
                        ],
                        [
                            "eid1833",
                            "top",
                            1000,
                            0,
                            "easeOutBack",
                            "${Text2Copy5}",
                            '21px',
                            '21px'
                        ],
                        [
                            "eid1824",
                            "color",
                            1000,
                            0,
                            "easeOutQuart",
                            "${Text2Copy5}",
                            'rgba(50,50,50,1.00)',
                            'rgba(50,50,50,1.00)'
                        ]
                    ]
                }
            },
            "ImageSymbol4": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            type: 'rect',
                            borderRadius: ['48px 48px', '48px 48px', '48px 48px', '48px 48px'],
                            id: 'outline',
                            opacity: '1',
                            rect: ['0px', '0px', 896, 552, 'auto', 'auto'],
                            overflow: 'hidden',
                            stroke: ['2px', 'rgb(208, 216, 221)', 'solid'],
                            fill: ['rgba(179,43,115,1)'],
                            c: [
                            {
                                id: 'bowl',
                                type: 'image',
                                rect: [-2, -2, '900px', '556px', 'auto', 'auto'],
                                fill: ['rgba(0,0,0,0)', 'images/bowl.jpg', '0px', '0px']
                            }]
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [36, 'px'], 'rgba(147,101,51,1.00)', '700', 'none', 'normal'],
                            opacity: '0',
                            type: 'text',
                            id: 'Text2Copy6',
                            text: 'You can create your own animations',
                            align: 'center',
                            rect: [41, 27, 790, 43, 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [36, ''], 'rgba(253,254,246,1)', 'bold', 'none', 'normal', '', 'nowrap'],
                            opacity: '0',
                            type: 'text',
                            id: 'Text3',
                            text: 'for',
                            align: 'center',
                            rect: [298, 230, 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [36, ''], 'rgba(253,254,246,1)', 'bold', 'none', 'normal', '', 'nowrap'],
                            opacity: '0',
                            type: 'text',
                            id: 'Text3Copy',
                            text: 'each',
                            align: 'center',
                            rect: [357, 230, 'auto', 'auto', 'auto', 'auto']
                        },
                        {
                            font: ['Arial, Helvetica, sans-serif', [36, ''], 'rgba(253,254,246,1)', 'bold', 'none', 'normal', '', 'nowrap'],
                            opacity: '0',
                            type: 'text',
                            id: 'Text3Copy2',
                            text: 'symbol',
                            align: 'center',
                            rect: [449, 230, 'auto', 'auto', 'auto', 'auto']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            overflow: 'hidden',
                            rect: [null, null, 900, 556]
                        }
                    }
                },
                timeline: {
                    duration: 3335,
                    autoPlay: false,
                    data: [
                        [
                            "eid1829",
                            "top",
                            0,
                            1000,
                            "easeOutBack",
                            "${Text2Copy6}",
                            '27px',
                            '186px'
                        ],
                        [
                            "eid1827",
                            "color",
                            1000,
                            0,
                            "easeOutQuart",
                            "${Text2Copy6}",
                            'rgba(147,101,51,1.00)',
                            'rgba(147,101,51,1.00)'
                        ],
                        [
                            "eid1843",
                            "opacity",
                            1250,
                            500,
                            "easeInQuad",
                            "${Text3}",
                            '0',
                            '1'
                        ],
                        [
                            "eid1844",
                            "opacity",
                            2000,
                            500,
                            "easeOutBack",
                            "${Text3Copy}",
                            '0',
                            '1'
                        ],
                        [
                            "eid1828",
                            "opacity",
                            0,
                            1000,
                            "easeOutBack",
                            "${Text2Copy6}",
                            '0',
                            '1'
                        ],
                        [
                            "eid1845",
                            "opacity",
                            2835,
                            500,
                            "easeInQuad",
                            "${Text3Copy2}",
                            '0',
                            '1'
                        ]
                    ]
                }
            },
            "ImageSymbol5": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            type: 'rect',
                            borderRadius: ['48px 48px', '48px 48px', '48px 48px', '48px 48px'],
                            id: 'outline',
                            opacity: '1',
                            rect: ['0px', '0px', 896, 552, 'auto', 'auto'],
                            overflow: 'hidden',
                            stroke: ['2px', 'rgb(208, 216, 221)', 'solid'],
                            fill: ['rgba(179,43,115,1)'],
                            c: [
                            {
                                id: 'branches',
                                type: 'image',
                                rect: [-2, -2, '900px', '556px', 'auto', 'auto'],
                                fill: ['rgba(0,0,0,0)', 'images/branches.jpg', '0px', '0px']
                            }]
                        },
                        {
                            rect: [130, 216, 494, 97, 'auto', 'auto'],
                            opacity: '0',
                            font: ['Arial, Helvetica, sans-serif', [36, 'px'], 'rgba(253,254,246,1.00)', '700', 'none', 'normal'],
                            id: 'Text2Copy7',
                            text: 'You can nest buttons inside your image symbols.',
                            align: 'left',
                            type: 'text'
                        },
                        {
                            rect: [199, 121, 178, 38, 'auto', 'auto'],
                            opacity: '0',
                            id: 'ButtonSymbol',
                            symbolName: 'ButtonSymbol',
                            cursor: 'pointer',
                            type: 'rect'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            overflow: 'hidden',
                            rect: [null, null, 900, 556]
                        }
                    }
                },
                timeline: {
                    duration: 1110,
                    autoPlay: false,
                    data: [
                        [
                            "eid1851",
                            "top",
                            610,
                            500,
                            "easeOutCubic",
                            "${ButtonSymbol}",
                            '121px',
                            '158px'
                        ],
                        [
                            "eid1832",
                            "top",
                            0,
                            1000,
                            "easeOutBack",
                            "${Text2Copy7}",
                            '216px',
                            '43px'
                        ],
                        [
                            "eid1852",
                            "opacity",
                            610,
                            500,
                            "easeInQuad",
                            "${ButtonSymbol}",
                            '0',
                            '1'
                        ],
                        [
                            "eid1830",
                            "color",
                            1000,
                            0,
                            "easeOutQuart",
                            "${Text2Copy7}",
                            'rgba(253,254,246,1.00)',
                            'rgba(253,254,246,1.00)'
                        ],
                        [
                            "eid1831",
                            "opacity",
                            0,
                            1000,
                            "easeOutBack",
                            "${Text2Copy7}",
                            '0',
                            '1'
                        ]
                    ]
                }
            },
            "ButtonSymbol": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: [0, 0, 176, 35, 'auto', 'auto'],
                            borderRadius: ['8px 8px', '8px 8px', '8px 8px', '8px 8px'],
                            stroke: ['1px', 'rgb(255, 255, 255)', 'solid'],
                            id: 'btnPanel',
                            opacity: '1',
                            type: 'rect',
                            fill: ['rgba(234,239,240,1.00)', [270, [['rgba(255,255,255,1.00)', 0], ['rgba(160,166,170,1.00)', 100]]]]
                        },
                        {
                            rect: [0, 9, 178, 19, 'auto', 'auto'],
                            font: ['Arial, Helvetica, sans-serif', [16, 'px'], 'rgba(70,91,99,1.00)', '500', 'none', 'normal'],
                            id: 'btnText',
                            text: 'Click me!',
                            align: 'center',
                            type: 'text'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, 178, 38]
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: false,
                    data: [

                    ]
                }
            },
            "DialItemSymbol0": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            id: 'home',
                            type: 'image',
                            rect: [44, -93, '32px', '32px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/home.png', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, 120, 120]
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: false,
                    data: [

                    ]
                }
            },
            "DialItemSymbol1": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            id: 'home',
                            type: 'image',
                            rect: [44, -93, '32px', '32px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/settings.png', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, 120, 120]
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: false,
                    data: [

                    ]
                }
            },
            "DialItemSymbol2": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            id: 'home',
                            type: 'image',
                            rect: [44, -93, '32px', '32px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/location.png', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, 120, 120]
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: false,
                    data: [

                    ]
                }
            },
            "DialItemSymbol3": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            id: 'home',
                            type: 'image',
                            rect: [44, -93, '32px', '32px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/heart.png', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, 120, 120]
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: false,
                    data: [

                    ]
                }
            },
            "DialItemSymbol4": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            id: 'home',
                            type: 'image',
                            rect: [44, -93, '32px', '32px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/plane.png', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, 120, 120]
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: false,
                    data: [

                    ]
                }
            },
            "DialItemSymbol5": {
                version: "5.0.1",
                minimumCompatibleVersion: "5.0.0",
                build: "5.0.1.386",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            id: 'home',
                            type: 'image',
                            rect: [44, -93, '32px', '32px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/coffee.png', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, 120, 120]
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: false,
                    data: [

                    ]
                }
            }
        };

    AdobeEdge.registerCompositionDefn(compId, symbols, fonts, scripts, resources, opts);

    if (!window.edge_authoring_mode) AdobeEdge.getComposition(compId).load("index_edgeActions.js");
})("EDGE-545038043");
