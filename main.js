document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('form')
    form.addEventListener('submit', async (event) => {

        event.preventDefault()

        const ISBN = event.target.elements[0].value
        console.log(ISBN)
        form.reset()

        const redirect = await fetchEdition(ISBN)
        if (redirect) {
            const work = await fetchWork(redirect)
            console.log(work)
        } else {
            return 
        }
    })




    // API calling functions
    async function fetchEdition(ISBN) {
        console.log('fetchEdition')
        try {
            let response = await fetch(`https://openlibrary.org/isbn/${ISBN}.json`)

            if (!response.ok) throw Error('Status not ok')

            const data = await response.json()
            console.log(data)
    
            // return the redirect to edition's work
            return data.works[0].key
        } catch (error) {
            throw error
        }
    }
    
    async function fetchWork(WORK) {
        console.log('fetchWork')
        const response = await fetch(`https://openlibrary.org${WORK}.json`)
        const data = await response.json()
    
        // return work's subjects array
        return data.subjects
    }
})