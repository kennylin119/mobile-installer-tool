// This class can use a react router to route data from our front end 
// Probably need to create an array of routes


const router = (props) => {



    return (
        <div>
            router
        </div>
    )
}

export const fetchProduct = async(PRODUCT_IDENTIFIER) => {
    const res = fetch(`https://ams-test-saltmarsh-services.azure-api.net/qa/products/metadata/v1/uitemplates/${PRODUCT_IDENTIFIER}?enableAtlasOverCFSQT=true`, {
        headers: {
            "Ocp-Apim-Subscription-Key": "601126cbdc9247a9826c7e51843e0a7a",
            "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IlVOUW9rN0o4TTd5VzAyTWRqYkhiMS1XRm9SOCIsImtpZCI6IlVOUW9rN0o4TTd5VzAyTWRqYkhiMS1XRm9SOCJ9.eyJpc3MiOiJodHRwczovL2Fhei11bS1pbnRlZ3JhdGlvbi1sb2dpbi5henVyZXdlYnNpdGVzLm5ldC9pZGVudGl0eSIsImF1ZCI6Imh0dHBzOi8vYWF6LXVtLWludGVncmF0aW9uLWxvZ2luLmF6dXJld2Vic2l0ZXMubmV0L2lkZW50aXR5L3Jlc291cmNlcyIsImV4cCI6MTYzNDUyNjUxMiwibmJmIjoxNjE2NTI2NTEyLCJjbGllbnRfaWQiOiJhNGQyNmEzOC00NzU1LTQzYjAtOWE3Yi1mYjhhMDYxOTVkOWIiLCJzY29wZSI6WyJhbGxfdW1fY2xhaW1zIiwib2ZmbGluZV9hY2Nlc3MiXSwic3ViIjoiMDQ1MGRiOTgtY2YwYS00MzRhLWFmMDAtNmIyODA3MzUxMTIxIiwiYXV0aF90aW1lIjoxNjE2NTI2NTEyLCJpZHAiOiJpZHNydiIsInVybjpvYXV0aDpyb2xlcyI6IiwsLCwiLCJQZXJtaXNzaW9ucyI6WyJBY2NvdW50LkFkZCIsIkFjY291bnQuRWRpdCIsIkFjY291bnQuUmVtb3ZlIiwiQWNjb3VudC5WaWV3IiwiQWNjb3VudC5BZGRyZXNzLkFkZCIsIkFjY291bnQuQWRkcmVzcy5FZGl0IiwiQWNjb3VudC5BZGRyZXNzLlJlbW92ZSIsIkFjY291bnQuQWRkcmVzcy5WaWV3IiwiQ2FuVmlld0FsbEFjY291bnRzLlZpZXciLCJNYW5hZ2VQZXJtaXNzaW9ucy5BZGQiLCJNYW5hZ2VQZXJtaXNzaW9ucy5SZW1vdmUiLCJNYW5hZ2VQZXJtaXNzaW9ucy5WaWV3IiwiUHJvZHVjdEFjY2Vzcy5WaWV3IiwiUHJvZHVjdERpc2NvdW50LlZpZXciLCJSb2xlLlZpZXciLCJVc2VyLkVkaXQiLCJVc2VyLlZpZXciLCJDb250YWN0LkFkZCIsIkNvbnRhY3QuRWRpdCIsIkNvbnRhY3QuUmVtb3ZlIiwiQ29udGFjdC5WaWV3Il0sImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImNzX3FhXzAxQGx1dHJvbi5jb20iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjA0NTBkYjk4LWNmMGEtNDM0YS1hZjAwLTZiMjgwNzM1MTEyMSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJDdXN0b21lciBTZXJ2aWNlIDAxIFFBIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc3VybmFtZSI6IlFBIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZ2l2ZW5uYW1lIjoiQ3VzdG9tZXIgU2VydmljZSAwMSIsImlkIjoiMDQ1MGRiOTgtY2YwYS00MzRhLWFmMDAtNmIyODA3MzUxMTIxIiwiVXNlclJlZiI6ImFwaS91c2Vycy8wNDUwZGI5OC1jZjBhLTQzNGEtYWYwMC02YjI4MDczNTExMjEiLCJNeUx1dHJvbkFjY291bnRJZCI6IiIsIlJBTnVtYmVyIjoiIiwiQWNjZXNzVG9rZW5FeHBpcnkiOiIzMDAwMDAiLCJDbGllbnRBcHBsaWNhdGlvbkd1aWQiOiJhNGQyNmEzOC00NzU1LTQzYjAtOWE3Yi1mYjhhMDYxOTVkOWIiLCJJc0FwcFRva2VuIjoiRmFsc2UiLCJJc3N1ZWRUaW1lIjoiMDMvMjMvMjAyMSAxOTowODozMiIsImFtciI6WyJwYXNzd29yZCJdfQ.nrTDZLWcbV8IR8TrvnIQLRCZGha2VmJW4QaCcNBeJ58ncoh_9hcSqvjvFg3KlsYXEnXmtDIK8ujCoSwRoNP_pvNsYSyY77dUaIhIsdz0duFuTBz35-WdL16xpBm--6GBC8tOYJ_2V9F9Ynth8qEFzSts_KYWWMNP3hBrqo6RBuFgUj0Qp4a8IxJ9rOsnbzF2Wk60OkWPTim1Y3PaDft1xnaWVc3_QFyBx6aBvY5FthXJLWbqbIePI3WiY1_5eB4oI4KN1wyktuxff1jFgO-ZprDnhkUN1aY-oDbene4Y545iO5l09ZJHIMdRrZHC8irBCBi4YvQjCTRATiKwOyQeBg"
        }
    })

    return res;
}

export const plusSlides = (n) => {
    console.log(n + 1);
}

export default router;
