var items = {
  
  "hearthstone": {
      
    icon: "inv_misc_rune_01",
    quality: "common",
    name: "Hearthstone",
    binds: "when picked up",
    unique: true,
    bonuses: [
      { description: "Use: Returns you to The Crossroads. Speak to an Innkeeper in a different place to change your home location." }
    ]
    
  },
  
  "shiny-red-apple": {
    
    icon: "inv_misc_food_19",
    quality: "common",
    name: "Shiny Red Apple",
    stack: 20,
    bonuses: [
      { description: "Use: Restores 90 health over 18 sec. Must remain seated while eating." }
    ]
    
  },
  
  "melon-juice": {
    
    icon: "inv_drink_09",
    quality: "common",
    name: "Melon Juice",
    stack: 20,
    bonuses: [
      { description: "Use: Restores 72 mana over 24 sec. Must remain seated while drinking." }
    ]
    
  },
  
  "red-linen-shirt": {
    
    icon: "inv_shirt_red_01",
    quality: "common",
    name: "Red Linen Shirt",
    slot: "Shirt"    
    
  },
  
  "medicine-staff-of-the-monkey": {
    
    icon: "inv_staff_31",
    quality: "uncommon",
    name: "Medicine Staff of the Monkey",
    binds: "when equipped",
    unique: false,
    slot: "Two-Hand",
    type: "Staff",

    damage: {
      min: 25,
      max: 39,
      extras: {
        min: [],
        max: []
      },
      speed: 2.50
    },

    stats: [
      { stat: "Agility", value: 4, type: "primary" },
      { stat: "Stamina", value: 4, type: "primary" }
    ],

    enchantments: {

      enchants: [
        { description: "Flametongue" }
      ],

    },

    durability: 65,
    level: 14,
    ilevel: 19
    
  },
  
  "deepdive-helmet": {
    
    icon: "inv_helmet_49",
    quality: "uncommon",
    name: "Deepdive Helmet",
    binds: "when equipped",
    unique: false,
    slot: "Head",
    type: "Cloth",
    armor: 96,

    stats: [
      { stat: "Stamina", value: 15, type: "primary" }
    ],
    durability: 70,
    level: 0,
    ilevel: 0,
    tradelevel: {
      trade: "Engineering",
      level: 230
    },

    bonuses: [
      { description: "Equip: Allows underwater breathing" }
    ]
    
  },
  
  "hanzo-sword": {
    
    icon: "inv_sword_10",
    quality: "rare",
    name: "Hanzo Sword",
    binds: "when equipped",
    unique: false,
    slot: "One-Hand",
    type: "Sword",
    
    damage: {
      min: 45,
      max: 86,
      extras: {
        min: [],
        max: []
      },
      speed: 1.8
    },

    durability: 90,
    chanceOnHit: [
      { description: "Wounds the target for 75 damage." }
    ],
    
    level: 50,
    ilevel: 0
    
  },
  
  "boots-of-the-petrified-forest": {
    
    icon: "inv_boots_leather_02",
    quality: "epic",
    name: "Boots of the Petrified Forest",
    binds: "when picked up",
    unique: false,
    slot: "Feet",
    type: "Leather",
    armor: 798,

    stats: [
      { stat: "Stamina", value: 116, type: "primary" },
      { stat: "Intellect", value: 79, type: "primary" },
      { stat: "Spirit", value: 52, type: "primary" },
      { stat: "Haste", value: 53, type: "secondary" }
    ],
    durability: 80,
    level: 80,
    ilevel: 0
    
  },
  
  "the-2-ring": {
    
    icon: "inv_jewelry_ring_34",
    quality: "epic",
    name: "The 2 Ring",
    binds: "when equipped",
    unique: false,
    slot: "Finger",
    type: "",
    armor: 96,

    stats: [
      { stat: "Strength", value: 22, type: "primary" },
      { stat: "Agility", value: 22, type: "primary" },
      { stat: "Stamina", value: 22, type: "primary" },
      { stat: "Intellect", value: 22, type: "primary" },
      { stat: "Spirit", value: 22, type: "primary" }
    ],

    flavour: "Vastly superior to the 1 ring."
    
  },
  
  "dragonwrath-tarecgosas-rest": {
    
    icon: "stave_2h_tarecgosa_e_01stagefinal",
    quality: "legendary",
    name: "Dragonwrath, Tarecgosa's Rest",
    binds: "when picked up",
    slot: "Two-Hand",
    type: "Staff",

    damage: {
      min: 2344,
      max: 3518,
      // extras is for stuff like additional fire dmg
      extras: {
        min: [],
        max: []
      },
      speed: 3.30
    },
    
    stats: [
      { stat: "Stamina", value: 730, type: "primary" },
      { stat: "Intellect", value: 426, type: "primary" },
      { stat: "Hit", value: 314, type: "secondary" },
      { stat: "Haste", value: 271, type: "secondary" },
      { stat: "Spell Power", value: 2786, type: "secondary" }
    ],

    enchantments: {

      sockets: [
        { color: "red" },
        { color: "red" },
        { color: "red" }
      ],
      
      socketBonus: "+30 Intellect"

    },

    durability: 145,

    level: 85,
    ilevel: 397,

    bonuses: [
      { description: "Equip: When you deal damage, you have a chance to gain the Wrath of Tarecgosa, duplicating the harmful spell." },
      { description: "Use: Transforms you into Tarecgosa's Visage, allowing you to fly very fast." }
    ]

  },
  
  "hoggers-trousers": {
    
    icon: "inv_pants_02",
    quality: "rare",
    name: "Hogger's Trousers",
    binds: "when picked up",
    unique: false,
    slot: "Legs",
    type: "Leather",
    armor: 102,

    stats: [
      { stat: "Agility", value: 9, type: "primary" },
      { stat: "Hit", value: 9, type: "secondary" }
    ],
    durability: 95,
    level: 20,
    ilevel: 0

  },

  "green-hills-of-stranglethorn-11": {

    icon: "inv_misc_note_06",
    quality: "common",
    name: "Green Hills of Stranglethorn - Page 11",
    stack: 10,

    bonuses: [
      { 
        description: "Right Click to Read" 
      }
    ]

  },

  "hopeglow-spaulders": {

    icon: "inv_shoulder_leather_raidmonk_n_01",
    quality: "epic",
    name: "Hopeglow Spaulders",
    binds: "when picked up",
    unique: false,
    slot: "Shoulder",
    type: "Leather",
    armor: 2623,

    stats: [
      { stat: "Stamina", value: 2452, type: "primary" },
      { stat: "Intellect", value: 1474, type: "primary" },
      { stat: "Spirit", value: 1010, type: "primary" },
      { stat: "Haste", value: 1010, type: "secondary" }
    ],

    enchantments: {

      sockets: [
        { color: "yellow" },
        { color: "yellow" }
      ],

      socketBonus: "+120 Intellect"

    },

    durability: 100,
    level: 90,
    ilevel: 559,
  }
}

