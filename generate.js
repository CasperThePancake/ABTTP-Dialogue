var output
var letterindex
choice_toggle()

function generateNormal() {
    // Split the text input into parts, adding one letter per index
    var splitText = [[],[],[]]
    //Line 1
    for (var i = 0; i < inputText[0].length; i++) {
        if (i == 0) {
            splitText[0].push(inputText[0][i].split("'").join("\\'").split('"').join('\\"'))
        } else {
            splitText[0].push(splitText[0][i-1]+inputText[0][i].split("'").join("\\'").split('"').join('\\"'))
        }
    }
    //Line 2
    for (var i = 0; i < inputText[1].length; i++) {
        if (i == 0) {
            splitText[1].push(inputText[1][i].split("'").join("\\'").split('"').join('\\"'))
        } else {
            splitText[1].push(splitText[1][i-1]+inputText[1][i].split("'").join("\\'").split('"').join('\\"'))
        }
    }
    //Line 3
    for (var i = 0; i < inputText[2].length; i++) {
        if (i == 0) {
            splitText[2].push(inputText[2][i].split("'").join("\\'").split('"').join('\\"'))
        } else {
            splitText[2].push(splitText[2][i-1]+inputText[2][i].split("'").join("\\'").split('"').join('\\"'))
        }
    }
    // Write split parts with commands to output
    output = ""
    letterindex = 1
    //Line 1
    for (var i = 0; i < splitText[0].length; i++) {
        if (splitText[1].length == 0 && i + 1 == splitText[0].length) {
            output += "execute if score letterIndex dialogue matches "+letterindex+".. run data merge entity @e[type=text_display,tag=dialogue_td,limit=1] {text:'{\"text\":\""+"\\\\n"+splitText[0][i]+"\\\\n"+"\\\\n"+"\"}'}"
        } else {
            output += "execute if score letterIndex dialogue matches "+letterindex+" run data merge entity @e[type=text_display,tag=dialogue_td,limit=1] {text:'{\"text\":\""+"\\\\n"+splitText[0][i]+"\\\\n"+"\\\\n"+"\"}'}" 
        }
        output += "\n"
        letterindex += 1
    }
    //Line 2
    for (i = 0; i < splitText[1].length; i++) {
        if (splitText[2].length == 0 && i + 1 == splitText[1].length) {
            output += "execute if score letterIndex dialogue matches "+letterindex+".. run data merge entity @e[type=text_display,tag=dialogue_td,limit=1] {text:'{\"text\":\""+"\\\\n"+splitText[0][splitText[0].length-1]+"\\\\n"+splitText[1][i]+"\\\\n"+"\"}'}"
        } else {
            output += "execute if score letterIndex dialogue matches "+letterindex+" run data merge entity @e[type=text_display,tag=dialogue_td,limit=1] {text:'{\"text\":\""+"\\\\n"+splitText[0][splitText[0].length-1]+"\\\\n"+splitText[1][i]+"\\\\n"+"\"}'}"
        }
        output += "\n"
        letterindex += 1
    }
    //Line 3
    for (i = 0; i < splitText[2].length; i++) {
        if (i + 1 == splitText[2].length) {
            output += "execute if score letterIndex dialogue matches "+letterindex+".. run data merge entity @e[type=text_display,tag=dialogue_td,limit=1] {text:'{\"text\":\""+"\\\\n"+splitText[0][splitText[0].length-1]+"\\\\n"+splitText[1][splitText[1].length-1]+"\\\\n"+splitText[2][i]+"\"}'}"
        } else {
            output += "execute if score letterIndex dialogue matches "+letterindex+" run data merge entity @e[type=text_display,tag=dialogue_td,limit=1] {text:'{\"text\":\""+"\\\\n"+splitText[0][splitText[0].length-1]+"\\\\n"+splitText[1][splitText[1].length-1]+"\\\\n"+splitText[2][i]+"\"}'}"   
        }
        output += "\n"
        letterindex += 1
    }
    //Length & sound
    output += "scoreboard players set length dialogue "+letterindex
    output += "\n"
    output += "execute if score letterIndex dialogue matches 1.. as @p at @s run playsound alttp.message weather @s"
    output += "\n"
    output += "scoreboard players set choicedialogue dialogue 0"
    output += "\n"
}

