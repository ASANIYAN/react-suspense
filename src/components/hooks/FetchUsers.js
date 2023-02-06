
export const FetchUsers = () => {
    return fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((data) => data)
        .catch((error) => {
            console.log(error)
        })
}

export const FetchData = () => {
    const userPromise = FetchUsers();

    return {
        user: wrapPromise(userPromise),
    }
}

// allows us return special resource needed to use Suspense
const wrapPromise = (promise) => {
    // set initial status
    let status = 'pending';
    // Store result
    let result;
    // Wait for promise
    let suspender = promise.then(
        res => {
            status = 'success';
            result = res;
        },
        err => {
            status = 'error';
            result = err;
        }
    );
    
    return {
        read() {
            if( status === 'pending') {
                throw suspender;
            } else if (status === 'error') {
                throw result;
            } else if (status === 'success') {
                return result;
            }
        }
    }
}