Handlebars.registerHelper('speed', function (speed) {
    return speed.toFixed(2);
});
Handlebars.registerHelper('dps', function (damage) {
    var damageTotal = damage.max + damage.min;
    if (damage.extras) {
        for (var i = 0; i < damage.extras.min.length; i++) {
            if (window.CP.shouldStopExecution(1)) {
                break;
            }
            damageTotal += damage.extras.min[i];
        }
        for (var i = 0; i < damage.extras.max.length; i++) {
            if (window.CP.shouldStopExecution(2)) {
                break;
            }
            damageTotal += damage.extras.max[i];
        }
        window.CP.exitedLoop(2);
        window.CP.exitedLoop(1);
    }
    return (damageTotal / 2 / damage.speed).toFixed(1);
});
Handlebars.registerHelper('classes', function (array) {
    var classes = array.toString().replace(/\s/g, '&nbsp;').replace(/,/g, ', ');
    return new Handlebars.SafeString(classes);
});
var source = $('#wow-item-template').html();
var template = Handlebars.compile(source);
var $body = $('body');
var $wowIcons = $('.wow-icon');
var lastHovered;
$wowIcons.each(function (k, v) {
    var $this = $(this);
    var id = $this.data('item-id');
    obj = items[id];
    if (obj) {
        if (obj.icon) {
            $this.css({ 'background-image': 'url(http://wow.zamimg.com/images/wow/icons/medium/' + obj.icon + '.jpg)' });
        }
        if (obj.stack) {
            $this.append('<span class=\'stack\'>' + obj.stack + '</span>');
        }
    }
});
$wowIcons.on('mouseover.wow', function (e) {
    var $this = $(this);
    var $html;
    if (!lastHovered || !lastHovered.is($this)) {
        var id = $this.data('item-id');
        $html = $(template(items[id]));
        $body.find('.wow-item').remove();
        $body.append($html);
        $html.css({
            left: e.clientX + 20,
            top: e.clientY - 10
        });
        lastHovered = $this;
    } else {
        $html = $('.wow-item');
    }
    setTimeout(function () {
        $html.removeClass('hidden');
    }, 10);
    $this.on('mousemove.wow', function (e) {
        $html.css({
            left: e.clientX + 20,
            top: e.clientY - 30
        });
    });
});
$wowIcons.on('mouseout.wow', function (e) {
    $body.find('.wow-item').addClass('hidden');
    $(this).off('mousemove.wow');
});
$body.on('mouseover.wow', '.wow-item', function (e) {
});
$body.on('mouseout.wow', '.wow-item', function (e) {
    $(this).addClass('hidden');
});