function generateChoice() {
    output = ""
    //3 possible states
    output += "execute if score letterIndex dialogue matches 1.. if score choice dialogue matches 1 run data merge entity @e[type=text_display,tag=dialogue_td,limit=1] {text:'[{\"text\":\"\\\\n\"},{\"text\":\""+inputText[0].split("'").join("\\'").split('"').join('\\"')+"\\\\n\",\"color\":\"gold\"},{\"text\":\""+inputText[1].split("'").join("\\'").split('"').join('\\"')+"\\\\n\"},{\"text\":\""+inputText[2].split("'").join("\\'").split('"').join('\\"')+"\"}]'}"
    output += "\n"
    output += "execute if score letterIndex dialogue matches 1.. if score choice dialogue matches 2 run data merge entity @e[type=text_display,tag=dialogue_td,limit=1] {text:'[{\"text\":\"\\\\n\"},{\"text\":\""+inputText[0].split("'").join("\\'").split('"').join('\\"')+"\\\\n\"},{\"text\":\""+inputText[1].split("'").join("\\'").split('"').join('\\"')+"\\\\n\",\"color\":\"gold\"},{\"text\":\""+inputText[2].split("'").join("\\'").split('"').join('\\"')+"\"}]'}"
    output += "\n"
    if (document.getElementById("options").value == 3) {
        output += "execute if score letterIndex dialogue matches 1.. if score choice dialogue matches 3 run data merge entity @e[type=text_display,tag=dialogue_td,limit=1] {text:'[{\"text\":\"\\\\n\"},{\"text\":\""+inputText[0].split("'").join("\\'").split('"').join('\\"')+"\\\\n\"},{\"text\":\""+inputText[1].split("'").join("\\'").split('"').join('\\"')+"\\\\n\"},{\"text\":\""+inputText[2].split("'").join("\\'").split('"').join('\\"')+"\",\"color\":\"gold\"}]'}"
        output += "\n"
        output += "scoreboard players set choices dialogue 3"
        output += "\n"
    }
    if (document.getElementById("options").value == 2) {
        output += "scoreboard players set choices dialogue 3"
        output += "\n"
    }
    output += "scoreboard players set choicedialogue dialogue 1"
    output += "\n"
    output += "scoreboard players set length dialogue 11"
    output += "\n"
}

function generate() {
    inputText = [document.getElementById("input_text1").value,document.getElementById("input_text2").value,document.getElementById("input_text3").value]
    npcID = document.getElementById("npc").value
    npcID = npcID.replaceAll("\'","\\\\'")
    dialogueID = document.getElementById("input_id").value
    //Regular dialogue
    if (!document.getElementById("choice").checked) generateNormal()
    //Choice dialogue
    if (document.getElementById("choice").checked) generateChoice()
    //Other
    output += "data merge storage dialogue {npc:\""+npcID+"\"}"
    output += "\n"
    if (document.getElementById("cutscene").checked) output += "scoreboard players set cutscene dialogue 1"
    if (!document.getElementById("cutscene").checked) output += "scoreboard players set cutscene dialogue 0"
    document.getElementById("output").value = output
}

function download() {
    // Create element with <a> tag
    const link = document.createElement("a");

    // Create a blog object with the file content which you want to add to the file
    const file = new Blob([document.getElementById("output").value], { type: 'text/plain' });
    
    // Add file content in the object URL
    link.href = URL.createObjectURL(file);
    
    // Add file name
    link.download = dialogueID+".mcfunction";
    
    // Add click event to <a> tag to save file.
    link.click();
    URL.revokeObjectURL(link.href);
}

function choice_toggle() {
    if (document.getElementById("choice").checked) document.getElementById("choicedialogue").style.height = "initial";
    if (document.getElementById("choice").checked) document.getElementById("choicedialogue").style.visibility = "visible";
    if (!document.getElementById("choice").checked) document.getElementById("choicedialogue").style.height = 0;
    if (!document.getElementById("choice").checked) document.getElementById("choicedialogue").style.visibility = "collapse";
}