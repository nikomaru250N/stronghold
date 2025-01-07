function calculate() {
    const 現在の座標X = parseFloat(document.getElementById("currentX").value);
    const 現在の座標Z = parseFloat(document.getElementById("currentZ").value);
    const ずれたピクセル数 = parseFloat(document.getElementById("angleOffset").value);
    const アイの角度 = parseFloat(document.getElementById("eyeAngle").value);

    if (isNaN(現在の座標X) || isNaN(現在の座標Z) || isNaN(ずれたピクセル数) || isNaN(アイの角度)) {
        document.getElementById("result").innerText = "すべての入力項目を正しく入力してください。";
        return;
    }

    let 距離 = 3200 / ずれたピクセル数;
    距離 = Math.floor(距離);

    const アイの角度2 = アイの角度 * (Math.PI / 180);
    let 横方向 = 距離 * Math.sin(アイの角度2);
    let 縦方向 = 距離 * Math.cos(アイの角度2);
    横方向 = Math.floor(Math.abs(横方向));
    縦方向 = Math.floor(Math.abs(縦方向));

    let 座標X, 座標Z;

    if (アイの角度 >= 0 && アイの角度 <= 180) {
        座標X = 現在の座標X - 横方向;
    } else {
        座標X = 現在の座標X + 横方向;
    }

    if (アイの角度 >= 90 && アイの角度 <= 180 || アイの角度 >= -180 && アイの角度 <= -90) {
        座標Z = 現在の座標Z - 縦方向;
    } else {
        座標Z = 現在の座標Z + 縦方向;
    }

    座標X = Math.floor(座標X);
    座標Z = Math.floor(座標Z);

    let ネザー座標X = 座標X / 8
    let ネザー座標Z = 座標Z / 8
    ネザー座標X = Math.floor(ネザー座標X);
    ネザー座標Z = Math.floor(ネザー座標Z);

    const result = `
現在: X:${現在の座標X} Z:${現在の座標Z}
要塞: X:${座標X} Z:${座標Z}
ネザー側要塞: X:${ネザー座標X} Z:${ネザー座標Z}
直線距離は: ${距離}m
X方向の距離: ${横方向}m
Z方向の距離: ${縦方向}m
    `;
    document.getElementById("result").innerText = result;
}

function resetForm() {
    document.getElementById("calculationForm").reset();
    document.getElementById("result").innerText = "";
}