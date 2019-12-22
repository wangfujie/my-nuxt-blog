import axios from 'axios'


export default function({ $axios, redirect }, inject) {

    $axios.defaults.baseURL = "https://blog.wwolf.wang";
    
    // Create a custom axios instance
    const api = $axios.create({
        headers: {
            common: {
            Accept: 'text/plain, */*'
            }
        }
    })

    // Set baseURL to something different
    api.setBaseURL('https://blog.wwolf.wang')

    // Inject to context as $api
    inject('blog', api)
}
