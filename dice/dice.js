$(document).ready(function(){
    $(".up").click(function(){
        const diceButton = $(this).siblings(".dice-button");
        let count = parseInt(diceButton.text().split('d')[0]);
        const sides = diceButton.text().split('d')[1];
        count += 1;
        diceButton.text(count + "d" + sides);
    });

    $(".down").click(function(){
        const diceButton = $(this).siblings(".dice-button");
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
        let individualRolls = [];
        let total = 0;
        for(let i = 0; i < count; i++){
            let roll = Math.floor(Math.random() * sides) + 1;
            individualRolls.push(roll);
            total += roll;
        }
        const resultText = `${count}d${sides} = ${individualRolls.join(' + ')} = ${total}`;
        $("#result").text("結果: " + resultText);
    });

    $("#clear-dice").click(function(){
        $(".dice-button").each(function(){
            const sides = $(this).text().split('d')[1];
            $(this).text("1d" + sides);
        });
        $("#result").text("結果: -");
    });
});