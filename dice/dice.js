$(document).ready(function(){
    $(".up").click(function(){
        const diceButton = $(this).closest(".dice-control").find(".dice-button");
        let count = parseInt(diceButton.text().split('d')[0]);
        const sides = diceButton.text().split('d')[1];
        count += 1;
        diceButton.text(count + "d" + sides);
    });

    $(".down").click(function(){
        const diceButton = $(this).closest(".dice-control").find(".dice-button");
        let count = parseInt(diceButton.text().split('d')[0]);
        const sides = diceButton.text().split('d')[1];
        if (count > 1) {
            count -= 1;
            diceButton.text(count + "d" + sides);
        }
    });

    $(".dice-button").click(function(){
        const count = parseInt($(this).text().split('d')[0]);
        const sides = parseInt($(this).text().split('d')[1]);
        if (isNaN(count) || isNaN(sides)) return;
        
        let individualRolls = [];
        let total = 0;
        for(let i = 0; i < count; i++){
            let roll = Math.floor(Math.random() * sides) + 1;
            individualRolls.push(roll);
            total += roll;
        }
        let resultText = "";
        if (count === 1) {
            resultText = `${count}d${sides} = ${total}`;
        } else {
            resultText = `${count}d${sides} = ${individualRolls.join(' + ')} = ${total}`;
        }
        $("#result .result-content").text(resultText);
    });

    $(".custom-button").click(function(){
        const count = parseInt($("#custom-count").val());
        const sides = parseInt($("#custom-sides").val());
        if (isNaN(count) || isNaN(sides)) return;

        let individualRolls = [];
        let total = 0;
        for(let i = 0; i < count; i++){
            let roll = Math.floor(Math.random() * sides) + 1;
            individualRolls.push(roll);
            total += roll;
        }
        let resultText = "";
        if (count === 1) {
            resultText = `${count}d${sides} = ${total}`;
        } else {
            resultText = `${count}d${sides} = ${individualRolls.join(' + ')} = ${total}`;
        }
        $("#result .result-content").text(resultText);
    });

    $("#clear-dice").click(function(){
        $(".dice-button").each(function(){
            const sides = $(this).text().split('d')[1];
            if (sides !== undefined) {
                $(this).text("1d" + sides);
            }
        });
        $("#result .result-content").text("-");
    });
});
