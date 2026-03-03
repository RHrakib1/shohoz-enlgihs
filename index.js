const loadLessons = () => {
    const url = 'https://openapi.programming-hero.com/api/levels/all'
    fetch(url)
        .then(res => res.json())
        .then(data => displaylessons(data.data))
}

const loadlevelword = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displaylevelone(data.data))

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
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF60]"><i
                        class="fa-solid fa-circle-info text-[#374957]"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF60]"><i
                        class="fa-solid fa-volume-high text-[#374957]"></i></button>
            </div>
        </div>
    `
        wordcontianer.append(card)
    }
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
<button onclick="loadlevelword(${lesson.level_no})" class='btn btn-outline btn-primary '><i class="fa-brands fa-leanpub"></i> Lesson - ${lesson.level_no}</button>
`
        levelContainer.append(btndiv)
    }
}


loadLessons()