window.onload = function () {
    // 세개의 점수배열을 한 변수에 배열 형식으로 담아주기(이중배열)
    const points = [
        [2, 8, 15, 22, 3], // min 0, max 25
        [6, 7, 26, 18, 9], // min 0, max 30
        [3, 6, 15, 36, 18, 9, 12] // min 0, max 40
    ];

    //항목당 점수 [1, 2, 3, 4, 5]
    const score = points.map(point => {
        const totalPeople = Number(point.reduce((a, r) => a + r, 0)); // 여기서의 reduce가 반환하는 값은 point로 계산을 한 '숫자값'이다.
        const totalScore = point.reduce((a, r, i) => {
            a.push(r * (i + 1)); //곱해야할 항목점수를 (i+1) 로 설정
            return a;
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

            // a = [2, 16, 30, 88, 6];

            // a= [[2, 16, 30, 88, 6], [6, 14, 78, 72, 45], [3, 12, 45, 144, 90, 54, 84]];
            // totalScore = [166, 215, 432] 
        }, []).reduce((a, r) => a + r, 0);   
        return (totalScore / totalPeople).toFixed(2); // 평점구하는 식 : 각 항목당점수 * 사람수 모두 더한 값 / 총 인원수
    });

    // 5단위로 끊기는 기준점: 5의 배수에 가까운 최대값 구하기
    const max = points.map(point => Math.max(...point)).map(m => 5 * Math.ceil(m / 5));

    const columns = max.reduce((a, r) => {
        const range = [];
        for (i = 0; i <= r; i += 5) {
            range.push(i);
        }
        a.push(range);
        return a;
    }, []);
    console.log('columns', columns);


    // 구해진 평점을 HTML에 가져오기
    [...document.querySelectorAll('.txt_total span')].forEach((element, i) => {
        element.innerHTML = score[i];
    });

    // div 생성하기
    [...document.querySelectorAll('.box_poll_graph')].forEach(element => {
        const newDiv = document.createElement('div');
        newDiv.classList.add('range');
        element.append(newDiv); //요소 내부의 끝 부분에 삽입
    });

    // 각 range 그래프 그리기
    [...document.querySelectorAll('.range')].forEach((element, i) => {
        // console.log('range', element);
        // console.log('columns', columns);
        columns.forEach((column, idx) => {
            console.log('column', column);
            if (i === idx) {
                column.forEach(c => {
                    const addSpan = document.createElement('span');
                    const ranges = document.createTextNode(c);
                    addSpan.appendChild(ranges);
                    element.appendChild(addSpan);
                })
            }
        });	
    });
};