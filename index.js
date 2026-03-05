const createElement = (arr) => {
    const htmlelement = arr.map(a => `<span class="btn space-x-3">${a}</span>`)
    return (htmlelement.join(""));
}
const managespiner = (status) => {
    if (status == true) {
        document.getElementById("sppiner").classList.remove('hidden');
        document.getElementById("word-contianer").classList.add("hidden")
    }
    else {
        document.getElementById("word-contianer").classList.remove('hidden');
        document.getElementById("sppiner").classList.add("hidden")
    }
}

const loadLessons = () => {
    const url = 'https://openapi.programming-hero.com/api/levels/all'
    fetch(url)
        .then(res => res.json())
        .then(data => displaylessons(data.data))
}

const removebtnstyle = () => {
    const lessonsbutton = document.querySelectorAll(".lesson-btn")
    lessonsbutton.forEach(removebtn => {
        removebtn.classList.remove("active")
    })
}

const loadlevelword = (id) => {
    managespiner(true)
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removebtnstyle()
            const clickbtn = document.getElementById(`lessonbtn-${id}`);
            clickbtn.classList.add("active");
            displaylevelone(data.data);
        })
}

const loadworddetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayworddetails(data.data))
}


const displayworddetails = (detailsword) => {
    const detailscontainer = document.getElementById("details-container")
    detailscontainer.innerHTML = `
    <div class="">
                    <h2 class="font-bold text-2xl">${detailsword.word} ( <i class="fa-solid fa-microphone-lines"></i> :${detailsword.pronunciation})</h2>
                </div>
                <div class="">
                    <h2 class="font-bold">Meaning</h2>
                    <p class="font-bangla"> ${detailsword.meaning}</p>
                </div>
                <div class="">
                    <h2 class="font-bold">Example</h2>
                    <p class="">${detailsword.sentence}</p>
                </div>
                <div class="">
                   ${createElement(detailsword.synonyms)}
                </div>
               `
    console.log('akhn agula dd krb', detailsword);
    document.getElementById('my_modal_5').showModal()
}
const displaylevelone = (words) => {
    const wordcontianer = document.getElementById('word-contianer')
    wordcontianer.innerHTML = '';

    if (words.length == 0) {
        wordcontianer.innerHTML = `
        <div class="text-center font-bangla col-span-full py-10 rounded  space-y-6">
         <img class='mx-auto' src="/assets/alert-error.png" alt="">
            <p class="text-xl font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="text-3xl font-bold">নেক্সট Lesson এ যান।</h2>
        </div>`
        managespiner(false)
        return;
    }

    for (let word of words) {
        console.log(word);


        const card = document.createElement('div')
        card.innerHTML = `
    <div class="bg-white shadow-sm rounded-xl text-center py-10 px-5 space-y-4">
            <h2 class="text-2xl font-bold">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
            <p class="font-semibold">Meaning /Pronounciation</p>
            <div class="font-medium text-xl font-bangla">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি"}"</div>
            <div class="flex justify-between items-center">
                <button onclick="loadworddetails(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF60]"><i
                        class="fa-solid fa-circle-info text-[#374957]"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF60]"><i
                        class="fa-solid fa-volume-high text-[#374957]"></i></button>
            </div>
        </div>
    `
        wordcontianer.append(card)
    }
    managespiner(false)
}

const displaylessons = (lessons) => {
    console.log(lessons);
    // 1 get the container and empty
    const levelContainer = document.getElementById("level-container")
    levelContainer.innerHTML = " ";

    // 2. get into every leessons
    for (let lesson of lessons) {
        // create element
        const btndiv = document.createElement("div");
        btndiv.innerHTML = `
<button id="lessonbtn-${lesson.level_no}" onclick="loadlevelword(${lesson.level_no})" class='btn btn-outline btn-primary lesson-btn'><i class="fa-brands fa-leanpub"></i> Lesson - ${lesson.level_no}</button>
`
        levelContainer.append(btndiv)
    }
}

loadLessons()

document.getElementById("btn-search").addEventListener("click", () => {
    const input = document.getElementById("input-search")
    const inputvalue = input.value.trim().toLowerCase();
    console.log(inputvalue);

    fetch("https://openapi.programming-hero.com/api/words/all")
        .then(res => res.json())
        .then(data => {
            const allword = data.data;
            console.log(allword);
            const filterWords = allword.filter(word => word.word.toLowerCase().includes(inputvalue))
            displaylevelone(filterWords);
        });

})