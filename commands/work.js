const RichEmbed = require("discord.js").RichEmbed;
const Discord = require("discord.js");
const boxen = require("boxen")
const fs = require('fs')
const moment = require("moment")
const timer = require("moment-timer")
const request = require('request')
const ms = require('ms')
module.exports.run = (client, message, args, data, announcement) => {

    var commandlock = data.lock
  if(commandlock.includes('true')) {       
    if(message.author.id !== data.ownerid) return message.channel.send('Sorry, but a command lock is in effect. Only the owner can use commands at this time.')   
  } 
  
    var balMember = message.guild.member(message.mentions.users.first());
    const modlog = message.guild.channels.find('name', 'mod-log');
    fs.exists(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`, function(exists) {
        if (!exists) {
            fs.writeFile(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`, '0', function(err) {
            });
        }
    });
    fs.exists(`./data/serverdata/${message.guild.id}/economy/atm/${message.author.id}.txt`, function(exists) {
        if (!exists) {
            fs.writeFile(`./data/serverdata/${message.guild.id}/economy/atm/${message.author.id}.txt`, '0', function(err) {
            });
        }
    });
    fs.readFile(`./data/serverdata/${message.guild.id}/settings/currency.txt`, function(err, currency) {
        fs.readFile(`./data/serverdata/${message.guild.id}/settings/workwait.txt`, function(err, workwait) {
            fs.readFile(`./data/serverdata/${message.guild.id}/settings/workpayout.txt`, function(err, workpayout) {
    request('https://www.random.org/integers/?num=1&min=0&max=2&base=10&col=1&format=plain&rnd=new', function (error, response, body) {
        
    const workopts = ['You washed windows',
                    'You worked as a part-time janitor',
                    'You dressed up as a clown for a 5-year-old\'s birthday party',
                    'You worked at McDonalds',
                    'You worked at Wendys',
                    'You worked at GameStop',
                    'You worked at an armpit smeller for a Deodorant Company',
                    'You panhandled',
                    'You won a marathon',
                    'You trained olympic althletes',
                    'You worked as a firefighter',
                    'You worked as a dog whisperer',
                    'You worked as a spokesperson',
                    'You worked at a huge Corporation',
                    'You worked as a sidewalk cleaner',
                    'You taught at an elementary school',
                    'You worked at an Arms Dealer',
                    'You worked for Nintendo',
                    'You worked as a personal butler for the richest guy in town',
                    'You worked as the idea-man for Microsoft',
                    'You cleaned cars',
                    'You worked at a Summer Car Wash',
                    'You worked part-time at Chipotle',
                    'You worked for Amazon',
                    'You drove a Truck from Washington to Florida',
                    'You worked as a cat whisperer',
                    'You worked as a DJ',
                    'You worked as a Body Guard',
                    'You worked as a Salesman',
                    'You worked as a Police Officer',
                    'You worked as a bullet-proof vest tester',
                    'You worked on an assembly line for SAMSUNG',
                    'You worked as a software engineer',
                    'You worked from home',
                    'You drove a school bus for the local elementary school',
                    'You worked for a nuclear power plant',
                    'You drove a school bus for the local middle school',
                    'You drove a school bus for the local high school',
                    'You worked as a truck driver',
                    'You worked as a car baiter',
                    'You worked as a police officer',
                    'You worked as a PE Coach',
                    'You worked as a storyboard artist for a new Cartoon Network TV Show',
                    'You worked as a story writer for a new FOX TV Show',
                    'You worked as a news anchor for CNN',
                    'You worked as a tourist attraction',
                    'You worked for Bill Gates',
                    'You were Steve Jobs\'s personal grave cleaner',
                    'You worked as Donald Trump\'s personal servant',
                    'You worked as a Janitor for a Church',
                    'You worked as a security guard',
                    'You worked as a security guard for a museum',
                    'You worked as a construction worker',
                    'You worked for TheHacker'
                    ] 
    const performance = ['and were terrible at it, but',
                        'and were amazing at it, and',
                        'with subpar performace, but'
                        ]   
    const earnings = ['still earned',
                    'managed to earn',
                    'earned'
                    ]
    const workPayout = parseFloat(workpayout)
    const workPayment = parseFloat(Math.floor(Math.random() * workpayout) + 10)
    const worktimer = parseFloat(workwait)
    const timer = new moment.duration(worktimer).timer();
    if(timer.isStarted()) {
        var nowork = new Discord.RichEmbed()
            .setColor(data.embedcolor)
            .setDescription('Sorry, but you cannot work right now. Please wait and try again.')
            message.channel.send({embed: nowork})
            return;

    } else {
        fs.writeFile(`./data/serverdata/${message.guild.id}/economy/${message.author.id}.txt`, workPayment, function(err) {
        
        const workChoice = workopts[Number(body)];
                    const performanceChoice = performance[Number(body)];
                    const earningsChoice = earnings[Number(body)];

                    var workembed = new Discord.RichEmbed()
                        .setColor(data.embedcolor)
                        .setDescription(`${workChoice} ${performanceChoice} ${earningsChoice} ${currency}${workPayment}`)
                        .setFooter('Please note that this command is not finished.')
                        message.channel.send({embed: workembed})
                        return;
        });
    }

                    

                });
            });
        });
    });

}
module.exports.help = {
    name: "work",
    usage: "work",
    info: "Work for money"
}