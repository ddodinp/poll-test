window.onload = function () {
    // // 세개의 평균값을 구할 수 있는 방법

    // 세개의 점수배열을 한 변수에 배열 형식으로 담아주기(이중배열)
    const points = [
        [2, 8, 15, 22, 3], // min 0, max 25
        [6, 7, 26, 18, 9], // min 0, max 30
        [3, 6, 15, 36, 18, 9, 12] // min 0, max 40
    ];

    // MAP 메서드를 이용해서 한번씩 돌아가며 평군 구하기
    const avgs = points.map(point => {
        // 평균구하는 식
        // 소수점 두자리까지만 보여주기 위해 toFixed(1) 붙였으나 숫자로 인식하지 못해 Number로 감싸줌
        return Number(point.reduce((a, r) => a + r, 0) / point.length).toFixed(1);
    });

    const score = points.map(point => {
        const totalPeople = Number(point.reduce((a, r) => a + r, 0)); // 여기서의 reduce가 반환하는 값은 point로 계산을 한 '숫자값'이다.
        const totalScore = point.reduce((a, r, i) => {
            // a = [];
            // r = 2;
            // a.push(r * (0 + 1)); = 2 > a.push(2);
            // a = [2];
            // 첫번쨰턴 끝

            // a = [2];
            // r = 8;
            // a.push(8 * (1 + 1)) = 16 >> a.push(16);
            // a = [2, 16];
            // 두번쨰 턴 끝

            // a = [2, 15, 4, 4, 4];

            // totalScore = [[2, 15, 4, 4, 4], [2, 15, 4, 4, 4], [2, 15, 4, 4, 4]];

            a.push(r * (i + 1));
            return a;
        }, []).reduce((a, r) => a + r, 0);

        return (totalScore / totalPeople).toFixed(2);
    });

    const max = points.map(point => Math.max(...point)).map(m => 5 * Math.ceil(m / 5)); // [25 / 5, 30 / 5, 40 / 5// ]
    const columns = max.reduce((a, r) => {
        const range = [];
        for (i = 0; i <= r; i += 5) {
            range.push(i);
        }
        a.push(range);
        return a;
    }, []);


    // 구해진 평균을 HTML에 가져오기
    [...document.querySelectorAll('.txt_total span')].forEach((element, i) => {
        element.innerHTML = score[i];
    });

    // div 생성하기
    [...document.querySelectorAll('.box_poll_graph')].forEach(element => {
        const newDiv = document.createElement('div');
        newDiv.classList.add('range');
        element.after(newDiv);
    });

    // 각 range 그래프 그리기
    [...document.querySelectorAll('.range')].forEach((element, i) => {
        console.log('range', element);
        console.log('columns', columns);
        columns.forEach((column, idx) => {
            console.log('column', column);
            if (i === idx) {
                column.forEach(c => {
                    const addSpan = document.createElement('span');
                    const ranges = document.createTextNode(c);
                    addSpan.appendChild(ranges);
                    element.appendChild(addSpan);
                    addSpan.style.marginLeft = '30px';
                    addSpan.style.color = '#ccc';
                    addSpan.style.fontSize = '13px';
                    // margin을 줘야하는 곳
                })
            }
        });	
        element.style.marginTop = '5px';
        element.style.marginLeft = '60px';
    });
};