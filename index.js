const loadLessons = () => {
    const url = 'https://openapi.programming-hero.com/api/levels/all'
    fetch(url)
        .then(res => res.json())
        .then(data => displaylessons(data.data))
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
<button class='btn btn-outline btn-primary '> <a href=""><i class="fa-brands fa-leanpub"></i> Lesson - ${lesson.level_no}</a></button>
`
        levelContainer.append(btndiv)
    }
}


loadLessons()